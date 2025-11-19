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
import { getListLayananDropdown, getListSkillDropdown, saveNewDokumen, tInsertNewDokumenValidation } from "./_service";
import { userContext } from "~/lib/context";
import { FormDokumen } from "../_components/FormDokumen";
import type { TIPE_DOKUMEN } from "~/lib/constants";
import { redirectWithSuccess } from "remix-toast";

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


    const formUploadDokumen = Object.fromEntries(formData)
    const validated = tInsertNewDokumenValidation.safeParse(formUploadDokumen)

    if (!validated.success) {

        // cleanup minio first if validation fail
        await removeTempFileIfValidationFail(filename)

        const flattened = z.flattenError(validated.error)
        // console.log(flattened.fieldErrors);

        return data({ errors: flattened.fieldErrors }, { status: 400 })
    }

    // move to real production bucket if validation success
    await moveToRealBucket("dokumen", filename)


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
        idLayanan: validated.data.layanan,
        idSubBidang: user?.idSubBidang!,
        judul: validated.data.judul,
        tipe: params.tipeDokumen,
        idUser: user?.idUser!,
        idTeam: idTeam,
        idSubSkill: validated.data.skill
    })

    return redirectWithSuccess(`..`, `Dokumen ${validated.data.judul} berhasil ditambahkan`)


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