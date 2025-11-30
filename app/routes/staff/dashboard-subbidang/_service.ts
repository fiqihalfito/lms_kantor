import { db } from "database/connect";
import { mSkill, mSubBidang, mSubSkill, mTeam, mUser, tDokumen, tKuis, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, count, eq, notInArray, sql } from "drizzle-orm";
import type { TIPE_DOKUMEN } from "~/lib/constants";

// export async function getSubbidangName(idSubbidang: string) {
//        const res = await db.select({nama: })
// }

export async function getAllSkill(idSubBidang: string) {
    const res = await db.query.mSkill.findMany({
        where: eq(mSkill.idSubBidang, idSubBidang),
        with: {
            subSkill: true,
        }
    })
    return res
}


export async function getTeamAndMember(idSubBidang: string) {
    const res = await db.query.mTeam.findMany({
        with: {
            user: {
                columns: {
                    nama: true,
                    idUser: true,
                    idTeam: true
                },
                with: {
                    kuisProgress: {
                        with: {
                            subSkill: true,
                            kuis: {
                                columns: {
                                    idKuis: true,
                                },
                                with: {
                                    kuisElement: {
                                        columns: {
                                            idKuisElement: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    // const res = await db.select()
    //     .from(mUser)
    //     .fullJoin(tDokumen, eq(mUser.idUser, tDokumen.idDokumen))
    //     .leftJoin(tKuisProgress, eq(tKuisProgress.idUser, mUser.idUser))
    //     .leftJoin(mTeam, eq(mTeam.idSubBidang, mSubBidang.idSubBidang))
    //     .leftJoin(mMemberTeam, eq(mMemberTeam.idUser, mUser.idUser))
    //     .leftJoin(tKuis, eq(tKuis.idDokumen, tDokumen.idDokumen))
    //     .where(and(
    //         eq(mUser.idSubBidang, idSubBidang)
    //     ))

    return res
}

export async function getAllUsersWithScore(idSubBidang: string) {
    const raw = await db.query.mUser.findMany({
        where: and(
            eq(mUser.idSubBidang, idSubBidang)
        ),
        columns: {
            password: false
        },
        with: {
            kuisProgress: {
                with: {
                    subSkill: {
                        columns: {
                            idSubSkill: true
                        },
                        with: {
                            skill: {
                                columns: {
                                    idSkill: true
                                }
                            }
                        }
                    },
                    kuis: {
                        columns: {
                            idKuis: true,
                        },
                        with: {
                            kuisElement: {
                                columns: {
                                    idKuisElement: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const sumSubskillPerSkill = await db.select({
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        jumlahSubskill: count(mSubSkill.idSubSkill)
    }).from(mSkill)
        .innerJoin(mSubSkill, eq(mSubSkill.idSkill, mSkill.idSkill))
        .where(eq(mSkill.idSubBidang, idSubBidang))
        .groupBy(mSkill.idSkill)
    const sumSubskillPerSkillMap = new Map(sumSubskillPerSkill.map(item => [item.idSkill, item.jumlahSubskill]))


    const res = raw.map((user) => {

        const persentaseTiapSkill: Record<string, number> = {};
        const skillProgressSum: Record<string, number> = {};

        for (const kp of user.kuisProgress) {
            const skillId = kp?.subSkill?.skill?.idSkill;
            if (!skillId) continue;

            const jumlahBenar = kp?.jumlahBenar ?? 0;
            const jumlahSoal = kp?.kuis?.kuisElement.length ?? 0;
            const persentaseSubskill = jumlahSoal && jumlahSoal > 0 ? (jumlahBenar / jumlahSoal) * 100 : 0;

            if (!skillProgressSum[skillId]) {
                skillProgressSum[skillId] = 0;
            }
            skillProgressSum[skillId] += persentaseSubskill;
        }

        for (const skillId in skillProgressSum) {
            const totalSubskillsForSkill = sumSubskillPerSkillMap.get(skillId) ?? 0;
            if (totalSubskillsForSkill > 0) {
                persentaseTiapSkill[skillId] = skillProgressSum[skillId] / totalSubskillsForSkill;
            } else {
                persentaseTiapSkill[skillId] = 0; // Handle cases where there are no subskills defined for a skill
            }
        }



        return {
            ...user,
            persentaseTiapSkill
        }
    })

    return res
}

export async function getAllTeams(idSubBidang: string) {
    const res = await db.query.mTeam.findMany({
        where: and(
            eq(mTeam.idSubBidang, idSubBidang)
        )
    })
    return res
}

// export async function getSubSkillSkor(idSubBidang: string) {
//     const res = await db.query.tKuisProgress.findMany({
//         where: eq(tKuisProgress., idSubBidang)
//     })
//     return res
// }

export async function getUnskilled(idSkilled: string[]) {
    const res = await db.select({
        idDokumen: tDokumen.idDokumen,
        judulDokumen: tDokumen.judul
    }).from(tDokumen)
        .where(notInArray(tDokumen.idDokumen, idSkilled))
    return res
}

export async function getJumlahDokumen(idSubBidang: string, tipe: TIPE_DOKUMEN) {
    const res = await db.$count(tDokumen, and(eq(tDokumen.idSubBidang, idSubBidang), eq(tDokumen.tipe, tipe)))
    return res
}

export async function getDokumenAndStatusReadCount(
    idSubbidang: string,
    tipe: TIPE_DOKUMEN
) {

    const res = await db
        .select({
            judul: tDokumen.judul,
            tipe: tDokumen.tipe,
            // Hitung jumlah user yang sudah baca (isRead = true)
            jumlahDibaca: sql<number>`
                COUNT(CASE WHEN ${tStatusBaca.isRead} = true THEN 1 END)
            `.as('jumlah_dibaca'),
        })
        .from(tDokumen)
        .leftJoin(tStatusBaca, eq(tStatusBaca.idDokumen, tDokumen.idDokumen))
        .where(
            and(
                eq(tDokumen.idSubBidang, idSubbidang),
                eq(tDokumen.tipe, tipe)
            )
        )
        .groupBy(tDokumen.idDokumen, tDokumen.judul, tDokumen.tipe);

    return res;
}

export async function getJumlahOrang(idSubBidang: string) {
    const res = await db.$count(mUser, eq(mUser.idSubBidang, idSubBidang))
    return res
}

