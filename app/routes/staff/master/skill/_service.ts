import { db } from "database/connect";
import { mSkill } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getAllSkill(idSubBidang: string, filterTeam?: string | null) {
    // const res = await db.select().from(mSkill).where(eq(mSkill.idSubBidang, idSubBidang)).orderBy(mSkill.namaSkill)
    const res = await db.query.mSkill.findMany({
        with: {
            team: {
                columns: {
                    nama: true
                }
            }
        },
        where: filterTeam ? eq(mSkill.idTeam, filterTeam) : undefined
    })
    return res
}