import { db } from "database/connect";
import { mUser, tDokumen, tStatusBaca } from "database/schema/schema";
import { and, eq, notInArray } from "drizzle-orm";

export async function getJudulDokumen(idDokumen: string) {
    const res = await db.select({ judulDokumen: tDokumen.judul }).from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))
    return res[0].judulDokumen
}

export async function getAllReadersByIdDokumen(idDokumen: string) {
    const res = await db.query.tStatusBaca.findMany({
        with: {
            userBaca: {
                columns: {
                    idUser: true,
                    nama: true
                },
                with: {
                    memberTeams: {
                        with: {
                            team: {
                                columns: {
                                    nama: true
                                }
                            }
                        }
                    }
                }
            }
        },
        where: and(
            eq(tStatusBaca.idDokumen, idDokumen),
            eq(tStatusBaca.isRead, true)
        ),
        orderBy: (t, { desc }) => [desc(t.createdAt)]
    })

    return res
}

export async function getAllUnreadersByIdDokumen(idSubBidang: string, idReaders: string[]) {
    const res = await db.query.mUser.findMany({
        columns: {
            idUser: true,
            nama: true
        },
        with: {
            memberTeams: {
                with: {
                    team: {
                        columns: {
                            nama: true
                        }
                    }
                }
            }
        },
        where: and(
            eq(mUser.idSubBidang, idSubBidang),
            notInArray(mUser.idUser, idReaders)
        )
    })

    return res
}