import { db } from "database/connect";
import { mLayanan, mUser, tDokumen, tKuis, tKuisElement, tKuisProgress, tStatusBaca } from "database/schema/schema";
import { and, eq, gt, isNull, or } from "drizzle-orm";


export async function getKuisBelumDikerjakan(idUser: string, idSubBidang: string) {


    const kuisList = await db
        .select({
            idKuis: tKuis.idKuis,
            judulDokumen: tDokumen.judul,
            tipeDokumen: tDokumen.tipe,
            namaLayanan: mLayanan.nama,
            uploadedBy: mUser.nama,
            tanggalKuisTerbuat: tKuis.createdAt,
            jumlahSoal: db.$count(
                tKuisElement,
                eq(tKuisElement.idKuis, tKuis.idKuis)
            ),
        })
        .from(tKuis)
        .leftJoin(
            tKuisProgress,
            and(
                eq(tKuis.idKuis, tKuisProgress.idKuis),
                eq(tKuisProgress.idUser, idUser)
            )
        )
        .innerJoin(tDokumen, eq(tKuis.idDokumen, tDokumen.idDokumen))
        .leftJoin(mLayanan, eq(tDokumen.idLayanan, mLayanan.idLayanan))
        .innerJoin(mUser, eq(mUser.idUser, tDokumen.idUser))
        .leftJoin(tStatusBaca,
            and(
                eq(tStatusBaca.idDokumen, tDokumen.idDokumen),
                eq(tStatusBaca.idUser, mUser.idUser)
            )
        )
        .leftJoin(tKuisElement, eq(tKuisElement.idKuis, tKuis.idKuis))
        .where(
            and(
                // <-- Tambahan: Filter berdasarkan idSubBidang
                eq(tKuis.idSubBidang, idSubBidang),

                // <-- Perbaikan: Kelompokkan kondisi kuis
                or(
                    isNull(tKuisProgress.idKuisProgress), // Belum dikerjakan
                    eq(tKuisProgress.isSelesai, false)    // Sudah dikerjakan tapi belum selesai
                ),

                // <-- Perbaikan: Jadikan kondisi wajib
                eq(tStatusBaca.isRead, true), // Dokumen wajib sudah dibaca

                // jumlah soal harus lebih dari 0
                gt(db.$count(
                    tKuisElement,
                    eq(tKuisElement.idKuis, tKuis.idKuis)
                ), 0)
            )
        );

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