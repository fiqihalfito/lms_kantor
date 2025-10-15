import { db } from "database/connect";
import { mUser } from "database/schema/schema";
import { eq } from "drizzle-orm";
import * as z from "zod"

export async function getUserByEmail(email: string) {
    const res = await db.select({ email: mUser.email }).from(mUser).where(eq(mUser.email, email))
    return res
}

export async function saveNewUser({ nama, email, idSubBidang, password }: typeof mUser.$inferInsert) {
    await db.insert(mUser).values({
        idSubBidang: idSubBidang,
        nama: nama,
        email: email,
        password: password,
    })
}

export const mInsertNewUserValidation = z.object({
    namaUser: z
        .string({
            error: (iss) => iss.input === undefined ? "nama is required." : "Invalid input."
        })
        .min(1, "Nama User tidak boleh kosong"),
    email: z
        .email()
});