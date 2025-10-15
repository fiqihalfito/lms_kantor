import { FormTeam } from "../_components/form-team";
import type { Route } from "./+types/index";
import { getTeamById, mUpdateUserValidation, updateTeam } from "./_service";
import z from "zod";
import { data, redirect } from "react-router";
import { setFlashSession } from "~/lib/session.server";

export async function loader({ request, params }: Route.LoaderArgs) {

    const teamData = await getTeamById(params.idTeam)
    return { namaTeam: teamData[0].namaTeam }
}

export async function action({ request, params }: Route.ActionArgs) {


    const formData = await request.formData()
    const newLayanan = Object.fromEntries(formData)

    const validated = mUpdateUserValidation.safeParse(newLayanan)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }

    await updateTeam(params.idTeam, validated.data.namaTeam)

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `Berhasil diubah ke [${validated.data.namaTeam}]`
    })
    return redirect("..", { headers: flashHeaders })
}

export default function EditLayanan({ loaderData }: Route.ComponentProps) {

    const { namaTeam } = loaderData

    return (
        <FormTeam mode="update" defaultValues={{ namaTeam: namaTeam }} />
    )
}