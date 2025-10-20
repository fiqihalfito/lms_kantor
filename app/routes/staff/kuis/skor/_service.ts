import { db } from "database/connect";

export async function getKuisSudahDikerjakan(idUser: string) {
    const res = await db.query.tKuis.findMany({
        with: {
            dokumen: {
                with: {
                    layanan: true,
                    user: {

                    }
                }
            },
            kuisElement: true,
            // kuisProgress: {
            //     where: eq(tKuisProgress.idUser, idUser)
            // }
            kuisProgress: true
        }
    })

    const list = res.filter(item => item.kuisProgress !== null && item.kuisProgress.isSelesai === true)

    return list
}