import { redirect } from "react-router";
import type { Route } from "./+types/index";
import { deleteLayanan } from "./_service";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const action = formData.get("_action")
    const idLayanan = formData.get("idLayanan") as string

    // let deletedNamaLayanan: { namaLayanan: string | null }[] = []
    if (action === "delete") {
        let deletedNamaLayanan = await deleteLayanan(idLayanan)

        const flashHeaders = await setFlashSession(request, {
            type: "success",
            message: `Layanan ${deletedNamaLayanan[0].namaLayanan} berhasil dihapus`
        })
        return redirect("..", { headers: flashHeaders })
    }


}