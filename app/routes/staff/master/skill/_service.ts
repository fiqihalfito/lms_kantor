import { db } from "database/connect";
import { mSkill, mSubSkill, mTeam, mUser, tDokumen, tKuis } from "database/schema/schema";
import { eq, inArray, sql, SQL } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";


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
                        },
                        orderBy: [mSubSkill.urutan]
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

export async function getListTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}

export async function updateSubSkill(idSubSkill: string, subSkillData: typeof mSubSkill.$inferInsert) {

    const subskillUpdateSchema = createUpdateSchema(mSubSkill)
    const parsed = subskillUpdateSchema.parse(subSkillData)

    await db.update(mSubSkill)
        .set(parsed)
        .where(eq(mSubSkill.idSubSkill, idSubSkill))
}

export async function insertSubSkill(subSkillData: typeof mSubSkill.$inferInsert) {

    const subskillInsertSchema = createInsertSchema(mSubSkill)
    const parsed = subskillInsertSchema.parse(subSkillData)

    await db.insert(mSubSkill)
        .values(parsed)
}

export async function deleteSubSkill(idSubSkill: string) {
    const res = await db.delete(mSubSkill).where(eq(mSubSkill.idSubSkill, idSubSkill)).returning()
    return res
}

export async function insertSkill(skillData: typeof mSkill.$inferInsert) {
    const skillInsertSchema = createInsertSchema(mSkill)
    const parsed = skillInsertSchema.parse(skillData)

    await db.insert(mSkill)
        .values(parsed)
}

export async function deleteSkill(idSkill: string) {
    const res = await db.delete(mSkill).where(eq(mSkill.idSkill, idSkill)).returning()
    return res
}

export async function updateSkill(idSkill: string, skillData: Partial<typeof mSkill.$inferInsert>) {

    const skillUpdateSchema = createUpdateSchema(mSkill)
    const parsed = skillUpdateSchema.parse(skillData)

    await db.update(mSkill)
        .set(parsed)
        .where(eq(mSkill.idSkill, idSkill))
}

export async function getFilenameDokumenBySubSkillId(idSubSkill: string) {
    const res = await db.select({
        filename: tDokumen.filename
    })
        .from(tDokumen)
        .where(eq(tDokumen.idSubSkill, idSubSkill))
    return res[0]?.filename;
}

export async function getSubSkillByidSkill(idSkill: string) {
    // const raw = await db
    //     .select()
    //     .from(mSubSkill)
    //     .where(eq(mSubSkill.idSkill, idSkill))
    //     .orderBy(mSubSkill.level, mSubSkill.urutan);

    const raw = await db.query.mSubSkill.findMany({
        where: eq(mSubSkill.idSkill, idSkill),
        orderBy: [mSubSkill.level, mSubSkill.urutan],
        with: {
            pic: {
                columns: {
                    nama: true
                }
            }
        }
    })

    const map = new Map<number, typeof raw>();

    for (const row of raw) {
        if (!map.has(row.level)) map.set(row.level, []);
        map.get(row.level)!.push(row);
    }

    return Array.from(map.entries());
}

export async function getManyDokumenBySubSkillIds(idSubSkills: string[]) {
    const res = await db.select().from(tDokumen).where(inArray(tDokumen.idSubSkill, idSubSkills))
    return res
}

export async function getDokumenBySubSkillId(idSubSkill: string) {
    const res = await db.select().from(tDokumen).where(eq(tDokumen.idSubSkill, idSubSkill))
    return res
}

export async function deleteKuis(idKuis: string) {
    await db.delete(tKuis).where(eq(tKuis.idKuis, idKuis))
}

export async function deleteManyKuis(idKuis: string[]) {
    await db.delete(tKuis).where(inArray(tKuis.idKuis, idKuis))
}


export async function updateUrutanSubSkill(newOrder: { idSubSkill: string, urutan: number }[]) {

    if (newOrder.length === 0) {
        return;
    }

    const sqlChunks: SQL[] = [];
    const idSubSkills: string[] = [];

    sqlChunks.push(sql`(case`);

    for (const subskill of newOrder) {
        sqlChunks.push(sql`when ${mSubSkill.idSubSkill} = ${subskill.idSubSkill}`);
        sqlChunks.push(sql<number>`then ${subskill.urutan}::integer`);
        idSubSkills.push(subskill.idSubSkill);
    }

    sqlChunks.push(sql`end)`);

    const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));


    await db.update(mSubSkill)
        .set({
            urutan: finalSql
        })
        .where(inArray(mSubSkill.idSubSkill, idSubSkills))
}

export async function getSkillByIdTeam(idTeam: string) {
    const res = await db.select().from(mSkill).where(eq(mSkill.idTeam, idTeam)).orderBy(mSkill.namaSkill)
    return res
}

export async function getUserTeam(idTeam: string) {
    const res = await db.select({
        namaUser: mUser.nama,
        idUser: mUser.idUser,
        idTeam: mUser.idTeam,
    }).from(mUser).where(eq(mUser.idTeam, idTeam))
    return res
}