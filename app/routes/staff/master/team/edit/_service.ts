import { db } from "database/connect";
import { mTeam } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

export async function getTeamById(idTeam: string) {
    const res = await db.select({ namaTeam: mTeam.nama }).from(mTeam).where(eq(mTeam.idTeam, idTeam))
    return res
}

export async function updateTeam(idTeam: string, namaTeam: string) {
    await db.update(mTeam).set({ nama: namaTeam }).where(eq(mTeam.idTeam, idTeam))
}

export const mUpdateUserValidation = z.object({
    namaTeam: z
        .string()
        .min(1, "Nama team tidak boleh kosong"),
});