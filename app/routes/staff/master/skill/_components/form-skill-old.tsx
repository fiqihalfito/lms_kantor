
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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { XIcon } from "lucide-react";
import { Link, useFetcher } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import type { getListTeam } from "../new/_service";


type FormSkillProp = {
    defaultValues?: {
        namaSkill: string | null,
        idTeam: string | null
    },
    mode: "insert" | "update",
    listTeam: Awaited<ReturnType<typeof getListTeam>>
}

export function FormSkill({ defaultValues, mode, listTeam }: FormSkillProp) {

    const fetcher = useFetcher({ key: "form_skill" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"


    const modeMapping: Record<typeof mode, any> = {
        insert: {
            title: "Tambah Skill baru",
            desc: `skill baru`
        },
        update: {
            title: "Edit nama skill",
            desc: `perbarui nama skill`
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
                                <FieldLabel htmlFor="namaSkill">
                                    Nama Skill
                                </FieldLabel>
                                <Input
                                    id="namaSkill"
                                    placeholder="nama skill"
                                    name="namaSkill"
                                    defaultValue={defaultValues?.namaSkill ?? undefined}
                                    required
                                />
                                {errors?.namaLayanan ? (
                                    <FieldError>{errors.namaLayanan}!</FieldError>
                                ) : null}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="team">
                                    Team
                                </FieldLabel>
                                <Select defaultValue={defaultValues?.idTeam ?? undefined} required name="idTeam">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Team" />
                                    </SelectTrigger>
                                    <SelectContent className="z-99">
                                        {listTeam.map((team, i) => (
                                            <SelectItem key={team.idTeam} value={team.idTeam}>{team.nama}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors?.idTeam ? (
                                    <FieldError>{errors.idTeam}!</FieldError>
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