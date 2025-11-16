import { authMiddleware } from "~/lib/middleware.server";
import type { Route } from "./+types/index";
import { userContext } from "~/lib/context";

export const middleware: Route.MiddlewareFunction[] = [
    authMiddleware,
];

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    return { user }
}