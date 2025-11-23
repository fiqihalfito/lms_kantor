import { db } from "database/connect";
import { and, eq } from "drizzle-orm";
import { mSkill, mTeam } from "database/schema/schema";

export async function getAllSkill(idSubBidang: string, filter: { idTeam: string | null }) {
    const res = await db.select().from(mSkill).where(
        and(
            eq(mSkill.idSubBidang, idSubBidang),
            filter.idTeam ? eq(mSkill.idTeam, filter.idTeam) : undefined
        ))
    return res
}

export async function getAllTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}