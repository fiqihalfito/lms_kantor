import { db } from "database/connect";
import { tKuisProgress } from "database/schema/schema";
import { and, eq } from "drizzle-orm";

export async function getKuisSudahDikerjakan(idUser: string) {
    const res = await db.query.tKuisProgress.findMany({
        with: {
            kuis: {
                with: {
                    dokumen: true,
                    kuisElement: {
                        columns: {
                            idKuisElement: true
                        }
                    }
                }
            },
            user: {
                columns: {
                    nama: true
                }
            }
        },
        where: and(eq(tKuisProgress.idUser, idUser), eq(tKuisProgress.isSelesai, true))
    })


    return res
}