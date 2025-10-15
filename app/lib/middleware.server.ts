import { redirect } from "react-router";
import { getUserFromSession } from "./session.server";
import { userContext } from "./context";
import { FIRST_SEGMENT } from "./route-config";

export async function authMiddleware({ request, context }: any) {
    const user = await getUserFromSession(request);
    if (!user) {
        throw redirect("/auth/login");
    }
    context.set(userContext, user);
}

export async function loginMiddleware({ request, context }: any) {
    const user = await getUserFromSession(request);
    if (user) {
        throw redirect(`/${FIRST_SEGMENT}/dashboard`)
    }
}