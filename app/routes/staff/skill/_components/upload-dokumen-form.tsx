

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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { LoaderCircleIcon, XIcon } from "lucide-react";
import { Link, useFetcher, useNavigate } from "react-router";
import { Input } from "~/components/ui/input";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { Button } from "~/components/ui/button";
import type { mLayanan, mSkill, tDokumen } from "database/schema/schema";
import type { TIPE_DOKUMEN } from "~/lib/constants";

type UploadDokumenFormType = {
    dv?: {
        judul: string
    }
}

export function UploadDokumenForm({ dv }: UploadDokumenFormType) {

    const fetcher = useFetcher({ key: "upload_dokumen" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"
    const navigate = useNavigate()

    return (
        <div className="fixed inset-0  bg-black/50 z-99">
            <fetcher.Form method="post" className="h-screen w-screen flex items-center justify-center" encType="multipart/form-data">
                <Card className="w-1/4">
                    <CardHeader className="">
                        <CardTitle>{`Upload Dokumen`}</CardTitle>
                        <CardDescription>{`Upload sumber pembelajaran`}</CardDescription>
                        <CardAction>
                            {/* <Link to={`/${FIRST_SEGMENT}/dokumen/${tipeDokumen}`} viewTransition> */}
                            <Button
                                type="button"
                                size={"sm"}
                                className="cursor-pointer flex items-center"
                                variant={"outline"}
                                onClick={() => navigate(-1)}
                            >
                                Batal
                                <XIcon className="size-5" />
                            </Button>
                            {/* </Link> */}
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="judul">
                                    Judul Dokumen
                                </FieldLabel>
                                <Input
                                    id="judul"
                                    placeholder="Judul dokumen"
                                    name="judul"
                                    defaultValue={dv?.judul ?? undefined}
                                    required
                                />
                                {errors?.judul ? (
                                    <FieldError>{errors.judul}!</FieldError>
                                ) : null}
                            </Field>

                            {(
                                <Field>
                                    <FieldLabel htmlFor="disable-filename">
                                        Upload Dokumen
                                    </FieldLabel>
                                    <Input
                                        id="file"
                                        type="file"
                                        name="file"
                                        required
                                    />
                                    {errors?.file ? (
                                        <FieldError>{errors.file}!</FieldError>
                                    ) : null}
                                </Field>
                            )}





                        </FieldGroup>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" className="cursor-pointer" disabled={uploading}>
                            {uploading ? (
                                <span className="flex items-center gap-x-2">
                                    <LoaderCircleIcon className="animate-spin" />
                                    Menyimpan ...
                                </span>

                            ) : "Simpan"}
                        </Button>
                    </CardFooter>
                </Card>
            </fetcher.Form>
        </div>
    )
}