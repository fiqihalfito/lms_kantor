import { db } from "database/connect"
import { mSkill, mSubSkill, mTeam, tKuisProgress, tStatusBaca } from "database/schema/schema"
import { and, eq } from "drizzle-orm"

export async function getSkilldanSubskill(idSkill: string, idUser: string) {
    const res = await db.query.mSkill.findMany({
        where: and(
            eq(mSkill.idSkill, idSkill)
        ),
        with: {
            subSkill: {
                with: {
                    dokumen: {
                        with: {
                            kuis: {
                                with: {
                                    kuisProgress: {
                                        where: eq(tKuisProgress.idUser, idUser)
                                    },
                                    kuisElement: true,
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
                },
                orderBy: [mSubSkill.level, mSubSkill.urutan]
            }
        }
    })

    return res
}