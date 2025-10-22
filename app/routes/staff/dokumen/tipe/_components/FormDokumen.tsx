
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
import { Link, useFetcher } from "react-router";
import { Input } from "~/components/ui/input";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { Button } from "~/components/ui/button";
import type { mLayanan, tDokumen } from "database/schema/schema";
import type { TIPE_DOKUMEN } from "~/lib/constants";


type FormDokumenProp = {
    defaultValues?: typeof tDokumen.$inferSelect,
    listLayanan: typeof mLayanan.$inferSelect[],
    tipeDokumen: TIPE_DOKUMEN,
    mode: "insert" | "update"
}

export function FormDokumen({ defaultValues, listLayanan, tipeDokumen, mode }: FormDokumenProp) {

    const fetcher = useFetcher({ key: "form_dokumen" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"


    const modeMapping: Record<typeof mode, any> = {
        insert: {
            title: "Tambah",
            desc: `dokumen ${tipeDokumen} baru`
        },
        update: {
            title: "Edit",
            desc: `perbarui dokumen ${tipeDokumen}`
        }
    }

    //khusus edit
    // const [reuploadMode, setReuploadMode] = useState(false)


    return (
        <div className="fixed inset-0  bg-black/50 z-99">
            <fetcher.Form method="post" className="h-screen w-screen flex items-center justify-center" encType="multipart/form-data">
                <Card className="w-1/4">
                    <CardHeader className="">
                        <CardTitle>{`${modeMapping[mode].title} Dokumen ${tipeDokumen}`}</CardTitle>
                        <CardDescription>{`${modeMapping[mode].desc}`}</CardDescription>
                        <CardAction>
                            <Link to={`/${FIRST_SEGMENT}/dokumen/${tipeDokumen}`} viewTransition>
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
                                <FieldLabel htmlFor="judul">
                                    Judul Dokumen
                                </FieldLabel>
                                <Input
                                    id="judul"
                                    placeholder="Judul dokumen"
                                    name="judul"
                                    defaultValue={defaultValues?.judul ?? undefined}
                                    required
                                />
                                {errors?.judul ? (
                                    <FieldError>{errors.judul}!</FieldError>
                                ) : null}
                            </Field>

                            {(tipeDokumen !== "SOP") && (
                                <Field>
                                    <FieldLabel htmlFor="layanan">
                                        Layanan
                                    </FieldLabel>
                                    <Select
                                        name="layanan"
                                        defaultValue={defaultValues?.idLayanan ?? undefined}
                                        required={tipeDokumen === "IK"}
                                    >
                                        <SelectTrigger id="layanan">
                                            <SelectValue placeholder="Layanan" />
                                        </SelectTrigger>
                                        <SelectContent className="z-9999">
                                            <SelectGroup>
                                                <SelectLabel>Layanan</SelectLabel>
                                                {listLayanan.map((l, i) => (
                                                    <SelectItem value={l.idLayanan}>{l.nama}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}





                            {/* {mode === "update" && (
                                    <div className="flex gap-x-2">
                                        <Input
                                            type="text"
                                            defaultValue={defaultValues?.filename ?? undefined}
                                            disabled
                                        />
                                        <Button type="button" variant={"outline"} onClick={() => setReuploadMode(prev => !prev)}>
                                            {!reuploadMode ? (
                                                <>
                                                    <FolderSyncIcon />
                                                    Upload ulang?
                                                </>

                                            ) : (
                                                <>
                                                    <CircleXIcon />
                                                    Batal upload
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )} */}



                            {mode === "insert" && (
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
        </div >
    )
}