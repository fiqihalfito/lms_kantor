// action add subskill

import { insertSubSkill } from "../_service";
import type { Route } from "./+types/add-subskill";
import z from "zod";
import { dataWithError, dataWithSuccess } from "remix-toast";

export async function action({ request, params }: Route.ActionArgs) {


    const formData = await request.formData()
    const newSubSkill = Object.fromEntries(formData)

    // const newSubSkill = {
    //     namaSubSkill: null,
    //     idUser: null
    // }

    try {
        await insertSubSkill({
            namaSubSkill: newSubSkill.namaSubSkill as string,
            idUser: newSubSkill.idUser ? String(newSubSkill.idUser) : null,
            idSkill: params.idSkill
        })
        return dataWithSuccess({ ok: true }, `Subskill ${String(newSubSkill.namaSubSkill)} berhasil ditambahkan`);
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errors = z.flattenError(err).fieldErrors
            // console.log(errors)
            // return data({ errors }, { status: 400 })
            return dataWithError({ errors }, "Data yang dikirim salah");
        }
        return dataWithError(null, "Error di query DB")
    }

}