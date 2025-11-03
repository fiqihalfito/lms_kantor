import { db } from "database/connect";
import { tDokumen, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getAllDokumenByTipe(idSubBidang: string, tipe: string, idUser: string) {
    const res = await db.query.tDokumen.findMany({
        with: {
            subBidang: true,
            user: true,
            layanan: true,
            statusBaca: {
                where: eq(tStatusBaca.idUser, idUser)
            },
            kuis: {
                with: {
                    kuisProgress: {
                        where: eq(tKuisProgress.idUser, idUser)
                    },
                    kuisElement: {
                        columns: {
                            idKuis: true
                        }
                    }
                }
            }
        },
        where: and(
            eq(tDokumen.idSubBidang, idSubBidang),
            eq(tDokumen.tipe, tipe),
        ),
        orderBy: [desc(tDokumen.createdAt)]
    });
    return res
}

