import { db } from "database/connect"
import { mSubBidang } from "database/schema/schema"
import { eq } from "drizzle-orm"

export async function getNamaSubbidang(idSubBidang: string) {
    const res = await db.select({ namaSubbidang: mSubBidang.nama }).from(mSubBidang).where(eq(mSubBidang.idSubBidang, idSubBidang))
    return res[0].namaSubbidang
}