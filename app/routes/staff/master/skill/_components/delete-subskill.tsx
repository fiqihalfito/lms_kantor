// delete skill component

import { TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useFetcher } from "react-router"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Spinner } from "~/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { FIRST_SEGMENT } from "~/lib/route-config"


export function DeleteSubSkill({
    idSubSkill,
    idSkill,
    nama
}: {
    idSkill: string,
    idSubSkill: string,
    nama: string
}) {

    const fetcher = useFetcher({ key: "delete_subskill" })
    const isDeleting = fetcher.state !== "idle"

    const [open, setOpen] = useState(false)


    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.ok) {
            setOpen(false)
        }
    }, [fetcher.state, fetcher.data])



    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                        <Button size={"icon-sm"} className="cursor-pointer" variant={"destructive"} >
                            <TrashIcon />
                        </Button>
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Hapus Subskill</p>
                </TooltipContent>
            </Tooltip>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin menghapus subskill {nama}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Menghapus tidak bisa dibatalkan. Ini akan menghapus permanen layanan di server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
                        Batal
                    </AlertDialogCancel>
                    {/* ini submit ke action */}
                    <fetcher.Form method="post" action={`/${FIRST_SEGMENT}/master/skill/action/delete-subskill/${idSubSkill}`}>
                        {/* <AlertDialogAction */}
                        {/* pakai button supaya bisa loading dulu baru menutup dialog */}
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Spinner />
                                    Menghapus ...
                                </>
                            ) : "Ya, Hapus"}
                        </Button>
                    </fetcher.Form>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}