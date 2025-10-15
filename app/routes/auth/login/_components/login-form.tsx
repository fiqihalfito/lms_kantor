

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { useFetcher } from "react-router"
import { Spinner } from "~/components/ui/spinner"

export function LoginForm() {


    const fetcher = useFetcher()
    const isSubmitting = fetcher.state !== "idle"
    const errors = fetcher.data?.errors


    return (
        <fetcher.Form method="post" className={cn("flex flex-col gap-6")} >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Masukan email anda untuk login
                    </p>
                    {/* <p>{JSON.stringify(fetcher.data)}</p> */}
                </div>
                <Field>
                    {errors?.notFound && <FieldError className="text-center">{errors.notFound}</FieldError>}
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" name="email" placeholder="m@iconpln.com" required />
                    {/* <FieldDescription>Optional helper text.</FieldDescription> */}
                    {errors?.email && <FieldError>{errors.email}</FieldError>}
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" name="password" placeholder="password" required />
                    {errors?.password && <FieldError>{errors.password}</FieldError>}
                </Field>
                <Field>
                    <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting && <Spinner />}
                        Login
                    </Button>
                </Field>
            </FieldGroup>
        </fetcher.Form>
    )
}
