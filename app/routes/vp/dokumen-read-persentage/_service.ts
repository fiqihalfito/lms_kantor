import { db } from "database/connect";
import { mTeam, mUser, tDokumen, tStatusBaca } from "database/schema/schema";
import { and, eq, ilike } from "drizzle-orm";
import type { TIPE_DOKUMEN } from "~/lib/constants";

export async function getDokumenAndStatusRead(
    idSubbidang: string,
    filter: {
        tipe: TIPE_DOKUMEN,
        idTeam?: string | null,
        search?: string | null
    }
) {
    const res = await db.query.tDokumen.findMany({
        with: {
            statusBaca: {
                with: {
                    userBaca: {
                        columns: {
                            nama: true
                        }
                    }
                },
                where: eq(tStatusBaca.isRead, true)
            },
            team: {
                columns: {
                    nama: true
                }
            }
            // dokumenTeam: {
            //     with: {
            //         // team: {
            //         //     where: filter.idTeam ? eq(mTeam.idTeam, filter.idTeam) : undefined
            //         // }
            //         team: true
            //     },
            //     where: filter.idTeam ? eq(tDokumenTeam.idTeam, filter.idTeam) : undefined,

            // }
        },
        where: and(
            filter.tipe ? eq(tDokumen.tipe, filter.tipe) : undefined,
            eq(tDokumen.idSubBidang, idSubbidang),
            filter.search ? ilike(tDokumen.judul, `%${filter.search}%`) : undefined,
            filter.idTeam ? eq(tDokumen.idTeam, filter.idTeam) : undefined
        )
    })

    const sorted = res.sort((a, b) => b.statusBaca.length - a.statusBaca.length)
    return sorted
}

export async function getAllTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}

export async function getJumlahOrang(idSubBidang: string) {
    const res = await db.$count(mUser, eq(mUser.idSubBidang, idSubBidang))
    return res
}