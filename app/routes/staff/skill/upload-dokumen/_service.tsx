import { db } from "database/connect";
import { mSubSkill, tDokumen } from "database/schema/schema";
import { eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const tInsertNewDokumenValidation = z.object({
    judul: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(1, "Judul tidak boleh kosong"),
    file: z
        .file({ error: "File wajib diupload" })
        .mime(["application/pdf"], { error: "hanya upload pdf" })
        .max(5 * 1024 * 1024, { error: "max 5 mb" }), // file diambil dari hasil parse
});

export async function saveNewDokumen(param: typeof tDokumen.$inferInsert) {
    const newIDDokumen = await db.insert(tDokumen).values({
        filename: param.filename,
        judul: param.judul,
        idLayanan: param.idLayanan,
        idSubBidang: param.idSubBidang,
        tipe: param.tipe,
        idUser: param.idUser,
        idTeam: param.idTeam,
        idSubSkill: param.idSubSkill
    }).returning({ idDokumen: tDokumen.idDokumen })

    return newIDDokumen
}

export async function getNamaSubskill(idSubSkill: string) {
    const { namaSubSkill } = getTableColumns(mSubSkill)
    const res = await db.select({ namaSubSkill }).from(mSubSkill).where(eq(mSubSkill.idSubSkill, idSubSkill))
    return res[0]
}