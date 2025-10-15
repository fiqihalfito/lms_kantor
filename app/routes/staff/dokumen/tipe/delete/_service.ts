import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { eq } from "drizzle-orm";
import { minioClient } from "~/lib/minio.server";

export async function deleteDokumen(idDokumen: string) {
    // delete dokumen in minio first
    const res = await db.select({
        idDokumen: tDokumen.idDokumen,
        filename: tDokumen.filename,
        judul: tDokumen.judul
    }).from(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))

    if (res[0].filename) {
        await minioClient.removeObject("dokumen", res[0].filename);
    }

    // delete dokumen data in db
    await db.delete(tDokumen).where(eq(tDokumen.idDokumen, idDokumen))

    return res[0].judul
}