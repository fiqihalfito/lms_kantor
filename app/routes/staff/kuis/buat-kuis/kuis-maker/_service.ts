import { db } from "database/connect";
import { tDokumen, tKuis, tKuisElement } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getDokumenDataById(idDokumen: string) {
    const res = await db.select().from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))
    return res
}

export async function getCurrentKuis(idKuis: string) {
    const res = await db.select().from(tKuis).where(eq(tKuis.idKuis, idKuis))
    return res
}

export async function createKuis(idSubBidang: string, idDokumen: string) {
    const idKuisBaru = await db.insert(tKuis).values({ idSubBidang: idSubBidang }).returning({ idKuis: tKuis.idKuis })
    await db.update(tDokumen).set({
        idKuis: idKuisBaru[0].idKuis
    }).where(eq(tDokumen.idDokumen, idDokumen))
    return idKuisBaru[0].idKuis
}

export async function getSoal(idKuis: string) {
    const res = await db.select().from(tKuisElement).where(eq(tKuisElement.idKuis, idKuis)).orderBy(tKuisElement.createdAt)
    return res
}