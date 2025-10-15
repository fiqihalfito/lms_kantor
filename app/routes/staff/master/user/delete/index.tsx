import { redirect } from "react-router";
import type { Route } from "./+types/index";
import { deleteUser } from "./_service";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const action = formData.get("_action")
    const idUser = formData.get("idUser") as string

    // let deletedNamaLayanan: { namaLayanan: string | null }[] = []
    if (action === "delete") {
        let deletedNamaUser = await deleteUser(idUser)

        const flashHeaders = await setFlashSession(request, {
            type: "success",
            message: `Layanan ${deletedNamaUser[0].namaUser} berhasil dihapus`
        })
        return redirect("..", { headers: flashHeaders })
    }


}