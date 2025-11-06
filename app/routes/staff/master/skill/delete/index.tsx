import { redirect } from "react-router";
import type { Route } from "./+types/index";
import { deleteSkill } from "./_service";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const action = formData.get("_action")
    const idSkill = formData.get("idSkill") as string

    // let deletedNamaLayanan: { namaLayanan: string | null }[] = []
    if (action === "delete") {
        let deletedNamaSkill = await deleteSkill(idSkill)

        const flashHeaders = await setFlashSession(request, {
            type: "success",
            message: `Layanan ${deletedNamaSkill[0].namaSkill} berhasil dihapus`
        })
        return redirect("..", { headers: flashHeaders })
    }


}