import { GalleryVerticalEndIcon } from "lucide-react";
import type { Route } from "./+types/index";
import { LoginForm } from "./_components/login-form";
import {
    authenticator,
} from "~/lib/auth.server";
import { saveSession, type SessionUser } from "~/lib/session.server";

import * as z from "zod";
import { data, Link, redirect } from "react-router";
import { loginMiddleware } from "~/lib/middleware.server";



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
    let idUser = await authenticator.authenticate("form", request);

    // warn user if user not found
    if (!idUser) {
        return data({ errors: { notFound: "User tidak terdaftar atau salah password" } }, { status: 400 })
    }

    const sessionUser: SessionUser = idUser
    const headers = await saveSession(request, sessionUser)
    return redirect('/app/dashboard', { headers })

}

export async function loader({ request, params }: Route.LoaderArgs) {

    // tidak return apa apa
    // digunakan hanya sebagai Trigger Server Middleware
    // server middleware hanya akan jalan kalau ada server loader 
    // https://reactrouter.com/how-to/middleware 

    return null
}


export default function LoginPage({ actionData, }: Route.ComponentProps) {



    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEndIcon className="size-4" />
                        </div>
                        {/* Acme Inc. */}
                        Digitalisasi PLN 2
                    </Link>
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