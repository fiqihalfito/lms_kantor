import { db } from "database/connect";
import { mSubBidang, mTeam, mUser, tDokumen, tKuis, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, eq, notInArray, sql } from "drizzle-orm";
import type { TIPE_DOKUMEN } from "~/lib/constants";

// export async function getSubbidangName(idSubbidang: string) {
//        const res = await db.select({nama: })
// }


export async function getTeamAndMember(idSubBidang: string) {
    const res = await db.query.mTeam.findMany({
        with: {
            user: {
                columns: {
                    nama: true,
                    idUser: true
                },
                // with: {
                //     kuisProgress: {
                //         with: {
                //             kuis: {
                //                 with: {
                //                     dokumen: {
                //                         columns: {
                //                             idDokumen: true,
                //                             judul: true
                //                         }
                //                     }
                //                 }
                //             }
                //         }

                //     }
                // }

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
    // const res = await db.query.tDokumen.findMany({
    //     columns: {
    //         idDokumen: true
    //     },
    //     where: and(
    //         eq(tDokumen.idSubBidang, idSubbidang),
    //         eq(tDokumen.tipe, tipe)
    //     ),
    //     with: {
    //         statusBaca: {
    //             columns: {
    //                 idStatusBaca: true
    //             },
    //             where: eq(tStatusBaca.isRead, true)
    //         }
    //     }
    // })
    // return res

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

// export async function getAllTipeSummary(idSubbidang: string) {
//     const res = await db
//         .select({
//             tipe: tDokumen.tipe,
//             totalDokumen: sql<number>`COUNT(DISTINCT ${tDokumen.idDokumen})`.as('total_dokumen'),
//             jumlahSudahDibaca: sql<number>`
//                 COUNT(DISTINCT CASE
//                     WHEN ${tStatusBaca.isRead} = true
//                     THEN ${tStatusBaca.idStatusBaca}
//                 END)
//             `.as('jumlah_sudah_dibaca'),
//         })
//         .from(tDokumen)
//         .leftJoin(tStatusBaca, eq(tStatusBaca.idDokumen, tDokumen.idDokumen))
//         .where(eq(tDokumen.idSubBidang, idSubbidang))
//         .groupBy(tDokumen.tipe);

//     // Transform ke object untuk mudah diakses
//     const summary = {
//         SOP: { totalDokumen: 0, jumlahSudahDibaca: 0 },
//         IK: { totalDokumen: 0, jumlahSudahDibaca: 0 },
//         Knowledge: { totalDokumen: 0, jumlahSudahDibaca: 0 },
//     };

//     res.forEach(item => {
//         if (item.tipe && item.tipe in summary) {
//             summary[item.tipe as TIPE_DOKUMEN] = {
//                 totalDokumen: item.totalDokumen,
//                 jumlahSudahDibaca: item.jumlahSudahDibaca,
//             };
//         }
//     });

//     return summary;
// }
