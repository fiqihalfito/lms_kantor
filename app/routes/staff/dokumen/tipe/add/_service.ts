
import { db } from "database/connect";
import { mLayanan, mMemberTeam, tDokumen, tDokumenTeam } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

export const tInsertNewDokumenValidation = z.object({
    judul: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(1, "Judul tidak boleh kosong"),
    layanan: z.preprocess(val => val === "" ? null : val, z.string().nullable()).optional(),
    file: z
        .file({ error: "File wajib diupload" })
        .mime(["application/pdf"], { error: "hanya upload pdf" })
        .max(5 * 1024 * 1024, { error: "max 5 mb" }), // file diambil dari hasil parse
});

export async function saveNewDokumen({ filename, idLayanan, idSubBidang, judul, tipe, idUser }: typeof tDokumen.$inferInsert) {
    const newIDDokumen = await db.insert(tDokumen).values({
        filename: filename,
        judul: judul,
        idLayanan: idLayanan,
        idSubBidang: idSubBidang,
        tipe: tipe,
        idUser: idUser,
    }).returning({ idDokumen: tDokumen.idDokumen })

    return newIDDokumen
}

export async function saveDokumentoTeam(idTeam: string | null, idDokumen: string) {
    await db.insert(tDokumenTeam).values({
        idTeam: idTeam,
        idDokumen: idDokumen
    })
        .onConflictDoUpdate({
            target: tDokumenTeam.idDokumen,
            set: {
                idTeam: idTeam
            }
        })
}

export async function checkWhichTeam(idUser: string) {
    const res = await db.select().from(mMemberTeam).where(eq(mMemberTeam.idUser, idUser))
    return res
}

export async function getListLayananDropdown(idSubBidang: string) {
    const res = await db.select().from(mLayanan).where(eq(mLayanan.idSubBidang, idSubBidang)).orderBy(mLayanan.nama)
    return res
}
