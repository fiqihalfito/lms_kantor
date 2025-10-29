import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { eq } from "drizzle-orm";

// export async function getSubbidangName(idSubbidang: string) {
//        const res = await db.select({nama: })
// }


export async function getTeamAndMember(idSubBidang: string) {
    const res = await db.query.mTeam.findMany({
        with: {
            members: {
                with: {
                    user: {
                        columns: {
                            nama: true,
                            idUser: true
                        },
                    }
                }
            }
        }
    })

    return res
}

export async function getJumlahDokumen(idSubBidang: string) {
    const res = await db.$count(tDokumen, eq(tDokumen.idSubBidang, idSubBidang))
    return res
}