import { db } from "database/connect";
import { tDokumen, tStatusBaca } from "database/schema/schema";
import { eq, sql } from "drizzle-orm";

export async function getDokumenById(idDokumen: string) {
    const res = await db.select().from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))
    return res
}

export async function setDokumenisRead(idUser: string, idDokumen: string) {
    await db.insert(tStatusBaca).values({
        idUser: idUser,
        idDokumen: idDokumen,
        isRead: true,
        countRead: 1
    })
        .onConflictDoUpdate({
            target: [tStatusBaca.idUser, tStatusBaca.idDokumen],
            set: {
                countRead: sql`${tStatusBaca.countRead} + 1`,
            }
        })
}