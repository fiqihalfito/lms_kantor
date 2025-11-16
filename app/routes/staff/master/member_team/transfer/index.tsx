import { redirectWithSuccess } from "remix-toast";
import type { Route } from "./+types/index";
import { getNamaTeamById, transferMemberToAnotherTeam } from "./_service";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const newTeam = Object.fromEntries(formData)

    await transferMemberToAnotherTeam({
        destinationTeam: String(newTeam.destinationTeam),
        idUser: String(newTeam.idUser)
    })

    const destinationTeamName = await getNamaTeamById(String(newTeam.destinationTeam))

    // const flashHeaders = await setFlashSession(request, {
    //     type: "success",
    //     message: `${String(newTeam.namaUser)} Berhasil dipindahkan ke ${destinationTeamName}`
    // })
    // return redirect(`../../${String(newTeam.destinationTeam)}`, { headers: flashHeaders })
    return redirectWithSuccess(`../../${String(newTeam.destinationTeam)}`, `${String(newTeam.namaUser)} Berhasil dipindahkan ke ${destinationTeamName}`)
}