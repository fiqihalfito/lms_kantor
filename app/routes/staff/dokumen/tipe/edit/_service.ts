import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";


export async function getDokumenDataById(idDokumen: string) {
    const res = await db.select().from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))
    return res
}

export async function updateDokumen(idDokumen: string, { filename, idLayanan, idSubBidang, judul, tipe, idUser }: typeof tDokumen.$inferInsert) {
    await db.update(tDokumen).set({
        filename: filename,
        judul: judul,
        idLayanan: idLayanan,
        idSubBidang: idSubBidang,
        tipe: tipe,
        idUser: idUser,
        updatedAt: new Date().toISOString()
    }).where(eq(tDokumen.idDokumen, idDokumen))
}

export const tUpdateDokumenValidation = z.object({
    judul: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(1, "Judul tidak boleh kosong"),
    layanan: z.preprocess(val => val === "" ? null : val, z.string().nullable()).optional(),
    file: z
        .file()
        .mime(["application/pdf"], { error: "hanya upload pdf" })
        .max(5 * 1024 * 1024, { error: "max 5 mb" })
        .optional(), // file diambil dari hasil parse
});