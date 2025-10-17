import { db } from "database/connect";
import { tKuisElement } from "database/schema/schema";
import z from "zod";


export async function saveNewSoal({ idKuis, jawaban, pilgan, soal }: typeof tKuisElement.$inferInsert) {
    await db.insert(tKuisElement).values({
        idKuis: idKuis,
        jawaban: jawaban,
        pilgan: pilgan,
        soal: soal
    })
}

export const tInsertKuisElementValidation = z.object({
    idKuis: z.string(),
    soal: z.string(),
    a: z.string(),
    b: z.string(),
    c: z.string(),
    d: z.string(),
    jawaban: z.string()
})