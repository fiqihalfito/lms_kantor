import { data } from "react-router";
import { updateSubSkill } from "../_service";
import type { Route } from "./+types/edit-subskill";
import z from "zod";
import { wait } from "~/lib/utils";

export async function action({ request, params }: Route.ActionArgs) {

    await wait(3000)

    const formData = await request.formData()
    const update = Object.fromEntries(formData)

    // const update = {
    //     namaSubSkill: null,
    //     idUser: null
    // }

    try {
        await updateSubSkill(params.idSubSkill, {
            namaSubSkill: update.namaSubSkill as string,
            idUser: update.idUser ? String(update.idUser) : null,
        })
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.log(z.flattenError(err).fieldErrors)
            const errors = z.flattenError(err).fieldErrors
            return data({ errors }, { status: 400 })
        }
    }

    return data({
        ok: true,
        message: `Subskill ${String(update.namaSubSkill)} berhasil diperbarui`
    })

    // const flashHeaders = await setFlashSession(request, {
    //     type: "success",
    //     message: `Subskill ${String(update.namaSubSkill)} berhasil diperbarui`
    // })
    // return redirect("..", {
    //     headers: {...flashHeaders, "X"},
    // })
}