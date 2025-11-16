import { FormKuis } from "../_components/FormKuis";
import type { Route } from "./+types/index";
import { data, redirect } from "react-router";
import { updateSoal, tUpdateKuisElementValidation, getCurrentKuisElement } from "./_service";
import z from "zod";
import { redirectWithSuccess } from "remix-toast";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const newData = Object.fromEntries(formData)

    const validated = tUpdateKuisElementValidation.safeParse(newData)

    if (!validated.success) {
        const errors = z.flattenError(validated.error!).fieldErrors
        return data({ errors }, { status: 400 })
    }

    const stringifyPilgan = JSON.stringify({
        a: validated.data?.a,
        b: validated.data?.b,
        c: validated.data?.c,
        d: validated.data?.d,
    })

    await updateSoal(params.idKuisElement, {
        idKuis: validated.data?.idKuis,
        soal: validated.data?.soal,
        pilgan: stringifyPilgan,
        jawaban: validated.data?.jawaban,
    })

    // const flashHeaders = await setFlashSession(request, {
    //     type: "success",
    //     message: "Berhasil memperbarui soal"
    // })

    // return redirect("..", { headers: flashHeaders })
    return redirectWithSuccess("..", "Berhasil memperbarui soal")
}

export async function loader({ request, params }: Route.LoaderArgs) {

    const currentKuisElement = await getCurrentKuisElement(params.idKuisElement)
    return { currentKuisElement }
}


export default function UpdateKuisElement({ matches, params, loaderData }: Route.ComponentProps) {

    // const idKuis = matches[3].loaderData.idKuis
    const { currentKuisElement } = loaderData

    return (
        <FormKuis mode="update" defaultValues={currentKuisElement[0]} />
    )
}