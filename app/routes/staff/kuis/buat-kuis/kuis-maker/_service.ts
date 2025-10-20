import { db } from "database/connect";
import { tDokumen, tKuis, tKuisElement } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getDokumenDataById(idDokumen: string) {
    const res = await db.select().from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))
    return res
}

export async function getCurrentKuis(idDokumen: string) {
    const res = await db.select().from(tKuis).where(eq(tKuis.idDokumen, idDokumen))
    return res
}

export async function createKuis(idDokumen: string) {
    const res = await db.insert(tKuis).values({ idDokumen: idDokumen }).returning({ idKuis: tKuis.idKuis })
    return res
}

export async function getSoal(idKuis: string) {
    const res = await db.select().from(tKuisElement).where(eq(tKuisElement.idKuis, idKuis)).orderBy(tKuisElement.createdAt)
    return res
}