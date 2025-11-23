import { userContext } from "~/lib/context";
import { UploadDokumenForm } from "../_components/upload-dokumen-form";
import type { Route } from "./+types";
import { parseFormData, type FileUpload } from "@remix-run/form-data-parser";
import { deleteInRealBucket, moveToRealBucket, removeTempFileIfValidationFail, uploadToMinioTemp } from "~/lib/minio.server";
import { getDokumenByIdDokumen, getNamaSubskill, updateDokumen, tUpdateNewDokumenValidation, getFilenameDokumenByIdDokumen } from "./_service";
import z from "zod";
import { dataWithError, redirectWithSuccess } from "remix-toast";

export async function action({
    request,
    params,
    context
}: Route.ActionArgs) {

    const user = context.get(userContext)

    let filename: string | null = null
    const uploadHandler = async (fileUpload: FileUpload) => {
        if (fileUpload.fieldName === "file") {
            if (fileUpload.size === 0) return fileUpload
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
        const validated = tUpdateNewDokumenValidation.parse(formUploadDokumen)


        // move to real production bucket if validation success
        if (filename) {
            await moveToRealBucket("dokumen", filename)

            // delete old file if filename is different
            const oldFilename = await getFilenameDokumenByIdDokumen(params.idDokumen)
            if (oldFilename && oldFilename !== filename) {
                await deleteInRealBucket("dokumen", oldFilename)
            }
        }

        const updatedDokumenId = await updateDokumen(params.idDokumen, {
            ...(filename ? { filename } : {}),
            judul: validated.judul,
        })

        const namaSubSkill = await getNamaSubskill(params.idSubSkill)

        return redirectWithSuccess(`..`, `Dokumen subskill ${namaSubSkill.namaSubSkill} berhasil diupdate`)
    } catch (err) {
        if (err instanceof z.ZodError) {
            // cleanup minio first if validation fail
            if (filename) await removeTempFileIfValidationFail(filename)

            const errors = z.flattenError(err).fieldErrors
            return dataWithError({ errors }, "Data yang dikirim salah");
        }
        return dataWithError(null, "Error di query DB")
    }

}

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const dokumen = await getDokumenByIdDokumen(params.idDokumen)

    return { dokumen }
}


export default function EditDokumen({ params, loaderData }: Route.ComponentProps) {

    const { dokumen } = loaderData

    return (
        <UploadDokumenForm dv={dokumen} idDokumen={params.idDokumen} />
    )
}