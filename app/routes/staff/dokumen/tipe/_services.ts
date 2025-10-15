import { db } from "database/connect";
import { tDokumen } from "database/schema/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getAllDokumenByTipe(idSubBidang: string, tipe: string) {
    const res = await db.query.tDokumen.findMany({
        with: {
            subBidang: true,
            user: true,
            layanan: true
        },
        where: and(eq(tDokumen.idSubBidang, idSubBidang), eq(tDokumen.tipe, tipe)),
        orderBy: [desc(tDokumen.createdAt)]
    });
    return res
}

