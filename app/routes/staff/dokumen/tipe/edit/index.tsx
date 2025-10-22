import { userContext } from "~/lib/context";
import { FormDokumen } from "../_components/FormDokumen";
import type { Route } from "./+types/index";
import { getListLayananDropdown } from "../add/_service";
import {
    getDokumenDataById,
    tUpdateDokumenValidation,
    updateDokumen,
    //   updateDokumen
} from "./_service";
import type { TIPE_DOKUMEN } from "~/lib/constants";
import { FileUpload, parseFormData } from "@remix-run/form-data-parser";
import {
    deleteInRealBucket,
    moveToRealBucket,
    // moveToRealBucket,
    removeTempFileIfValidationFail, uploadToMinioTemp
} from "~/lib/minio.server";
import * as z from "zod"
import { data, redirect } from "react-router";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { setFlashSession } from "~/lib/session.server";

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
        { maxFileSize: 20 * 1024 * 1024 }, //10 mb
        uploadHandler
    );

    const formUploadDokumen = Object.fromEntries(formData)
    const validated = tUpdateDokumenValidation.safeParse(formUploadDokumen)


    if (!validated.success) {

        // cleanup minio first if validation fail
        await removeTempFileIfValidationFail(filename)

        const flattened = z.flattenError(validated.error)

        return data({ errors: flattened.fieldErrors }, { status: 400 })
    }

    // move to real production bucket if validation success
    if (validated.data.file && validated.data.file.size > 0) {
        await moveToRealBucket("dokumen", filename)
        await deleteInRealBucket("dokumen", currentDokumen[0].filename!)
    }

    await updateDokumen(params.idDokumen, {
        filename: filename,
        idLayanan: validated.data.layanan,
        idSubBidang: user?.idSubBidang!,
        judul: validated.data.judul,
        tipe: params.tipeDokumen,
        idUser: user?.idUser!,
    })

    const headers = await setFlashSession(request, {
        type: "success",
        message: `Dokumen ${validated.data.judul} berhasil diupdate`
    })

    return redirect(`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}`, { headers })
}

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const listLayananDropdown = await getListLayananDropdown(user?.idSubBidang!) // diambil dari add service
    const dokumenData = await getDokumenDataById(params.idDokumen)

    return { listLayananDropdown, dokumenData }
}

export default function EditDokumenPage({ params, loaderData }: Route.ComponentProps) {

    const { listLayananDropdown, dokumenData } = loaderData

    return (
        <FormDokumen tipeDokumen={params.tipeDokumen as TIPE_DOKUMEN} listLayanan={listLayananDropdown} defaultValues={dokumenData[0]} mode="update" />
    )
}