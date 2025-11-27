import { db } from "database/connect";
import { mSkill, mSubBidang, mTeam, mUser, tDokumen, tKuis, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, eq, notInArray, sql } from "drizzle-orm";
import type { TIPE_DOKUMEN } from "~/lib/constants";

// export async function getSubbidangName(idSubbidang: string) {
//        const res = await db.select({nama: })
// }

export async function getAllSkill(idSubBidang: string) {
    const res = await db.query.mSkill.findMany({
        where: eq(mSkill.idSubBidang, idSubBidang)
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
                            subSkill: true
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

