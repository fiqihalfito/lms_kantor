import { db } from "database/connect";
import { mLayanan, mUser, tDokumen, tKuis, tKuisProgress } from "database/schema/schema";
import { and, eq, isNull } from "drizzle-orm";


export async function getKuisList(idUser: string, status?: "belum" | "sudah") {


    const kuisList = await db.query.tKuis.findMany({
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

    const list = kuisList.filter(item => item.kuisProgress === null || item.kuisProgress?.isSelesai === false)

    return list
}

export async function getDokumenBelumDikerjakan(idUser: string) {
    return await db
        .select(
        //     {
        //     idDokumen: tDokumen.idDokumen,
        //     judul: tDokumen.judul,
        //     filename: tDokumen.filename,
        //     tipe: tDokumen.tipe,
        //     idKuis: tKuis.idKuis,
        //     namaLayanan: mLayanan.nama,
        // }
    )
        .from(tDokumen)
        .innerJoin(tKuis, eq(tKuis.idDokumen, tDokumen.idDokumen))
        .innerJoin(mLayanan, eq(mLayanan.idLayanan, tDokumen.idLayanan))
        .innerJoin(mUser, eq(mUser.idUser, tDokumen.idUser))
        .leftJoin(
            tKuisProgress,
            and(eq(tKuisProgress.idKuis, tKuis.idKuis), eq(tKuisProgress.idUser, idUser))
        )
        .where(isNull(tKuisProgress.idKuisProgress))
}

export async function getDokumenSudahDikerjakan(idUser: string) {
    return await db
        .select(
        //     {
        //     idDokumen: tDokumen.idDokumen,
        //     judul: tDokumen.judul,
        //     filename: tDokumen.filename,
        //     tipe: tDokumen.tipe,
        //     idKuis: tKuis.idKuis,
        //     namaLayanan: mLayanan.nama,
        // }
    )
        .from(tDokumen)
        .innerJoin(tKuis, eq(tKuis.idDokumen, tDokumen.idDokumen))
        .innerJoin(mLayanan, eq(mLayanan.idLayanan, tDokumen.idLayanan))
        .innerJoin(mUser, eq(mUser.idUser, tDokumen.idUser))
        .innerJoin(
            tKuisProgress,
            and(eq(tKuisProgress.idKuis, tKuis.idKuis), eq(tKuisProgress.idUser, idUser))
        )
}