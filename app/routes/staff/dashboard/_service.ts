import { db } from "database/connect";
import { mTeam, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, eq } from "drizzle-orm";


export async function getNamaTeam(idTeam: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idTeam, idTeam)).limit(1)
    return res[0]?.nama
}

export async function getDokumenSudahDibaca(idUser: string) {
    const res = await db.query.tStatusBaca.findMany({
        where: and(
            eq(tStatusBaca.idUser, idUser),
            eq(tStatusBaca.isRead, true)
        ),
        with: {
            dokumen: true
        }
    })
    return res
}

export async function getKuisSelesai(idUser: string) {
    const res = await db.query.tKuisProgress.findMany({
        where: and(
            eq(tKuisProgress.idUser, idUser),
            eq(tKuisProgress.isSelesai, true)
        ),
        with: {
            subSkill: true
        }
    })
    return res
}