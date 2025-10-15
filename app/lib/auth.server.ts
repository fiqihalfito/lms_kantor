import { db } from "database/connect";
import { mUser } from "database/schema/schema";
import { and, eq } from "drizzle-orm";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import "dotenv/config"
import type { SessionUser } from "./session.server";



export let authenticator = new Authenticator<SessionUser[]>();

authenticator.use(
    new FormStrategy(async ({ form, request }) => {
        // Here you can use `form` to access and input values from the form.
        // and also use `request` to access more data
        let email = form.get("email") as string; // or email... etc
        let password = form.get("password") as string;




        // And finally, you can find, or create, the user
        let user = await getUserByEmailandPassword(email, password);

        // And return the user as the Authenticator expects it
        return user
    })
);

export async function getUserByEmailandPassword(email: string, password: string) {
    const res = await db.select().from(mUser).where(and(eq(mUser.email, email), eq(mUser.password, password)))
    return res
}


