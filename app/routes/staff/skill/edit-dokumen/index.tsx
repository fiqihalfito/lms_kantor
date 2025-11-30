import { userContext } from "~/lib/context";
import { UploadDokumenForm } from "../_components/upload-dokumen-form";
import type { Route } from "./+types";
import { parseFormData, type FileUpload } from "@remix-run/form-data-parser";
import { deleteInRealBucket, moveToRealBucket, removeTempFileIfValidationFail, uploadToMinioTemp } from "~/lib/minio.server";
import { getDokumenByIdDokumen, getNamaSubskill, updateDokumen, getFilenameDokumenByIdDokumen } from "./_service";
import { tUpdateNewDokumenValidation } from "./_schema";
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
        const submission = parseWithZod(formData, { schema: tUpdateNewDokumenValidation });
        if (submission.status !== 'success') {
            // cleanup minio first if validation fail
            if (filename) await removeTempFileIfValidationFail(filename)
            return dataWithError(submission.reply(), "Data yang dikirim salah");
        }




        const updatedDokumenId = await updateDokumen(params.idDokumen, {
            ...(filename ? { filename } : {}),
            judul: submission.value.judul,
        })

        // move to real production bucket if validation success
        if (filename) {
            await moveToRealBucket("dokumen", filename)

            // delete old file if filename is different
            const oldFilename = await getFilenameDokumenByIdDokumen(params.idDokumen)
            if (oldFilename && oldFilename !== filename) {
                await deleteInRealBucket("dokumen", oldFilename)
            }
        }

        const namaSubSkill = await getNamaSubskill(params.idSubSkill)

        return redirectWithSuccess(`..`, `Dokumen subskill ${namaSubSkill.namaSubSkill} berhasil diupdate`)
    } catch (err) {
        const { message, constraint } = getDbErrorMessage(err);

        return dataWithError(null, message)
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
        <UploadDokumenForm dv={dokumen} idDokumen={params.idDokumen} mode="update" />
    )
}