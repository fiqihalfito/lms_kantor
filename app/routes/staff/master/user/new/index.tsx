import { userContext } from "~/lib/context";
import { FormUser } from "../_components/form-user";
import type { Route } from "./+types/index";
import { getUserByEmail, mInsertNewUserValidation, saveNewUser } from "./_service";
import { data, redirect } from "react-router";
import * as z from "zod";
import { setFlashSession } from "~/lib/session.server";

export async function action({ request, context }: Route.ActionArgs) {

    const user = context.get(userContext)

    const formData = await request.formData()
    const newUser = Object.fromEntries(formData)

    const validated = mInsertNewUserValidation.safeParse(newUser)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }

    // cek is current email exist
    const currentEmail = await getUserByEmail(validated.data.email)
    if (currentEmail.length > 0) {
        return data({
            errors: {
                email: "Email sudah ada, silahkan ganti"
            }
        }, { status: 400 })
    }

    await saveNewUser({
        idSubBidang: user?.idSubBidang!,
        email: validated.data.email,
        nama: validated.data.namaUser,
        password: "123"
    })

    const flashHeaders = await setFlashSession(request, {
        type: "success",
        message: `User ${validated.data.namaUser} berhasil disimpan`
    })
    return redirect("..", {
        headers: flashHeaders
    })
}

export default function NewLayanan({ }: Route.ComponentProps) {

    return (
        <FormUser mode="insert" />
    )
}