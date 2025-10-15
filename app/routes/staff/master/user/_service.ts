import { db } from "database/connect";
import { mUser } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getAllUser(idSubBidang: string) {
    const res = await db.select().from(mUser).where(eq(mUser.idSubBidang, idSubBidang)).orderBy(mUser.nama)
    return res
}