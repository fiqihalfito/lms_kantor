import { db } from "database/connect";
import { dokumen } from "database/schema";

export async function getAllDokumen() {
    const res = await db.select().from(dokumen)
    return res
}