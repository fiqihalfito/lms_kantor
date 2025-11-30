import { userContext } from "~/lib/context";
import { UploadDokumenForm } from "../_components/upload-dokumen-form";
import type { Route } from "./+types";
import { parseFormData, type FileUpload } from "@remix-run/form-data-parser";
import { moveToRealBucket, removeTempFileIfValidationFail, uploadToMinioTemp } from "~/lib/minio.server";
import { getNamaSubskill, saveNewDokumen } from "./_service";
import { tInsertNewDokumenValidation } from "./_schema";
import z from "zod";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { parseWithZod } from "@conform-to/zod/v4";
import { getDbErrorMessage } from "database/dbErrorUtils";

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

        const submission = parseWithZod(formData, { schema: tInsertNewDokumenValidation });
        if (submission.status !== 'success') {
            // cleanup minio first if validation fail
            if (filename) await removeTempFileIfValidationFail(filename)
            return dataWithError(submission.reply(), "Data yang dikirim salah");
        }


        // move to real production bucket if validation success
        await moveToRealBucket("dokumen", filename)

        const newDokumen = await saveNewDokumen({
            filename: filename,
            idLayanan: null,
            idSubBidang: user.idSubBidang,
            judul: submission.value.judul,
            tipe: 'Knowledge',
            idUser: user.idUser,
            idTeam: params.idTeam,
            idSubSkill: params.idSubSkill
        })

        const namaSubSkill = await getNamaSubskill(params.idSubSkill)

        return redirectWithSuccess(`..`, `Dokumen subskill ${namaSubSkill.namaSubSkill} berhasil diupload`)
    } catch (err) {
        const { message, constraint } = getDbErrorMessage(err);

        return dataWithError(null, message)
    }
}




export default function UploadDokumen({ params }: Route.ComponentProps) {
    return (
        <UploadDokumenForm mode="insert" />
    )
}