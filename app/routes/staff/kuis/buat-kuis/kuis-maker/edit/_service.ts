import { db } from "database/connect";
import { tKuisElement } from "database/schema/schema";
import { eq } from "drizzle-orm";
import z from "zod";

export async function getCurrentKuisElement(idKuisElement: string) {
    const res = await db.select().from(tKuisElement).where(eq(tKuisElement.idKuisElement, idKuisElement))
    return res
}


export async function updateSoal(idKuisElement: string, { idKuis, jawaban, pilgan, soal }: typeof tKuisElement.$inferInsert) {
    await db.update(tKuisElement).set({
        idKuis: idKuis,
        jawaban: jawaban,
        pilgan: pilgan,
        soal: soal
    }).where(eq(tKuisElement.idKuisElement, idKuisElement))
}

export const tUpdateKuisElementValidation = z.object({
    idKuis: z.string(),
    soal: z.string(),
    a: z.string(),
    b: z.string(),
    c: z.string(),
    d: z.string(),
    jawaban: z.string()
})