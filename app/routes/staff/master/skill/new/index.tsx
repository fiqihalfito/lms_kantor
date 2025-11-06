import { userContext } from "~/lib/context";
import { FormSkill } from "../_components/form-skill";
import type { Route } from "./+types/index";
import { getListTeam, mInsertNewSkillValidation, saveNewSkill } from "./_service";
import { data, redirect } from "react-router";
import * as z from "zod";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, context }: Route.ActionArgs) {

    const user = context.get(userContext)

    const formData = await request.formData()
    const newSkill = Object.fromEntries(formData)

    const validated = mInsertNewSkillValidation.safeParse(newSkill)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }

    await saveNewSkill(user?.idSubBidang!, validated.data.namaSkill, validated.data.idTeam)

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `Layanan ${validated.data.namaSkill} berhasil disimpan`
    })
    return redirect("..", {
        headers: flashHeaders
    })
}

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const listTeam = await getListTeam(user?.idSubBidang!)

    return { listTeam }
}

export default function NewLayanan({ loaderData }: Route.ComponentProps) {

    const { listTeam } = loaderData

    return (
        <FormSkill mode="insert" listTeam={listTeam} />
    )
}