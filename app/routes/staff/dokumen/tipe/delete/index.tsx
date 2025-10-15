import type { Route } from "./+types/index";
import { deleteDokumen } from "./_service";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const action = formData.get("_action")
    const idDokumen = formData.get("idDokumen") as string

    let deletedJudul
    if (action === "delete") {
        deletedJudul = await deleteDokumen(idDokumen)
    }


    return { deletedJudul }
}