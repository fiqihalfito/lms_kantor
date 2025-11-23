import { updateSubSkill } from "../_service";
import type { Route } from "./+types/edit-subskill";
import z from "zod";
import { wait } from "~/lib/utils";
import { dataWithError, dataWithSuccess } from "remix-toast";

export async function action({ request, params }: Route.ActionArgs) {


    const formData = await request.formData()
    const update = Object.fromEntries(formData)

    // const update = {
    //     namaSubSkill: null,
    //     idUser: null
    // }

    try {
        await updateSubSkill(params.idSubSkill, {
            namaSubSkill: update.namaSubSkill as string,
            level: Number(update.level),
            idUser: update.idUser ? String(update.idUser) : null,
        })
        return dataWithSuccess({ ok: true }, `Subskill ${String(update.namaSubSkill)} berhasil diperbarui`);
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errors = z.flattenError(err).fieldErrors
            // return data({ errors }, { status: 400 })
            return dataWithError({ errors }, "Data yang dikirim salah");
        }
        return dataWithError(null, "Error di query DB")
    }

}