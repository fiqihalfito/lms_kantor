import { db } from "database/connect";
import { mUser } from "database/schema/schema";
import { and, eq } from "drizzle-orm";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { hash, verify } from "@node-rs/argon2";
import "dotenv/config"



export let authenticator = new Authenticator<string | null>();

authenticator.use(
    new FormStrategy(async ({ form, request }) => {
        // Here you can use `form` to access and input values from the form.
        // and also use `request` to access more data
        let email = form.get("email") as string; // or email... etc
        let password = form.get("password") as string;




        // And finally, you can find, or create, the user
        let idUser = await verifyCredential(email, password);

        // And return the user as the Authenticator expects it
        return idUser
    })
);

export async function verifyCredential(email: string, inputPassword: string) {
    const res = await db.select().from(mUser).where(eq(mUser.email, email))
    if (res.length === 0) {
        return null
    }
    const password = res[0].password
    if (password === null) {
        return null
    }
    const valid = await verify(password, inputPassword)
    return valid ? res[0].idUser : null
}



