import { db } from "database/connect";
import { mSubSkill, mUser, tDokumen, tKuis, tKuisElement, tKuisProgress } from "database/schema/schema";
import { and, eq, notInArray } from "drizzle-orm";

export async function getAllSubSkillByLevel(idUser: string, idSkill: string) {
    // const res = await db.query.mUser.findMany({
    //     with: {
    //         kuisProgress: {
    //             where: and(
    //                 eq(tKuisProgress.idUser, idUser),
    //                 eq(tKuisProgress.isSelesai, true)
    //             ),
    //             with: {
    //                 subSkill: {
    //                     with: {
    //                         skill: true
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     where: eq(mUser.idUser, idUser)
    // })
    const res = await db.query.mSubSkill.findMany({
        with: {
            skill: true,
            kuisProgress: {
                where: and(
                    eq(tKuisProgress.idUser, idUser),
                    // eq(tKuisProgress.isSelesai, true)
                ),
                with: {
                    kuis: {
                        // extras: {
                        //     jumlahSoal: db.$count(tKuisElement, eq(tKuisElement.idKuis, tKuis.idKuis)).as("jumlahSoal")
                        // }
                        with: {
                            kuisElement: {
                                columns: {
                                    idKuisElement: true
                                }
                            }
                        }
                    }
                }
            },

        },
        where: eq(mSubSkill.idSkill, idSkill),
        orderBy: [mSubSkill.level, mSubSkill.urutan]
    })

    const groupedLevel = Object.entries(res.reduce((acc, item) => {
        if (!acc[item.level]) {
            acc[item.level] = []
        }
        acc[item.level].push(item)
        return acc
    }, {} as Record<number, typeof res>))

    return { namaSkill: res[0].skill?.namaSkill, groupedLevelSubSkill: groupedLevel }
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
        nama: mUser.nama,
        idTeam: mUser.idTeam
    }).from(mUser).where(eq(mUser.idUser, idUser))

    return res[0]
}