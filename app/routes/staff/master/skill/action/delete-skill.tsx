import { dataWithError, dataWithSuccess } from "remix-toast";
import { deleteSkill, getManyDokumenBySubSkillIds, getSubSkillByidSkill } from "../_service";
import type { Route } from "./+types/delete-skill";
import { deleteManyInRealBucket } from "~/lib/minio.server";



export async function action({ request, params }: Route.ActionArgs) {

    try {
        const deleted = await deleteSkill(params.idSkill)

        const subSkills = await getSubSkillByidSkill(params.idSkill)

        // menghapus banyak file di minio kalau ada
        if (subSkills.length > 0) {
            const dokumens = await getManyDokumenBySubSkillIds(subSkills.map((sub) => sub.idSubSkill))
            await deleteManyInRealBucket("dokumen", dokumens.filter((dok) => dok.filename !== null).map((dok) => dok.filename!))
        }

        return dataWithSuccess({ ok: true }, `Skill ${deleted[0].namaSkill} berhasil dihapus`)
    } catch (error) {
        return dataWithError(null, `Gagal menghapus`)
    }

}