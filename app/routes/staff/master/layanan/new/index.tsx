import { userContext } from "~/lib/context";
import { FormLayanan } from "../_components/form-layanan";
import type { Route } from "./+types/index";
import { mInsertNewLayananValidation, saveNewLayanan } from "./_service";
import { data, redirect } from "react-router";
import * as z from "zod";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, context }: Route.ActionArgs) {

    const user = context.get(userContext)

    const formData = await request.formData()
    const newLayanan = Object.fromEntries(formData)

    const validated = mInsertNewLayananValidation.safeParse(newLayanan)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }

    await saveNewLayanan(user?.idSubBidang!, validated.data.namaLayanan)

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `Layanan ${validated.data.namaLayanan} berhasil disimpan`
    })
    return redirect("..", {
        headers: flashHeaders
    })
}

export default function NewLayanan({ }: Route.ComponentProps) {

    return (
        <FormLayanan mode="insert" />
    )
}