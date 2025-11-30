import { db } from "database/connect";
import { mSkill, mSubSkill, tKuis, tKuisElement } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getSkillAndSubSkillByPIC(idSubBidang: string, idUser: string) {
    const raw = await db.query.mSkill.findMany({
        with: {
            subSkill: {
                where: eq(mSubSkill.idUser, idUser),
                orderBy: [mSubSkill.level, mSubSkill.urutan],
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

    const res = raw.map((skill) => {
        const groupedSubSkills = skill.subSkill
            .sort((a, b) => a.level - b.level)
            .reduce((acc, subSkill) => {
                (acc[subSkill.level] = acc[subSkill.level] || []).push(subSkill);
                return acc;
            }, {} as Record<string, typeof skill.subSkill>);
        const entriesSubSkills = Object.entries(groupedSubSkills)

        return {
            ...skill,
            levelSubskill: entriesSubSkills,
            jumlahSubskill: skill.subSkill.length,
        };
    });

    return res
}