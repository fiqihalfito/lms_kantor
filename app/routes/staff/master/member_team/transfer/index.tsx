import { setFlashSession } from "~/lib/session.server";
import type { Route } from "./+types/index";
import { transferMemberToAnotherTeam } from "./_service";
import { redirect } from "react-router";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const newTeam = Object.fromEntries(formData)

    await transferMemberToAnotherTeam({
        originTeam: params.idTeam,
        destinationTeam: String(newTeam.destinationTeam),
        idUser: String(newTeam.idUser)
    })

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `${String(newTeam.namaUser)} Berhasil dipindahkan ke ${String(newTeam.namaDestinationTeam)}`
    })
    return redirect(`../../${String(newTeam.destinationTeam)}`, { headers: flashHeaders })
}