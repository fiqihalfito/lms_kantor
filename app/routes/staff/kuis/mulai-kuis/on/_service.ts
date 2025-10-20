import { db } from "database/connect";
import { tKuisElement, tKuisProgress } from "database/schema/schema";
import { eq, inArray } from "drizzle-orm";

export async function getSoalData(idKuisElement: string) {
    const res = await db.select().from(tKuisElement).where(eq(tKuisElement.idKuisElement, idKuisElement))
    return res
}

export async function getAllSoalData(idKuis: string) {
    const res = await db.select().from(tKuisElement).where(eq(tKuisElement.idKuis, idKuis))
    return res
}

export async function getDokumenDataByIdKuis(idKuis: string) {
    const res = await db.query.tKuis.findFirst({
        columns: {
            idKuis: true
        },
        with: {
            dokumen: {
                columns: {
                    judul: true
                }
            }
        }
    })

    return res
}

export async function hitungBenarJawaban(jawabanSet: Record<string, "a" | "b" | "c" | "d">) {
    const idKuisElementsterjawab = Object.keys(jawabanSet)
    // console.log(idKuisElementsterjawab);

    const soals = await db.query.tKuisElement.findMany({
        where: inArray(tKuisElement.idKuisElement, idKuisElementsterjawab),
        columns: {
            idKuisElement: true,
            jawaban: true
        }
    })

    let skor = 0;
    for (const soal of soals) {
        const jawabanUser = jawabanSet[soal.idKuisElement];
        if (jawabanUser === soal.jawaban) {
            skor++;
        }
    }

    return skor
}

export async function updateKuisProgress(idKuisProgress: string, {
    jawabanSet,
    jumlahBenar,
    isSelesai
}: typeof tKuisProgress.$inferInsert) {
    await db.update(tKuisProgress).set({
        jawabanSet: jawabanSet,
        jumlahBenar: jumlahBenar,
        isSelesai: isSelesai
    }).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
}