import { db } from "database/connect";
import { mTeam } from "database/schema/schema";
import { eq } from "drizzle-orm";

export async function deleteTeam(idTeam: string) {

    // delete dokumen data in db
    const res = await db.delete(mTeam).where(eq(mTeam.idTeam, idTeam)).returning({ namaTeam: mTeam.nama })
    return res
}