import type { Route } from "./+types/index";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "~/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { LoaderCircleIcon, XIcon } from "lucide-react";
import { data, Link, redirect, useFetcher } from "react-router";
import { Input } from "~/components/ui/input";
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
import { getListLayananDropdown, saveNewDokumen, tInsertNewDokumenValidation } from "./_service";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { userContext } from "~/lib/context";
import { Button } from "~/components/ui/button";
import { FormDokumen } from "../_components/FormDokumen";
import type { TIPE_DOKUMEN } from "~/lib/constants";

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



    const idNewDokumen = await saveNewDokumen({
        filename: filename,
        idLayanan: validated.data.layanan,
        idSubBidang: user?.idSubBidang!,
        judul: validated.data.judul,
        tipe: params.tipeDokumen,
        idUser: user?.idUser!,
    })

    return redirect(`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}`)


}

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const listLayananDropdown = await getListLayananDropdown(user?.idSubBidang!)

    return { listLayananDropdown }
}


export default function AddNewDokumen({ params, loaderData }: Route.ComponentProps) {

    const { listLayananDropdown } = loaderData




    return (
        <FormDokumen tipeDokumen={params.tipeDokumen as TIPE_DOKUMEN} listLayanan={listLayananDropdown} mode="insert" />
    )
}