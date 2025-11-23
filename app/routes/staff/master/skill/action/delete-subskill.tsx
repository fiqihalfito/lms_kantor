// action delete subskill

import { dataWithError, dataWithSuccess } from "remix-toast";
import { deleteKuis, deleteSubSkill, getDokumenBySubSkillId } from "../_service";
import type { Route } from "./+types/delete-subskill";
import { getFilenameDokumenBySubSkillId } from "../_service";
import { deleteInRealBucket } from "~/lib/minio.server";


export async function action({ request, params }: Route.ActionArgs) {


    try {

        // delete file if exist
        const oldFilename = await getFilenameDokumenBySubSkillId(params.idSubSkill)
        if (oldFilename) {
            await deleteInRealBucket("dokumen", oldFilename)
        }

        // find dokumen by idSubskill and delete idkuis first
        const dokumen = await getDokumenBySubSkillId(params.idSubSkill)
        if (dokumen.length > 0) {
            if (dokumen[0].idKuis) {
                await deleteKuis(dokumen[0].idKuis)
            }
        }



        // here will delete subskill and dokumen automatically
        const deletedSubSkill = await deleteSubSkill(params.idSubSkill)



        return dataWithSuccess({ ok: true }, `subskill ${deletedSubSkill[0].namaSubSkill} berhasil dihapus`)
    } catch (error) {
        return dataWithError({ ok: false }, `Gagal dihapus`)
    }

}