import { db } from "database/connect";
import { mLayanan, mUser, tDokumen, tKuis, tKuisElement, tKuisProgress } from "database/schema/schema";
import { and, eq, isNull, ne, notExists } from "drizzle-orm";


export async function getKuisBelumDikerjakan(idUser: string, idSubBidang: string) {


    // const kuisList = await db.query.tKuis.findMany({
    //     with: {
    //         dokumen: {
    //             with: {
    //                 layanan: true,
    //                 user: true
    //             }
    //         },
    //         kuisElement: true,
    //         kuisProgress: {
    //             where: ne(tKuisProgress.idUser, idUser),
    //             // limit: 1
    //         }
    //         // kuisProgressOne: true
    //     },
    //     where: eq(tKuis.idSubBidang, idSubBidang)
    //     // where: and(eq(tKuis.idSubBidang, idSubBidang), ne(tKuisProgress.idUser, idUser))
    // })
    const kuisProgressSelf = db.select().from(tKuisProgress).where(and(eq(tKuisProgress.idUser, idUser), eq(tKuisProgress.isSelesai, true)))
    const kuisList = await db
        .select({
            idKuis: tKuis.idKuis,
            judulDokumen: tDokumen.judul,
            tipeDokumen: tDokumen.tipe,
            namaLayanan: mLayanan.nama,
            uploadedBy: mUser.nama,
            tanggalKuisTerbuat: tKuis.createdAt,
            jumlahSoal: db.$count(tKuisElement, eq(tKuisElement.idKuis, tKuis.idKuis))
        })
        .from(tKuis)
        .where(notExists(kuisProgressSelf))
        .innerJoin(tDokumen, eq(tKuis.idDokumen, tDokumen.idDokumen))
        .leftJoin(mLayanan, eq(tDokumen.idLayanan, mLayanan.idLayanan))
        .innerJoin(mUser, eq(mUser.idUser, tDokumen.idUser))


    // return kuisList

    // const list = kuisList.filter(item => item.kuisProgressOne === null || item.kuisProgressOne?.isSelesai === false)

    return kuisList
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