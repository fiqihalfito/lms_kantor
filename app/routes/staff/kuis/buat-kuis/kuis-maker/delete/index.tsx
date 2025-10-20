import { redirect } from "react-router";
import type { Route } from "./+types/index";
import { deleteKuisElement } from "./_service";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const action = formData.get("_action")
    const idKuisElement = formData.get("idKuisElement") as string

    // let deletedNamaLayanan: { namaLayanan: string | null }[] = []
    if (action === "delete") {
        await deleteKuisElement(idKuisElement)

        const flashHeaders = await setFlashSession(request, {
            type: "success",
            message: `Soal berhasil dihapus`
        })
        return redirect("../..", { headers: flashHeaders })
    }


}