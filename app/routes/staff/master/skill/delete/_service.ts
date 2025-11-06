import { db } from "database/connect";
import { mSkill } from "database/schema/schema";
import { eq } from "drizzle-orm";

export async function deleteSkill(idSkill: string) {

    // delete dokumen data in db
    const res = await db.delete(mSkill).where(eq(mSkill.idSkill, idSkill)).returning({ namaSkill: mSkill.namaSkill })
    return res
}