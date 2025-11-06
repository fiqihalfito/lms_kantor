import { FormSkill } from "../_components/form-skill";
import type { Route } from "./+types/index";
import { getSkillById, mUpdateSkillValidation, updateSkill } from "./_service";
import z from "zod";
import { data, redirect } from "react-router";
import { setFlashSession } from "~/lib/session.server";
import { getListTeam } from "../new/_service";
import { userContext } from "~/lib/context";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const skill = await getSkillById(params.idSkill)
    const listTeam = await getListTeam(user?.idSubBidang!)
    return { skill, listTeam }
}

export async function action({ request, params }: Route.ActionArgs) {


    const formData = await request.formData()
    const newSkill = Object.fromEntries(formData)

    const validated = mUpdateSkillValidation.safeParse(newSkill)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }

    await updateSkill(params.idSkill, validated.data.namaSkill, validated.data.idTeam)

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `Berhasil diubah ke ${validated.data.namaSkill}`
    })
    return redirect("..", { headers: flashHeaders })
}

export default function EditLayanan({ loaderData }: Route.ComponentProps) {

    const { skill, listTeam } = loaderData

    return (
        <FormSkill mode="update" defaultValues={{ namaSkill: skill[0].namaSkill, idTeam: skill[0].idTeam }} listTeam={listTeam} />
    )
}