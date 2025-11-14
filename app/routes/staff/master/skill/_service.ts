import { db } from "database/connect";
import { mSkill, mSubSkill, mTeam, mUser } from "database/schema/schema";
import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";


export async function getTeamAndSkill(idSubBidang: string, filterTeam?: string | null) {
    // const res = await db.select().from(mSkill).where(eq(mSkill.idSubBidang, idSubBidang)).orderBy(mSkill.namaSkill)
    // const res = await db.query.mSkill.findMany({
    //     with: {
    //         team: {
    //             columns: {
    //                 nama: true
    //             }
    //         },
    //         subSkill: {
    //             columns: {
    //                 idSubSkill: true,
    //                 namaSubSkill: true
    //             }
    //         }
    //     },
    //     where: filterTeam ? eq(mSkill.idTeam, filterTeam) : undefined
    // })
    const res = await db.query.mTeam.findMany({
        with: {
            skill: {
                with: {
                    subSkill: {
                        with: {
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
        },
        where: filterTeam ? eq(mTeam.idTeam, filterTeam) : undefined
    })
    return res
}

export async function getAllUsers(idSubBidang: string) {
    const res = await db.select({
        namaUser: mUser.nama,
        idUser: mUser.idUser,
        idTeam: mUser.idTeam
    })
        .from(mUser)
        .where(eq(mUser.idSubBidang, idSubBidang))
        .orderBy(mUser.nama)
    return res
}

export async function updateSubSkill(idSubSkill: string, subSkillData: typeof mSubSkill.$inferInsert) {

    const subskillUpdateSchema = createUpdateSchema(mSubSkill)
    const parsed = subskillUpdateSchema.parse(subSkillData)

    await db.update(mSubSkill)
        .set(parsed)
        .where(eq(mSubSkill.idSubSkill, idSubSkill))
}