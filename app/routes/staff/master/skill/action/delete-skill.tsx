import { dataWithError, dataWithSuccess } from "remix-toast";
import { deleteSkill } from "../_service";
import type { Route } from "./+types/delete-skill";



export async function action({ request, params }: Route.ActionArgs) {

    try {
        const deleted = await deleteSkill(params.idSkill)
        return dataWithSuccess({ ok: true }, `Skill ${deleted[0].namaSkill} berhasil dihapus`)
    } catch (error) {
        return dataWithError(null, `Gagal menghapus`)
    }

}