import { db } from "database/connect";
import { mSkill, mUser, tDokumen, tKuisProgress } from "database/schema/schema";
import { and, eq, notInArray } from "drizzle-orm";

export async function getAllSkill(idUser: string, idTeam: string) {
    const res = await db.query.mSkill.findMany({
        with: {
            kuisProgress: {
                where: and(
                    eq(tKuisProgress.idUser, idUser),
                    eq(tKuisProgress.isSelesai, true)
                ),
                with: {
                    kuis: {
                        with: {
                            dokumen: {
                                columns: {
                                    judul: true
                                }
                            }
                        }
                    }
                }
            }
        },
        where: eq(mSkill.idTeam, idTeam)
    })
    // const res = await db.query.tKuisProgress.findMany({
    //     with: {
    //         kuis: {
    //             with: {
    //                 dokumen: {
    //                     columns: {
    //                         idDokumen: true,
    //                         judul: true
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     where: eq(tKuisProgress.idUser, idUser)
    // })

    return res
}

export async function getUnskilled(idSubBidang: string, idSkilled: string[]) {
    const res = await db.select({
        idDokumen: tDokumen.idDokumen,
        judulDokumen: tDokumen.judul
    }).from(tDokumen)
        .where(and(
            eq(tDokumen.idSubBidang, idSubBidang),
            notInArray(tDokumen.idDokumen, idSkilled)
        ))

    return res
}

export async function getUserData(idUser: string) {
    const res = await db.select({
        idUser: mUser.idUser,
        nama: mUser.nama
    }).from(mUser).where(eq(mUser.idUser, idUser))

    return res[0]
}