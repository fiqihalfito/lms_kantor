import { eq, getTableColumns } from "drizzle-orm";
import { db } from "database/connect";
import { mSubSkill, tDokumen } from "database/schema/schema";
import z from "zod";

export async function getDokumenByIdDokumen(idDokumen: string) {
    const [data] = await db.select({
        judul: tDokumen.judul,
        filename: tDokumen.filename
    }).from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen));
    return data;
}

export const tUpdateNewDokumenValidation = z.object({
    judul: z
        .string({
            error: (iss) => iss.input === undefined ? "Judul is required." : "Invalid input."
        })
        .min(1, "Judul tidak boleh kosong"),
    file: z
        .instanceof(File, { message: "File wajib diupload" })
        .refine((file) => file.size === 0 || file.type === "application/pdf", {
            message: "hanya upload pdf"
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "max 5 mb"
        })
        .transform((file) => (file.size > 0 ? file : null))
        .nullable()
});

export async function updateDokumen(idDokumen: string, param: Partial<typeof tDokumen.$inferInsert>) {
    const updatedDokumen = await db.update(tDokumen).set(param).where(eq(tDokumen.idDokumen, idDokumen))

    return updatedDokumen
}

export async function getNamaSubskill(idSubSkill: string) {
    const { namaSubSkill } = getTableColumns(mSubSkill)
    const res = await db.select({ namaSubSkill }).from(mSubSkill).where(eq(mSubSkill.idSubSkill, idSubSkill))
    return res[0]
}

export async function getFilenameDokumenByIdDokumen(idDokumen: string) {
    const [data] = await db.select({
        filename: tDokumen.filename
    }).from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen));
    return data?.filename;
}
