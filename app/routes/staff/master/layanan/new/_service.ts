import { db } from "database/connect";
import { mLayanan } from "database/schema/schema";
import * as z from "zod"

export async function saveNewLayanan(idSubBidang: string, nama: string) {
    await db.insert(mLayanan).values({ idSubBidang: idSubBidang, nama: nama })
}

export const mInsertNewLayananValidation = z.object({
    namaLayanan: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(1, "Nama layanan tidak boleh kosong"),
});