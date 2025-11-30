import { db } from "database/connect";
import { mSubSkill, tDokumen } from "database/schema/schema";
import { eq, getTableColumns } from "drizzle-orm";

export async function saveNewDokumen(param: typeof tDokumen.$inferInsert) {
    const newIDDokumen = await db.insert(tDokumen).values({
        filename: param.filename,
        judul: param.judul,
        idLayanan: param.idLayanan,
        idSubBidang: param.idSubBidang,
        tipe: param.tipe,
        idUser: param.idUser,
        idTeam: param.idTeam,
        idSubSkill: param.idSubSkill
    }).returning({ idDokumen: tDokumen.idDokumen })

    return newIDDokumen
}

export async function getNamaSubskill(idSubSkill: string) {
    const { namaSubSkill } = getTableColumns(mSubSkill)
    const res = await db.select({ namaSubSkill }).from(mSubSkill).where(eq(mSubSkill.idSubSkill, idSubSkill))
    return res[0]
}