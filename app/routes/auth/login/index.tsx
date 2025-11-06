import { GalleryVerticalEndIcon } from "lucide-react";
import type { Route } from "./+types/index";
import { LoginForm } from "./_components/login-form";
import {
    authenticator,
} from "~/lib/auth.server";
import { saveSession, type SessionUser } from "~/lib/session.server";

import * as z from "zod";
import { data, redirect } from "react-router";
import { loginMiddleware } from "~/lib/middleware.server";
import { getNamaSubbidang } from "./_service";



export const middleware: Route.MiddlewareFunction[] = [
    loginMiddleware,
];

// 1️⃣ Definisikan skema validasi
const loginSchema = z.object({
    email: z.email()
        .min(5, "Email terlalu pendek"),
    password: z
        .string()
    // .min(6, "Password minimal 6 karakter"),
});

export async function action({ request, params }: Route.ActionArgs) {

    // ========= validation form first
    const cloned = request.clone()
    const formData = await cloned.formData()
    const inputedData = Object.fromEntries(formData)
    const validated = loginSchema.safeParse(inputedData)

    if (!validated.success) {
        const flattened = z.flattenError(validated.error)
        return data({ errors: flattened.fieldErrors }, { status: 400 })
    }
    // =============== validation ends


    // start finding user
    let user = await authenticator.authenticate("form", request);

    // warn user if user not found
    if (user.length === 0) {
        return data({ errors: { notFound: "User tidak terdaftar atau salah password" } }, { status: 400 })
    }

    const namaSubbidang = await getNamaSubbidang(user[0].idSubBidang)
    // user found then get the first element and nama subbidang into header then redirect
    const sessionUser: SessionUser = {
        email: user[0].email,
        idSubBidang: user[0].idSubBidang,
        idUser: user[0].idUser,
        nama: user[0].nama,
        namaSubbidang: namaSubbidang!,
        idTeam: user[0].idTeam,
    }

    const headers = await saveSession(request, sessionUser)
    return redirect('/app/dashboard', { headers })

}


export default function LoginPage({ actionData, }: Route.ComponentProps) {



    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEndIcon className="size-4" />
                        </div>
                        Acme Inc.
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                {/* <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                /> */}
            </div>
        </div>
    )
}