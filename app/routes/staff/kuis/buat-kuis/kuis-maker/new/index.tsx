import { FormKuis } from "../_components/FormKuis";
import type { Route } from "./+types/index";
import { redirect } from "react-router";
import { saveNewSoal, tInsertKuisElementValidation } from "./_service";
import { redirectWithSuccess } from "remix-toast";

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData()
    const newData = Object.fromEntries(formData)

    const validated = tInsertKuisElementValidation.safeParse(newData)

    const stringifyPilgan = JSON.stringify({
        a: validated.data?.a,
        b: validated.data?.b,
        c: validated.data?.c,
        d: validated.data?.d,
    })

    await saveNewSoal({
        idKuis: validated.data?.idKuis,
        soal: validated.data?.soal,
        pilgan: stringifyPilgan,
        jawaban: validated.data?.jawaban
    })

    // const flashHeaders = await setFlashSession(request, {
    //     type: "success",
    //     message: "Berhasil menambahkan soal"
    // })

    // return redirect("..", { headers: flashHeaders })
    return redirectWithSuccess("..", `Berhasil menambahkan soal`)
}




export default function NewKuisElement({ matches }: Route.ComponentProps) {

    const idKuis = matches[3].loaderData.idKuis

    return (
        <FormKuis mode="insert" defaultValues={{ idKuis: idKuis }} />
    )
}