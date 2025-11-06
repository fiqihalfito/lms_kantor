import { db } from "database/connect";
import { mLayanan, mSkill, mTeam, tDokumen, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, desc, eq, ilike } from "drizzle-orm";

export async function getAllDokumenByTipe(
    idSubBidang: string,
    idUser: string,
    tipe: string,
    filter: {
        idTeam?: string | null,
        idLayanan?: string | null,
        idSkill?: string | null,
        search?: string | null
    }
) {
    const res = await db.query.tDokumen.findMany({
        with: {
            subBidang: true,
            user: true,
            layanan: true,
            skill: true,
            statusBaca: {
                where: eq(tStatusBaca.idUser, idUser)
            },
            kuis: {
                with: {
                    kuisProgress: {
                        where: eq(tKuisProgress.idUser, idUser)
                    },
                    kuisElement: {
                        columns: {
                            idKuis: true
                        }
                    }
                }
            }
        },
        where: and(
            eq(tDokumen.idSubBidang, idSubBidang),
            eq(tDokumen.tipe, tipe),
            filter.idTeam ? eq(tDokumen.idTeam, filter.idTeam) : undefined,
            filter.idLayanan ? eq(tDokumen.idLayanan, filter.idLayanan) : undefined,
            filter.search ? ilike(tDokumen.judul, `%${filter.search}%`) : undefined,
            filter.idSkill ? eq(tDokumen.idSkill, filter.idSkill) : undefined,
        ),
        orderBy: [desc(tDokumen.createdAt)]
    });

    return res
}

// export async function checkWhichTeam(idUser: string) {
//     const res = await db.select().from(mMemberTeam).where(eq(mMemberTeam.idUser, idUser))
//     return res
// }

export async function getAllTeams(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}

export async function getAllLayanan(idSubBidang: string) {
    const res = await db.select().from(mLayanan).where(eq(mLayanan.idSubBidang, idSubBidang)).orderBy(mLayanan.nama)
    return res
}

export async function getAllSkill(idSubBidang: string, idTeam?: string | null) {
    const res = await db.select().from(mSkill)
        .where(and(
            eq(mSkill.idSubBidang, idSubBidang),
            idTeam ? eq(mSkill.idTeam, idTeam) : undefined
        ))
        .orderBy(mSkill.namaSkill)
    return res
}
