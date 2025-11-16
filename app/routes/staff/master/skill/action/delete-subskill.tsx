// action delete subskill

import { dataWithError, dataWithSuccess } from "remix-toast";
import { deleteSubSkill } from "../_service";
import type { Route } from "./+types/delete-subskill";


export async function action({ request, params }: Route.ActionArgs) {


    try {
        // throw new Error()
        const deleted = await deleteSubSkill(params.idSubSkill)

        return dataWithSuccess({ ok: true }, `subskill ${deleted[0].namaSubSkill} berhasil dihapus`)
    } catch (error) {
        return dataWithError({ ok: false }, `Gagal dihapus`)
    }

}