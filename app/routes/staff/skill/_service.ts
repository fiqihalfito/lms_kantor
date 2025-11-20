import { db } from "database/connect";
import { mSkill, mSubSkill, tKuis, tKuisElement } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getSkillAndSubSkillByPIC(idSubBidang: string, idUser: string) {
    const res = await db.query.mSkill.findMany({
        with: {
            subSkill: {
                where: eq(mSubSkill.idUser, idUser),
                with: {
                    pic: {
                        columns: {
                            nama: true,
                            idTeam: true
                        }
                    },
                    dokumen: {
                        with: {
                            kuis: {
                                with: {
                                    kuisElement: {
                                        columns: {
                                            idKuisElement: true
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        },
        where: eq(mSkill.idSubBidang, idSubBidang)
    })

    return res
}