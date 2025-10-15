import { userContext } from "~/lib/context";
import { FormTeam } from "../_components/form-team";
import type { Route } from "./+types/index";
import { mInsertNewTeamValidation, saveNewTeam } from "./_service";
import { data, redirect } from "react-router";
import * as z from "zod";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, context }: Route.ActionArgs) {

    const user = context.get(userContext)

    const formData = await request.formData()
    const newTeam = Object.fromEntries(formData)

    const validated = mInsertNewTeamValidation.safeParse(newTeam)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }


    await saveNewTeam({
        idSubBidang: user?.idSubBidang!,
        nama: validated.data.namaTeam,
    })

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `User ${validated.data.namaTeam} berhasil disimpan`
    })
    return redirect("..", {
        headers: flashHeaders
    })
}

export default function NewLayanan({ }: Route.ComponentProps) {

    return (
        <FormTeam mode="insert" />
    )
}