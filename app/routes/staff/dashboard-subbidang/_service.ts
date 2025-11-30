import { db } from "database/connect";
import { mSkill, mSubBidang, mSubSkill, mTeam, mUser, tDokumen, tKuis, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, count, eq, notInArray, sql } from "drizzle-orm";


export async function getAllSkill(idSubBidang: string) {
    const res = await db.query.mSkill.findMany({
        where: eq(mSkill.idSubBidang, idSubBidang),
        with: {
            subSkill: true,
        }
    })
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

export async function getPersentaseMembaca(idSubBidang: string) {
    const raw = await db.select({
        idDokumen: tDokumen.idDokumen,
        idTeam: mUser.idTeam,
        jumlahPembaca: count(tStatusBaca.isRead)
    }).from(tDokumen)
        .leftJoin(tStatusBaca, eq(tStatusBaca.idDokumen, tDokumen.idDokumen))
        .leftJoin(mUser, eq(mUser.idUser, tStatusBaca.idUser))
        .where(and(
            eq(tDokumen.idSubBidang, idSubBidang),
            eq(tStatusBaca.isRead, true)
        ))
        .groupBy(tDokumen.idDokumen, mUser.idTeam)

    const jumlahUserPerTeam = await db.select({
        idTeam: mTeam.idTeam,
        namaTeam: mTeam.nama,
        jumlahUser: count(mUser.idUser)
    }).from(mTeam)
        .leftJoin(mUser, eq(mUser.idTeam, mTeam.idTeam))
        .where(eq(mTeam.idSubBidang, idSubBidang))
        .groupBy(mTeam.idTeam)

    const jumlahUserMap = Object.fromEntries(jumlahUserPerTeam.map(item => [item.idTeam, item.jumlahUser]))

    const persentaseMembacaPerDokumen = raw.map(item => {
        const totalUsersInTeam = jumlahUserMap[item.idTeam!] ?? 0;
        const persentaseBaca = totalUsersInTeam ? (item.jumlahPembaca / totalUsersInTeam) * 100 : 0;
        return {
            ...item,
            persentaseBaca
        }
    })

    const persentaseMembacaPerTeam = jumlahUserPerTeam.map(team => {

        const jumlahPersentaseBaca = persentaseMembacaPerDokumen.reduce((acc, dokItem) => {
            if (dokItem.idTeam === team.idTeam) {
                acc += dokItem.persentaseBaca;
            }
            return acc;
        }, 0);

        const jumlahDokumenByTeam = persentaseMembacaPerDokumen.filter(item => item.idTeam === team.idTeam).length;
        const persentaseBaca = jumlahDokumenByTeam ? (jumlahPersentaseBaca / jumlahDokumenByTeam) : 0;

        return {
            ...team,
            persentaseBaca
        }
    })

    return persentaseMembacaPerTeam
}

export async function getPersentaseKuis(idSubBidang: string) {
    const raw = await db.select({
        idKuis: tKuis.idKuis,
        idTeam: mUser.idTeam,
        jumlahOrangKuis: count(tKuisProgress.isSelesai)
    }).from(tKuis)
        .leftJoin(tKuisProgress, eq(tKuisProgress.idKuis, tKuis.idKuis))
        .leftJoin(mUser, eq(mUser.idUser, tKuisProgress.idUser))
        .where(and(
            eq(tKuis.idSubBidang, idSubBidang),
            eq(tKuisProgress.isSelesai, true)
        ))
        .groupBy(tKuis.idKuis, mUser.idTeam)

    const jumlahUserPerTeam = await db.select({
        idTeam: mTeam.idTeam,
        namaTeam: mTeam.nama,
        jumlahUser: count(mUser.idUser)
    }).from(mTeam)
        .leftJoin(mUser, eq(mUser.idTeam, mTeam.idTeam))
        .where(eq(mTeam.idSubBidang, idSubBidang))
        .groupBy(mTeam.idTeam)

    const jumlahUserMap = Object.fromEntries(jumlahUserPerTeam.map(item => [item.idTeam, item.jumlahUser]))

    const persentaseOrangKuisPerKuis = raw.map(item => {
        const totalUsersInTeam = jumlahUserMap[item.idTeam!] ?? 0;
        const persentaseOrangKuis = totalUsersInTeam ? (item.jumlahOrangKuis / totalUsersInTeam) * 100 : 0;
        return {
            ...item,
            persentaseOrangKuis
        }
    })

    const persentaseOrangKuisPerTeam = jumlahUserPerTeam.map(team => {

        const jumlahPersentaseOrangKuis = persentaseOrangKuisPerKuis.reduce((acc, dokItem) => {
            if (dokItem.idTeam === team.idTeam) {
                acc += dokItem.persentaseOrangKuis;
            }
            return acc;
        }, 0);

        const jumlahDokumenByTeam = persentaseOrangKuisPerKuis.filter(item => item.idTeam === team.idTeam).length;
        const persentaseOrangKuis = jumlahDokumenByTeam ? (jumlahPersentaseOrangKuis / jumlahDokumenByTeam) : 0;

        return {
            ...team,
            persentaseOrangKuis
        }
    })

    // console.log(persentaseOrangKuisPerTeam)
    return persentaseOrangKuisPerTeam
}

