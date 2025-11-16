import { FormUser } from "../_components/form-user";
import type { Route } from "./+types/index";
import { getUserByEmail, getUserById, mUpdateUserValidation, updateUser } from "./_service";
import z from "zod";
import { data, redirect } from "react-router";
import { redirectWithSuccess } from "remix-toast";

export async function loader({ request, params }: Route.LoaderArgs) {

    const userData = await getUserById(params.idUser)
    return { userData: userData[0] }
}

export async function action({ request, params }: Route.ActionArgs) {


    const formData = await request.formData()
    const newLayanan = Object.fromEntries(formData)

    const validated = mUpdateUserValidation.safeParse(newLayanan)
    if (!validated.success) {
        const errors = z.flattenError(validated.error).fieldErrors
        return data({ errors }, { status: 400 })
    }

    const currentEmail = await getUserByEmail(validated.data.email)
    if (currentEmail.length > 0 && currentEmail[0].email !== validated.data.email) {
        return data({
            errors: {
                email: "Email sudah ada, silahkan ganti"
            }
        }, { status: 400 })
    }

    await updateUser(params.idUser, {
        namaUser: validated.data.namaUser,
        email: validated.data.email
    })

    // const flashHeaders = await setFlashSession(request, {
    //     type: "success",
    //     message: `Berhasil diubah ke [${validated.data.namaUser}] dan email [${validated.data.email}]`
    // })
    // return redirect("..", { headers: flashHeaders })
    return redirectWithSuccess("..", `Berhasil diubah ke [${validated.data.namaUser}] dan email [${validated.data.email}]`)
}

export default function EditLayanan({ loaderData }: Route.ComponentProps) {

    const { userData } = loaderData

    return (
        <FormUser mode="update" defaultValues={{ ...userData }} />
    )
}