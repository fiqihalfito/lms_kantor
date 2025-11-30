
import { db } from "database/connect";
import { mLayanan, mSkill, tDokumen } from "database/schema/schema";
import { and, eq } from "drizzle-orm";

export async function saveNewDokumen({ filename, idLayanan, idSubBidang, judul, tipe, idUser, idTeam, idSubSkill }: typeof tDokumen.$inferInsert) {
    const newIDDokumen = await db.insert(tDokumen).values({
        filename: filename,
        judul: judul,
        idLayanan: idLayanan,
        idSubBidang: idSubBidang,
        tipe: tipe,
        idUser: idUser,
        idTeam: idTeam,
        idSubSkill: idSubSkill
    }).returning({ idDokumen: tDokumen.idDokumen })

    return newIDDokumen
}

// export async function saveDokumentoTeam(idTeam: string | null, idDokumen: string) {
//     await db.insert(tDokumenTeam).values({
//         idTeam: idTeam,
//         idDokumen: idDokumen
//     })
//         .onConflictDoUpdate({
//             target: tDokumenTeam.idDokumen,
//             set: {
//                 idTeam: idTeam
//             }
//         })
// }

// export async function checkWhichTeam(idUser: string) {
//     const res = await db.select().from(mMemberTeam).where(eq(mMemberTeam.idUser, idUser))
//     return res
// }

export async function getListLayananDropdown(idSubBidang: string) {
    const res = await db.select().from(mLayanan).where(eq(mLayanan.idSubBidang, idSubBidang)).orderBy(mLayanan.nama)
    return res
}

export async function getListSkillDropdown(idSubBidang: string, idTeam?: string | null) {
    const res = await db.select().from(mSkill)
        .where(and(
            eq(mSkill.idSubBidang, idSubBidang),
            idTeam ? eq(mSkill.idTeam, idTeam) : undefined
        ))
        .orderBy(mSkill.namaSkill)
    return res
}
