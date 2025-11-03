import { db } from "database/connect";
import { mTeam, mUser, tDokumen, tStatusBaca } from "database/schema/schema";
import { and, eq } from "drizzle-orm";
import type { TIPE_DOKUMEN } from "~/lib/constants";

export async function getDokumenAndStatusRead(
    idSubbidang: string,
    filter: {
        tipe: TIPE_DOKUMEN,
        idTeam: string | null
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
                }
            },
            dokumenTeam: {
                with: {
                    team: {
                        where: filter.idTeam ? eq(mTeam.idTeam, filter.idTeam) : undefined
                    }
                }
            }
        },
        where: and(
            filter.tipe ? eq(tDokumen.tipe, filter.tipe) : undefined,
            eq(tDokumen.idSubBidang, idSubbidang)
        )
    })
    // const res = await db.select().from(tDokumen)
    //     .leftJoin(tStatusBaca, eq(tDokumen.idDokumen, tStatusBaca.idDokumen))
    //     .leftJoin(tStatusBaca)
    return res
}

export async function getAllTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}