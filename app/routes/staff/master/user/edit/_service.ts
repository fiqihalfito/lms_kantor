import { db } from "database/connect";
import { mUser } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

export async function getUserByEmail(email: string) {
    const res = await db.select({ email: mUser.email }).from(mUser).where(eq(mUser.email, email))
    return res
}

export async function getUserById(idUser: string) {
    const res = await db.select({ namaUser: mUser.nama, email: mUser.email }).from(mUser).where(eq(mUser.idUser, idUser))
    return res
}

export async function updateUser(idUser: string, { namaUser, email }: { namaUser: string, email: string }) {
    await db.update(mUser).set({ nama: namaUser, email: email }).where(eq(mUser.idUser, idUser))
}

export const mUpdateUserValidation = z.object({
    namaUser: z
        .string({
            error: (iss) => iss.input === undefined ? "nama is required." : "Invalid input."
        })
        .min(1, "Nama user tidak boleh kosong"),
    email: z
        .email()
});