import { userContext } from "~/lib/context";
import type { Route } from "./+types";
import { checkKuisProgressExist, registerKuisProgress } from "./_service";
import { redirect } from "react-router";
import { FIRST_SEGMENT } from "~/lib/route-config";

export async function action({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const resKuisProgressExist = await checkKuisProgressExist(params.idKuis, user?.idUser!)
    if (resKuisProgressExist.length > 0) {
        return redirect(`/${FIRST_SEGMENT}/kuis/mulai-kuis/on/${resKuisProgressExist[0].idKuisProgress}/kuis/${params.idKuis}`)
    }

    const kuisProgress = await registerKuisProgress(params.idKuis, user?.idUser!)
    return redirect(`/${FIRST_SEGMENT}/kuis/mulai-kuis/on/${kuisProgress[0].idKuisProgress}/kuis/${params.idKuis}`)
}