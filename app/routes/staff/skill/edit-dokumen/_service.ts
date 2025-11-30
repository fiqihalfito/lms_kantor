import { eq, getTableColumns } from "drizzle-orm";
import { db } from "database/connect";
import { mSubSkill, tDokumen } from "database/schema/schema";

export async function getDokumenByIdDokumen(idDokumen: string) {
    const [data] = await db.select({
        judul: tDokumen.judul,
        filename: tDokumen.filename
    }).from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen));
    return data;
}

export async function updateDokumen(idDokumen: string, param: Partial<typeof tDokumen.$inferInsert>) {
    const updatedDokumen = await db.update(tDokumen).set(param).where(eq(tDokumen.idDokumen, idDokumen)).returning({ idDokumen: tDokumen.idDokumen })

    return updatedDokumen[0].idDokumen
}

export async function getNamaSubskill(idSubSkill: string) {
    const { namaSubSkill } = getTableColumns(mSubSkill)
    const res = await db.select({ namaSubSkill }).from(mSubSkill).where(eq(mSubSkill.idSubSkill, idSubSkill))
    return res[0]
}

export async function getFilenameDokumenByIdDokumen(idDokumen: string) {
    const [data] = await db.select({
        filename: tDokumen.filename
    }).from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen));
    return data?.filename;
}

