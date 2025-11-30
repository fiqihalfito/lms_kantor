import type { Route } from "./+types/index";
import { data } from "react-router";
import * as z from "zod";
import {
    moveToRealBucket,
    removeTempFileIfValidationFail,
    uploadToMinioTemp
} from "~/lib/minio.server";
import {
    type FileUpload,
    parseFormData,

} from "@remix-run/form-data-parser";
import { getListLayananDropdown, getListSkillDropdown, saveNewDokumen } from "./_service";
import { tInsertNewDokumenValidation } from "./_schema";
import { userContext } from "~/lib/context";
import { FormDokumen } from "../_components/FormDokumen";
import type { TIPE_DOKUMEN } from "~/lib/constants";
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
        { maxFileSize: 20 * 1024 * 1024 }, //20 mb
        uploadHandler
    );


    try {
        // const formUploadDokumen = Object.fromEntries(formData)
        // const validated = tInsertNewDokumenValidation.safeParse(formUploadDokumen)
        const validated = parseWithZod(formData, { schema: tInsertNewDokumenValidation })

        if (validated.status !== 'success') {

            // cleanup minio first if validation fail
            await removeTempFileIfValidationFail(filename)

            // const flattened = z.flattenError(validated.error)
            // console.log(flattened.fieldErrors);

            // return data({ errors: flattened.fieldErrors }, { status: 400 })
            return dataWithError(validated.reply(), "Data yang dikirim salah");
        }

        // insert to team condition
        let idTeam
        if (params.tipeDokumen === "SOP") {
            idTeam = null
        } else {
            // const team = await checkWhichTeam(user?.idUser!)
            idTeam = user?.idTeam
        }

        const newDokumen = await saveNewDokumen({
            filename: filename,
            idLayanan: validated.value.layanan,
            idSubBidang: user?.idSubBidang!,
            judul: validated.value.judul,
            tipe: params.tipeDokumen,
            idUser: user?.idUser!,
            idTeam: idTeam,
            // idSubSkill: validated.data.skill
        })

        // move to real production bucket if validation success
        await moveToRealBucket("dokumen", filename)

        return redirectWithSuccess(`..`, `Dokumen ${validated.value.judul} berhasil ditambahkan`)
    } catch (err) {
        const { message, constraint } = getDbErrorMessage(err);

        return dataWithError(null, message)
    }


}

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    let listLayananDropdown
    if (params.tipeDokumen === "IK") {
        listLayananDropdown = await getListLayananDropdown(user?.idSubBidang!)
    }

    let listSkillDropdown
    if (params.tipeDokumen === "Knowledge") {
        listSkillDropdown = await getListSkillDropdown(user?.idSubBidang!, user?.idTeam)
    }



    return { listLayananDropdown, listSkillDropdown }
}


export default function AddNewDokumen({ params, loaderData }: Route.ComponentProps) {

    const { listLayananDropdown, listSkillDropdown } = loaderData




    return (
        <FormDokumen
            tipeDokumen={params.tipeDokumen as TIPE_DOKUMEN}
            listLayanan={listLayananDropdown}
            listSkill={listSkillDropdown}
            mode="insert" />
    )
}