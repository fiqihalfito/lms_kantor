import { db } from "database/connect";
import { mSkill, mTeam } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod"

export async function saveNewSkill(idSubBidang: string, nama: string, idTeam?: string | null) {
    await db.insert(mSkill).values({ idSubBidang: idSubBidang, namaSkill: nama, idTeam: idTeam })
}

export async function getListTeam(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}

export const mInsertNewSkillValidation = z.object({
    namaSkill: z
        .string({
            error: (iss) => iss.input === undefined ? "Skill is required." : "Invalid input."
        })
        .min(1, "Nama Skill tidak boleh kosong"),
    idTeam: z.string()
});