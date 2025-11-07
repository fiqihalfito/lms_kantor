import { db } from "database/connect";
import { tDokumen, tKuisElement, tKuisProgress } from "database/schema/schema";
import { and, eq } from "drizzle-orm";

export async function registerKuisProgress(idKuis: string, idUser: string, idSkill: string | null) {
    const res = await db.insert(tKuisProgress).values({
        idKuis: idKuis,
        idUser: idUser,
        idSkill: idSkill
    }).returning()
    return res
}

export async function getFirstSoal(idKuis: string) {
    const res = await db.select({ idKuisElement: tKuisElement.idKuisElement }).from(tKuisElement).where(eq(tKuisElement.idKuis, idKuis)).limit(1)
    return res
}

export async function checkKuisProgressExist(idKuis: string, idUser: string) {
    const res = await db.select().from(tKuisProgress).where(and(eq(tKuisProgress.idKuis, idKuis), eq(tKuisProgress.idUser, idUser)))
    return res
}

export async function resetKuis(idKuisProgress: string) {
    await db.update(tKuisProgress).set({
        isSelesai: false,
        jumlahBenar: 0
    }).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
}

export async function getIdSkillFromDokumenByIdKuis(idKuis: string) {
    const dokumen = await db.select().from(tDokumen).where(eq(tDokumen.idKuis, idKuis))
    return dokumen[0].idSkill
}