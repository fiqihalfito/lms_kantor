import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { and, eq } from "drizzle-orm";


export async function getDokumenUploadBySelf(idUser: string) {
    const res = await db.query.tDokumen.findMany({
        with: {
            layanan: true,
            user: true,
            skill: true,
            kuis: {
                with: {
                    kuisElement: true
                }
            }
        },
        where: and(
            eq(tDokumen.idUser, idUser),
            eq(tDokumen.tipe, "Knowledge"),
        )
    })
    return res
}