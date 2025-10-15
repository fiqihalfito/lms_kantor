import { db } from "database/connect";
import { mLayanan } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";


export async function getNamaLayananById(idLayanan: string) {
    const res = await db.select({ namaLayanan: mLayanan.nama }).from(mLayanan).where(eq(mLayanan.idLayanan, idLayanan))
    return res
}

export async function updateLayanan(idLayanan: string, namaLayanan: string) {
    await db.update(mLayanan).set({ nama: namaLayanan }).where(eq(mLayanan.idLayanan, idLayanan))
}

export const mUpdateLayananValidation = z.object({
    namaLayanan: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(1, "Nama layanan tidak boleh kosong"),
});