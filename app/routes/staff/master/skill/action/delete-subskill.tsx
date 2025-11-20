// action delete subskill

import { dataWithError, dataWithSuccess } from "remix-toast";
import { deleteSubSkill } from "../_service";
import type { Route } from "./+types/delete-subskill";
import { getFilenameDokumenBySubSkillId } from "../_service";
import { deleteInRealBucket } from "~/lib/minio.server";


export async function action({ request, params }: Route.ActionArgs) {


    try {
        const deleted = await deleteSubSkill(params.idSubSkill)

        // delete file if exist
        const oldFilename = await getFilenameDokumenBySubSkillId(params.idSubSkill)
        if (oldFilename) {
            await deleteInRealBucket("dokumen", oldFilename)
        }

        return dataWithSuccess({ ok: true }, `subskill ${deleted[0].namaSubSkill} berhasil dihapus`)
    } catch (error) {
        return dataWithError({ ok: false }, `Gagal dihapus`)
    }

}