import { db } from "database/connect";
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