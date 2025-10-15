import { destroySession } from "~/lib/session.server";
import type { Route } from "./+types/index";
import { redirect } from "react-router";

export async function action({ request, params }: Route.ActionArgs) {

    const headers = await destroySession(request)
    return redirect("/auth/login", { headers })
}