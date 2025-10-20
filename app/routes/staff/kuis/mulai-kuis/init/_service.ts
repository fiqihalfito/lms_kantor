import { db } from "database/connect";
import { tKuisElement, tKuisProgress } from "database/schema/schema";
import { and, eq } from "drizzle-orm";

export async function registerKuisProgress(idKuis: string, idUser: string) {
    const res = await db.insert(tKuisProgress).values({
        idKuis: idKuis,
        idUser: idUser,
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