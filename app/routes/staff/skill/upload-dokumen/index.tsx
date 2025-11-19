import { userContext } from "~/lib/context";
import { UploadDokumenForm } from "../_components/upload-dokumen-form";
import type { Route } from "./+types";
import { parseFormData, type FileUpload } from "@remix-run/form-data-parser";
import { moveToRealBucket, removeTempFileIfValidationFail, uploadToMinioTemp } from "~/lib/minio.server";
import { getNamaSubskill, saveNewDokumen, tInsertNewDokumenValidation } from "./_service";
import z from "zod";
import { dataWithError, redirectWithSuccess } from "remix-toast";

export async function action({
    request,
    params,
    context
}: Route.ActionArgs) {

    const user = context.get(userContext)

    let filename = "initiate-filename"
    const uploadHandler = async (fileUpload: FileUpload) => {
        if (fileUpload.fieldName === "file") {
            // process the upload and return a File
            const newFilename = await uploadToMinioTemp(fileUpload)
            filename = newFilename
            return fileUpload
        }
    };

    const formData = await parseFormData(
        request,
        { maxFileSize: 20 * 1024 * 1024 }, //10 mb
        uploadHandler
    );

    try {

        const formUploadDokumen = Object.fromEntries(formData)
        const validated = tInsertNewDokumenValidation.parse(formUploadDokumen)


        // move to real production bucket if validation success
        await moveToRealBucket("dokumen", filename)

        const newDokumen = await saveNewDokumen({
            filename: filename,
            idLayanan: null,
            idSubBidang: user.idSubBidang,
            judul: validated.judul,
            tipe: 'Knowledge',
            idUser: user.idUser,
            idTeam: params.idTeam,
            idSubSkill: params.idSubSkill
        })

        const namaSubSkill = await getNamaSubskill(params.idSubSkill)

        return redirectWithSuccess(`..`, `Dokumen subskill ${namaSubSkill.namaSubSkill} berhasil diupload`)
    } catch (err) {
        if (err instanceof z.ZodError) {
            // cleanup minio first if validation fail
            await removeTempFileIfValidationFail(filename)

            const errors = z.flattenError(err).fieldErrors
            return dataWithError({ errors }, "Data yang dikirim salah");
        }
        return dataWithError(null, "Error di query DB")
    }



}


export default function UploadDokumen({ params }: Route.ComponentProps) {
    return (
        <UploadDokumenForm />
    )
}