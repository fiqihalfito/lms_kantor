// form add or edit subskill


import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import type { getAllUsers } from "../_service"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { CircleFadingPlusIcon, PencilIcon, type LucideIcon } from "lucide-react"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Form, useFetcher } from "react-router"
import { useEffect, useRef, useState } from "react"
import { Spinner } from "~/components/ui/spinner"
import { toast as notify } from "sonner"
import type { ToastMessage } from "remix-toast"

type modeType = "insert" | "update"

type FormSubSkillType = {
    allUsers: Awaited<ReturnType<typeof getAllUsers>>,
    idTeam: string,
    idSkill?: string,
    idSubSkill?: string,
    namaSkill?: string,
    dv?: {
        namaSubSkill: string,
        idUser: string | null
    },
    mode: modeType,
}

export function FormSubSkill({ allUsers, idTeam, idSkill, idSubSkill, namaSkill, mode, dv }: FormSubSkillType) {

    const [open, setOpen] = useState(false)

    const userTeam = allUsers.filter(user => user.idTeam === idTeam)

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
            tooltipContent: `Tambah SubSkill ${namaSkill}`,
            icon: <CircleFadingPlusIcon className="size-5" />,
            dialogTitle: `Tambah SubSkill ${namaSkill}`,
            action: `${idSkill}/subskill/new`
        },
        update: {
            tooltipContent: "Edit SubSkill",
            icon: <PencilIcon />,
            dialogTitle: "Edit SubSkill",
            action: `${idSkill}/subskill/${idSubSkill}/edit`
        }
    }

    let fetcher = useFetcher({ key: "form_subskill" })
    let errors = fetcher.data?.errors
    const submitting = fetcher.state !== "idle"

    // 🔥 Tutup dialog hanya ketika submit berhasil

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
                        <Button size={"icon-sm"} variant={"outline"} className="cursor-pointer">
                            {modeMap[mode].icon}
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
                    {/* <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription> */}
                </DialogHeader>
                <fetcher.Form method="POST" action={modeMap[mode].action} >
                    <FieldGroup>
                        {/* <Input type="hidden" name="idSubSkill" defaultValue={dv?.idSubSkill} /> */}
                        <Field>
                            <FieldLabel htmlFor="namaSubSkill">Nama SubSkill</FieldLabel>
                            <Input id="namaSubSkill" placeholder="Nama SubSkill" name="namaSubSkill" defaultValue={dv?.namaSubSkill} required />
                            {/* <FieldDescription>This appears on invoices and emails.</FieldDescription> */}
                            {errors?.namaSubSkill && <FieldError>{errors.namaSubSkill}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>PIC</FieldLabel>
                            <Select name="idUser" required defaultValue={dv?.idUser ?? undefined}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih anggota" />
                                </SelectTrigger>
                                <SelectContent>
                                    {userTeam.map((u, i) => (
                                        <SelectItem key={u.idUser} value={u.idUser}>{u.namaUser}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field orientation="horizontal" >
                            {/* <Switch id="newsletter" /> */}
                            {/* <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel> */}
                            <Button
                                type="submit"
                                className="ml-auto cursor-pointer"
                                disabled={submitting}
                            >
                                {submitting ? (
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