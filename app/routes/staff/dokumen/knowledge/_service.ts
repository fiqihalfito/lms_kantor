import { db } from "database/connect"
import { mTeam, tStatusBaca } from "database/schema/schema"
import { and, eq } from "drizzle-orm"

export async function getTeamSkilldanSubskill(idSubBidang: string, idUser: string, filter: {
    idTeam: string | null
}) {
    const res = await db.query.mTeam.findMany({
        where: and(
            filter.idTeam ? eq(mTeam.idTeam, filter.idTeam) : undefined,
            eq(mTeam.idSubBidang, idSubBidang)
        ),
        with: {
            skill: {
                with: {
                    subSkill: {
                        with: {
                            dokumen: {
                                with: {
                                    kuis: {
                                        with: {
                                            kuisProgress: true,
                                            kuisElement: true
                                        }
                                    },
                                    statusBaca: {
                                        where: eq(tStatusBaca.idUser, idUser)
                                    }
                                }
                            },
                            pic: {
                                columns: {
                                    idUser: true,
                                    nama: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return res
}