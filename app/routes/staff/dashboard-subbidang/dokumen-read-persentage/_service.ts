import { db } from "database/connect";
import { mTeam } from "database/schema/schema";
import { eq } from "drizzle-orm";
import type { TIPE_DOKUMEN } from "~/lib/constants";

export async function getDokumenAndStatusRead(idSubbidang: string, tipe: TIPE_DOKUMEN | null) {
    const res = await db.query.tDokumen.findMany({
        with: {
            statusBaca: {
                with: {
                    userBaca: {
                        columns: {
                            nama: true
                        }
                    }
                }
            }
        }
    })
    return res
}

export async function getAllTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}