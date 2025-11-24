import { wait } from "~/lib/utils";
import type { Route } from "./+types/update-urutan-subskill";
import { updateUrutanSubSkill } from "../_service";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData()
    const subskillsString = formData.get("newOrder") as string
    const subskills = JSON.parse(subskillsString) as { idSubSkill: string, urutan: number }[]

    for (const subskill of subskills) {
        await updateUrutanSubSkill(subskill)
    }



    return {}
}