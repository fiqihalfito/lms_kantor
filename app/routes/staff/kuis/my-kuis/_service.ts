import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { eq } from "drizzle-orm";


export async function getDokumenUploadBySelf(idUser: string) {
    const res = await db.query.tDokumen.findMany({
        with: {
            layanan: true,
            user: true,
            kuis: {
                with: {
                    kuisElement: true
                }
            }
        },
        where: eq(tDokumen.idUser, idUser)
    })
    return res
}