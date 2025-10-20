import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { eq } from "drizzle-orm";

export async function getDokumenById(idDokumen: string) {
    const res = await db.select().from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))
    return res
}