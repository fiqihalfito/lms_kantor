
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "~/components/ui/field"
import { XIcon } from "lucide-react";
import { Link, useFetcher } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";


type FormUserProp = {
    defaultValues?: {
        namaUser: string | null,
        email: string | null
    },
    mode: "insert" | "update"
}

export function FormUser({ defaultValues, mode }: FormUserProp) {

    const fetcher = useFetcher({ key: "form_user" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"


    const modeMapping: Record<typeof mode, any> = {
        insert: {
            title: "Tambah user baru",
            desc: `user baru`
        },
        update: {
            title: "Edit nama user",
            desc: `perbarui nama user`
        }
    }


    return (
        <div className="fixed inset-0  bg-black/50 z-99">
            <fetcher.Form method="post" className="h-screen w-screen flex items-center justify-center" encType="multipart/form-data">
                <Card className="w-1/4">
                    <CardHeader className="">
                        <CardTitle>{`${modeMapping[mode].title}`}</CardTitle>
                        <CardDescription>{`${modeMapping[mode].desc}`}</CardDescription>
                        <CardAction>
                            <Link to={`..`} viewTransition>
                                <Button type="button" size={"sm"} className="cursor-pointer flex items-center" variant={"outline"}>
                                    Batal
                                    <XIcon className="size-5" />
                                </Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="namaUser">
                                    Nama User
                                </FieldLabel>
                                <Input
                                    id="namaUser"
                                    placeholder="nama user"
                                    name="namaUser"
                                    defaultValue={defaultValues?.namaUser ?? undefined}
                                    required
                                />
                                {errors?.namaUser ? (
                                    <FieldError>{errors.namaUser}!</FieldError>
                                ) : null}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="email"
                                    placeholder="email"
                                    name="email"
                                    defaultValue={defaultValues?.email ?? undefined}
                                    required
                                />
                                {errors?.email ? (
                                    <FieldError>{errors.email}!</FieldError>
                                ) : null}
                            </Field>
                        </FieldGroup>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" className="cursor-pointer" disabled={uploading}>
                            {uploading ? (
                                <span className="flex items-center gap-x-2">
                                    {/* <LoaderCircleIcon className="animate-spin" /> */}
                                    <Spinner />
                                    Menyimpan ...
                                </span>

                            ) : "Simpan"}
                        </Button>
                    </CardFooter>
                </Card>
            </fetcher.Form>
        </div >
    )
}