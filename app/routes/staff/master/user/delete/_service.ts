import { db } from "database/connect";
import { mUser } from "database/schema/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(idUser: string) {

    // delete dokumen data in db
    const res = await db.delete(mUser).where(eq(mUser.idUser, idUser)).returning({ namaUser: mUser.nama })
    return res
}