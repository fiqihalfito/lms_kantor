import { wait } from "~/lib/utils";
import { updateUrutanSubSkill } from "../_service";
import type { Route } from "./+types/update-urutan-subskill";
import { dataWithSuccess } from "remix-toast";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData()
    const subskillsString = formData.get("newOrder") as string
    const subskills = JSON.parse(subskillsString) as { idSubSkill: string, urutan: number }[]

    await updateUrutanSubSkill(subskills)


    return dataWithSuccess({ ok: true }, `Urutan subskill berhasil diperbarui`);
}