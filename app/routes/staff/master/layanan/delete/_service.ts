import { db } from "database/connect";
import { mLayanan } from "database/schema/schema";
import { eq } from "drizzle-orm";

export async function deleteLayanan(idLayanan: string) {

    // delete dokumen data in db
    const res = await db.delete(mLayanan).where(eq(mLayanan.idLayanan, idLayanan)).returning({ namaLayanan: mLayanan.nama })
    return res
}