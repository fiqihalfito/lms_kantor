import { db } from "database/connect";
import { mLayanan } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getAllLayanan(idSubBidang: string) {
    const res = await db.select().from(mLayanan).where(eq(mLayanan.idSubBidang, idSubBidang)).orderBy(mLayanan.nama)
    return res
}