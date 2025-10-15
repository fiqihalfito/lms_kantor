import { db } from "database/connect";
import { mTeam } from "database/schema/schema";
import * as z from "zod"


export async function saveNewTeam({ nama, idSubBidang }: typeof mTeam.$inferInsert) {
    await db.insert(mTeam).values({
        idSubBidang: idSubBidang,
        nama: nama,
    })
}

export const mInsertNewTeamValidation = z.object({
    namaTeam: z
        .string()
        .min(1, "Nama Team tidak boleh kosong"),
});