import { userContext } from "~/lib/context";
import { FormDokumen } from "../_components/FormDokumen";
import type { Route } from "./+types/index";
import { getListLayananDropdown, getListSkillDropdown } from "../add/_service";
import {
    getDokumenDataById,
    updateDokumen,
    //   updateDokumen
} from "./_service";
import { tUpdateDokumenValidation } from "./_schema";
import type { TIPE_DOKUMEN } from "~/lib/constants";
import { FileUpload, parseFormData } from "@remix-run/form-data-parser";
import {
    deleteInRealBucket,
    moveToRealBucket,
    // moveToRealBucket,
    removeTempFileIfValidationFail, uploadToMinioTemp
} from "~/lib/minio.server";
import * as z from "zod"
import { data } from "react-router";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { parseWithZod } from "@conform-to/zod/v4";
import { getDbErrorMessage } from "database/dbErrorUtils";

export async function action({
    request,
    params,
    context
}: Route.ActionArgs) {
    const user = context.get(userContext)
    const currentDokumen = await getDokumenDataById(params.idDokumen)

    let filename = currentDokumen[0].filename ?? "updated-filename"
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
        { maxFileSize: 20 * 1024 * 1024 }, //20 mb
        uploadHandler
    );

    try {
        // const formUploadDokumen = Object.fromEntries(formData)
        // const validated = tUpdateDokumenValidation.safeParse(formUploadDokumen)
        const validated = parseWithZod(formData, { schema: tUpdateDokumenValidation })

        if (validated.status !== 'success') {

            // cleanup minio first if validation fail
            await removeTempFileIfValidationFail(filename)

            // const flattened = z.flattenError(validated.error)

            // return data({ errors: flattened.fieldErrors }, { status: 400 })
            return dataWithError(validated.reply(), "Data yang dikirim salah");
        }

        await updateDokumen(params.idDokumen, {
            filename: filename,
            idLayanan: validated.value.layanan,
            idSubBidang: user?.idSubBidang!,
            judul: validated.value.judul,
            tipe: params.tipeDokumen,
            idUser: user?.idUser!,
            // idSubSkill: validated.data.
            // idTeam
        })

        // move to real production bucket if validation success
        if (validated.value.file && validated.value.file.size > 0) {
            await moveToRealBucket("dokumen", filename)
            await deleteInRealBucket("dokumen", currentDokumen[0].filename!)
        }

        return redirectWithSuccess(`..`, `Dokumen ${validated.value.judul} berhasil diupdate`)
    } catch (err) {
        const { message, constraint } = getDbErrorMessage(err);

        return dataWithError(null, message)
    }
}

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    let listLayananDropdown
    if (params.tipeDokumen === "IK") {
        listLayananDropdown = await getListLayananDropdown(user?.idSubBidang!) //dari add service
    }

    let listSkillDropdown
    if (params.tipeDokumen === "Knowledge") {
        listSkillDropdown = await getListSkillDropdown(user?.idSubBidang!, user?.idTeam) // dari add service
    }

    const dokumenData = await getDokumenDataById(params.idDokumen)


    return { listLayananDropdown, listSkillDropdown, dokumenData }

}

export default function EditDokumenPage({ params, loaderData }: Route.ComponentProps) {

    const { listLayananDropdown, listSkillDropdown, dokumenData } = loaderData

    return (
        <FormDokumen tipeDokumen={params.tipeDokumen as TIPE_DOKUMEN} listLayanan={listLayananDropdown} listSkill={listSkillDropdown} defaultValues={dokumenData[0]} mode="update" />
    )
}