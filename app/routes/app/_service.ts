import { db } from "database/connect"
import { mSubBidang, mUser } from "database/schema/schema"
import { eq, getTableColumns } from "drizzle-orm"

export async function getUserByIdUser(idUser: string) {
    const { password, ...rest } = getTableColumns(mUser)
    const res = await db.select({ ...rest }).from(mUser).where(eq(mUser.idUser, idUser))
    return res[0]
}

export async function getNamaSubbidang(idSubBidang: string) {
    const res = await db.select({ namaSubbidang: mSubBidang.nama }).from(mSubBidang).where(eq(mSubBidang.idSubBidang, idSubBidang))
    return res[0].namaSubbidang
}