import { redirect } from "react-router";
import type { Route } from "./+types/index";
import { deleteTeam } from "./_service";
import { redirectWithSuccess } from "remix-toast";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const action = formData.get("_action")
    const idTeam = formData.get("idTeam") as string

    // let deletedNamaLayanan: { namaLayanan: string | null }[] = []
    if (action === "delete") {
        let deletedNamaTeam = await deleteTeam(idTeam)

        // const flashHeaders = await setFlashSession(request, {
        //     type: "success",
        //     message: `Team ${deletedNamaTeam[0].namaTeam} berhasil dihapus`
        // })
        // return redirect("..", { headers: flashHeaders })
        return redirectWithSuccess("..", `Team ${deletedNamaTeam[0].namaTeam} berhasil dihapus`)
    }


}