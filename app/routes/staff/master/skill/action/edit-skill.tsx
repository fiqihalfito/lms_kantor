import { dataWithError, dataWithSuccess } from "remix-toast";
import { updateSkill } from "../_service";
import type { Route } from "./+types/edit-skill";
import z from "zod";




export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const update = Object.fromEntries(formData)

    try {
        await updateSkill(params.idSkill, {
            namaSkill: String(update.namaSkill)
        })
        return dataWithSuccess({ ok: true }, `Skill ${update.namaSkill} berhasil diubah`)
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errors = z.flattenError(err).fieldErrors
            return dataWithError({ errors }, "Data yang dikirim salah");
        }
        return dataWithError(null, "Error di query DB")
    }
}