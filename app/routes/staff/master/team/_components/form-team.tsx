
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


type FormTeamProp = {
    defaultValues?: {
        namaTeam: string | null,
    },
    mode: "insert" | "update"
}

export function FormTeam({ defaultValues, mode }: FormTeamProp) {

    const fetcher = useFetcher({ key: "form_team" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"


    const modeMapping: Record<typeof mode, any> = {
        insert: {
            title: "Tambah team baru",
            desc: `team baru`
        },
        update: {
            title: "Edit nama team",
            desc: `perbarui nama team`
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
                                <FieldLabel htmlFor="namaTeam">
                                    Nama Team
                                </FieldLabel>
                                <Input
                                    id="namaTeam"
                                    placeholder="nama user"
                                    name="namaTeam"
                                    defaultValue={defaultValues?.namaTeam ?? undefined}
                                    required
                                />
                                {errors?.namaTeam ? (
                                    <FieldError>{errors.namaTeam}!</FieldError>
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