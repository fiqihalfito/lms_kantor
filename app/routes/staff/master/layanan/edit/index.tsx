import { FormLayanan } from "../_components/form-layanan";
import type { Route } from "./+types/index";
import { getNamaLayananById, mUpdateLayananValidation, updateLayanan } from "./_service";
import z from "zod";
import { data, redirect } from "react-router";
import { setFlashSession } from "~/lib/session.server";

export async function loader({ request, params }: Route.LoaderArgs) {

    const namaLayanan = await getNamaLayananById(params.idLayanan)
    return { namaLayanan: namaLayanan[0].namaLayanan }
}

export async function action({ request, params }: Route.ActionArgs) {


    const formData = await request.formData()
    const newLayanan = Object.fromEntries(formData)

    const validated = mUpdateLayananValidation.safeParse(newLayanan)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }

    await updateLayanan(params.idLayanan, validated.data.namaLayanan)

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `Berhasil diubah ke ${validated.data.namaLayanan}`
    })
    return redirect("..", { headers: flashHeaders })
}

export default function EditLayanan({ loaderData }: Route.ComponentProps) {

    const { namaLayanan } = loaderData

    return (
        <FormLayanan mode="update" defaultValues={{ namaLayanan: namaLayanan }} />
    )
}