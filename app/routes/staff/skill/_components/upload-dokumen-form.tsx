

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
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "~/components/ui/field"
import { LoaderCircleIcon, XIcon } from "lucide-react";
import { Form, useFetcher, useNavigate } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { getInputProps, useForm } from '@conform-to/react';
import { tUpdateNewDokumenValidation } from "../edit-dokumen/_schema";
import { parseWithZod } from "~/lib/conform";
import { tInsertNewDokumenValidation } from "../upload-dokumen/_schema";


type UploadDokumenFormType = {
    dv?: {
        judul: string | null,
        filename: string | null
    },
    idDokumen?: string,
    mode: "insert" | "update"
}

export function UploadDokumenForm({ dv, idDokumen, mode }: UploadDokumenFormType) {

    const fetcher = useFetcher({ key: "upload_dokumen" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"
    const navigate = useNavigate()

    const [form, fields] = useForm({
        // wajib client validate
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: mode === "insert" ? tInsertNewDokumenValidation : tUpdateNewDokumenValidation })
        },
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,
        defaultValue: {
            judul: dv?.judul,

        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",

    })


    return (
        <div className="fixed inset-0  bg-black/50 z-99">
            <fetcher.Form method="post" id={form.id} className="h-screen w-screen flex items-center justify-center" encType="multipart/form-data" onSubmit={form.onSubmit} noValidate>
                <Card className="w-1/4">
                    <CardHeader className="">
                        <CardTitle>{`Upload Dokumen`}</CardTitle>
                        <CardDescription>{`Upload sumber pembelajaran`}</CardDescription>
                        <CardAction>
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
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="judul">
                                    Judul Dokumen
                                </FieldLabel>
                                <Input
                                    // id="judul"
                                    // placeholder="Judul dokumen"
                                    // // name="judul"
                                    // name={fields.judul.name}
                                    // defaultValue={fields.judul.initialValue}
                                    // required
                                    {...getInputProps(fields.judul, { type: "text" })}
                                    placeholder="Judul dokumen"
                                />
                                {/* {fields.judul.errors ? (
                                    <FieldError>{fields.judul.errors}</FieldError>
                                ) : null} */}
                                <FieldError id={fields.judul.errorId}>{fields.judul.errors}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="disable-filename">
                                    Upload Dokumen
                                </FieldLabel>
                                <Input
                                    // id="file"
                                    // type="file"
                                    // // name="file"
                                    // name={fields.file.name}
                                    // required={idDokumen ? false : true}
                                    {...getInputProps(fields.file, { type: "file", accept: "application/pdf" })}
                                    placeholder="Upload file"
                                />
                                {idDokumen && (
                                    <FieldDescription>
                                        filename: {dv?.filename}
                                    </FieldDescription>
                                )}
                                <FieldError id={fields.file.errorId}>{fields.file.errors}</FieldError>
                            </Field>



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