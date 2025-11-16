import { userContext } from "~/lib/context";
import type { Route } from "./+types/add-skill";
import { insertSkill } from "../_service";
import { dataWithError, dataWithSuccess } from "remix-toast";
import z from "zod";


export async function action({ request, params, context }: Route.ActionArgs) {

    const user = context.get(userContext)

    const formData = await request.formData()
    const newSkill = Object.fromEntries(formData)

    try {
        await insertSkill({
            idSubBidang: user?.idSubBidang!,
            namaSkill: String(newSkill.namaSkill),
            idTeam: params.idTeam
        })
        return dataWithSuccess({ ok: true }, `${newSkill.namaSkill} berhasil disimpan`)
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errors = z.flattenError(err).fieldErrors
            return dataWithError({ errors }, "Data yang dikirim salah");
        }
        return dataWithError(null, "Error di query DB")
    }
}