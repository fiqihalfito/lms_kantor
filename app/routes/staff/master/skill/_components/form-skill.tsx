// form add or edit skill

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
import { CircleFadingPlusIcon, PencilIcon, XIcon } from "lucide-react";
import { Link, useFetcher } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { useEffect, useState } from "react";

type modeType = "insert" | "update"

type FormSkillProp = {
    idSkill?: string,
    idTeam?: string,
    namaTeam?: string,
    defaultValues?: {
        namaSkill: string | null,
    },
    mode: "insert" | "update",
    // listTeam: Awaited<ReturnType<typeof getListTeam>>
}

export function FormSkill({ defaultValues, mode, idSkill, idTeam, namaTeam }: FormSkillProp) {

    const [open, setOpen] = useState(false)

    const fetcher = useFetcher({ key: "form_skill" })
    const errors = fetcher.data?.errors
    const uploading = fetcher.state !== "idle"

    type modeMapType = {
        [k in modeType]: {
            tooltipContent: string,
            icon: React.ReactNode,
            dialogTitle: string,
            action: string
        }
    }
    const modeMap: modeMapType = {
        insert: {
            tooltipContent: `Tambah Skill ${namaTeam}`,
            icon: <CircleFadingPlusIcon className="size-5" />,
            dialogTitle: `Tambah Skill ${namaTeam}`,
            action: `team/${idTeam}/new`
        },
        update: {
            tooltipContent: "Edit SubSkill",
            icon: <PencilIcon />,
            dialogTitle: "Edit SubSkill",
            action: `${idSkill}/edit`
        }
    }

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.ok) {
            setOpen(false)
        }
    }, [fetcher.state, fetcher.data])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size={mode === "insert" ? "sm" : "icon-sm"} variant={"outline"} className="cursor-pointer">
                            {modeMap[mode].icon}
                            {mode === "insert" && "Tambah Skill"}
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{modeMap[mode].tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="gap-6" >
                <DialogHeader>
                    <DialogTitle>
                        {modeMap[mode].dialogTitle}
                    </DialogTitle>
                </DialogHeader>
                <fetcher.Form method="post" action={modeMap[mode].action}>
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
                            {errors?.namaSkill ? (
                                <FieldError>{errors.namaSkill}!</FieldError>
                            ) : null}
                        </Field>
                        <Field orientation="horizontal" >
                            <Button
                                type="submit"
                                className="ml-auto cursor-pointer"
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <>
                                        <Spinner />
                                        Menyimpan ...
                                    </>
                                ) : (
                                    <>
                                        Simpan
                                    </>
                                )}
                            </Button>
                        </Field>
                    </FieldGroup>
                </fetcher.Form>
            </DialogContent>
        </Dialog>



    )
}