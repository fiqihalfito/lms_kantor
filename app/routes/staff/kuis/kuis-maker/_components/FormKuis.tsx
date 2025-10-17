
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
    FieldSet,
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
import { Button } from "~/components/ui/button";
import type { tKuisElement } from "database/schema/schema";
import { Textarea } from "~/components/ui/textarea";
import { ButtonGroup, ButtonGroupText } from "~/components/ui/button-group";
import { Label } from "~/components/ui/label";
import { InputGroup, InputGroupInput } from "~/components/ui/input-group";


type FormKuisProp = {
    defaultValues?: typeof tKuisElement.$inferInsert,
    mode: "insert" | "update"
}

export function FormKuis({ defaultValues, mode }: FormKuisProp) {

    const fetcher = useFetcher({ key: "form_kuis" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"


    const modeMapping: Record<typeof mode, any> = {
        insert: {
            title: "Tambah Soal baru",
            desc: `Soal baru`
        },
        update: {
            title: "Edit",
            desc: `perbarui soal`
        }
    }

    const pilihan = ["a", "b", "c", "d"] as const

    type PilihanKey = typeof pilihan[number];

    const defaultValuesPilganParsed: Record<PilihanKey, string> = defaultValues?.pilgan
        ? JSON.parse(defaultValues.pilgan)
        : { a: "", b: "", c: "", d: "" };

    //khusus edit
    // const [reuploadMode, setReuploadMode] = useState(false)


    return (
        <div className="fixed inset-0  bg-black/50 z-99">
            <fetcher.Form method="post" className="h-screen w-screen flex items-center justify-center" encType="multipart/form-data">
                <Card className="w-1/2">
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
                        <FieldSet>
                            <Input
                                name="idKuis"
                                defaultValue={defaultValues?.idKuis ?? undefined}
                                required
                                hidden
                            />
                            <Field>
                                <FieldLabel htmlFor="soal">
                                    Soal
                                </FieldLabel>

                                <Textarea
                                    placeholder="Soal"
                                    id="soal"
                                    name="soal"
                                    defaultValue={defaultValues?.soal ?? undefined}
                                    required
                                />
                                {errors?.soal ? (
                                    <FieldError>{errors.soal}!</FieldError>
                                ) : null}
                            </Field>

                            {/* <FieldDescription>
                                Pilihan ganda
                            </FieldDescription> */}
                            <FieldGroup>

                                <Field>
                                    <FieldLabel>
                                        Pilihan ganda
                                    </FieldLabel>
                                    {pilihan.map((p, i) => (
                                        <ButtonGroup>
                                            <ButtonGroupText asChild>
                                                <Label htmlFor={p}>{p.toUpperCase()}</Label>
                                            </ButtonGroupText>
                                            <InputGroup>
                                                <InputGroupInput
                                                    id={p}
                                                    name={p}
                                                    placeholder={`pilihan ${p.toUpperCase()}`}
                                                    type="text"
                                                    defaultValue={defaultValuesPilganParsed[p]}
                                                    required
                                                />
                                            </InputGroup>
                                        </ButtonGroup>
                                    ))}
                                </Field>
                                <Field className="w-1/5">
                                    <FieldLabel>
                                        Jawaban Benar
                                    </FieldLabel>
                                    <Select name="jawaban" required defaultValue={defaultValues?.jawaban ?? undefined}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Jawaban Benar" />
                                        </SelectTrigger>
                                        <SelectContent className="z-99">
                                            <SelectGroup>
                                                <SelectLabel>pilihan</SelectLabel>
                                                <SelectItem value="a">A</SelectItem>
                                                <SelectItem value="b">B</SelectItem>
                                                <SelectItem value="c">C</SelectItem>
                                                <SelectItem value="d">D</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
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