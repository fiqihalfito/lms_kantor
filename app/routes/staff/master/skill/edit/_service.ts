import { db } from "database/connect";
import { mSkill } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";


export async function getSkillById(idSkill: string) {
    const res = await db.select().from(mSkill).where(eq(mSkill.idSkill, idSkill))
    return res
}

export async function updateSkill(idSkill: string, namaSkill: string, idTeam: string) {
    await db.update(mSkill).set({ namaSkill: namaSkill, idTeam: idTeam }).where(eq(mSkill.idSkill, idSkill))
}

export const mUpdateSkillValidation = z.object({
    namaSkill: z
        .string({
            error: (iss) => iss.input === undefined ? "Skill is required." : "Invalid input."
        })
        .min(1, "Nama Skill tidak boleh kosong"),
    idTeam: z.string()
});