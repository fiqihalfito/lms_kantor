import { userContext } from "~/lib/context";
import type { Route } from "./+types";
import { checkKuisProgressExist, getIdSkillFromDokumenByIdKuis, registerKuisProgress, resetKuis } from "./_service";
import { redirect } from "react-router";
import { FIRST_SEGMENT } from "~/lib/route-config";

export async function action({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const kuisProgressExist = await checkKuisProgressExist(params.idKuis, user.idUser)
    if (kuisProgressExist.length > 0) {
        if (kuisProgressExist[0].isSelesai) {
            await resetKuis(kuisProgressExist[0].idKuisProgress)
        }
        return redirect(`/${FIRST_SEGMENT}/kuis/mulai-kuis/on/${kuisProgressExist[0].idKuisProgress}/kuis/${params.idKuis}`)
    }

    const idSkillFromDokumen = await getIdSkillFromDokumenByIdKuis(params.idKuis)
    const kuisProgress = await registerKuisProgress(params.idKuis, user?.idUser!, idSkillFromDokumen)
    return redirect(`/${FIRST_SEGMENT}/kuis/mulai-kuis/on/${kuisProgress[0].idKuisProgress}/kuis/${params.idKuis}`)
}