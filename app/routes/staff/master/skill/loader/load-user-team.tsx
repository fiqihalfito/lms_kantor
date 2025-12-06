import { getUserTeam } from "../_service";
import type { Route } from "./+types/load-user-team";

export async function loader({ request, params }: Route.LoaderArgs) {

    const userTeam = await getUserTeam(params.idTeam)

    return { userTeam }
}