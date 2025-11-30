import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getDokumenDataById(idDokumen: string) {
    const res = await db.select().from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))
    return res
}

export async function updateDokumen(idDokumen: string, { filename, idLayanan, idSubBidang, judul, tipe, idUser, idTeam, idSubSkill }: typeof tDokumen.$inferInsert) {
    await db.update(tDokumen).set({
        filename: filename,
        judul: judul,
        idLayanan: idLayanan,
        idSubBidang: idSubBidang,
        tipe: tipe,
        idUser: idUser,
        idTeam: idTeam,
        idSubSkill: idSubSkill,
        updatedAt: new Date().toISOString()
    }).where(eq(tDokumen.idDokumen, idDokumen))
}

