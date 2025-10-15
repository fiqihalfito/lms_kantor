import { db } from "database/connect";
import { mTeam } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getAllTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang)).orderBy(mTeam.nama)
    return res
}