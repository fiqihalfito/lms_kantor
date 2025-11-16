import { db } from "database/connect";
import { mUser } from "database/schema/schema";
import { and, eq } from "drizzle-orm";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import "dotenv/config"



export let authenticator = new Authenticator<string | null>();

authenticator.use(
    new FormStrategy(async ({ form, request }) => {
        // Here you can use `form` to access and input values from the form.
        // and also use `request` to access more data
        let email = form.get("email") as string; // or email... etc
        let password = form.get("password") as string;




        // And finally, you can find, or create, the user
        let idUser = await getIdUserByEmailandPassword(email, password);

        // And return the user as the Authenticator expects it
        return idUser
    })
);

export async function getIdUserByEmailandPassword(email: string, password: string) {
    const res = await db.select().from(mUser).where(and(eq(mUser.email, email), eq(mUser.password, password)))
    return res.length > 0 ? res[0].idUser : null
}



