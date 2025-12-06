import { TrashIcon } from "lucide-react"
import { useFetcher } from "react-router"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Spinner } from "~/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { FIRST_SEGMENT } from "~/lib/route-config"

type DeleteSkillType = {
    idSubSkill: string
}

export function DeleteSkill({
    idSkill,
    nama
}: {
    idSkill: string,
    nama: string
}) {

    const fetcher = useFetcher({ key: "delete_skill" })

    const isDeleting = fetcher.state !== "idle"


    return (
        <AlertDialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                        <Button size={"icon-sm"} className="cursor-pointer" variant={"destructive"} >
                            <TrashIcon />
                        </Button>
                    </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Hapus skill</p>
                </TooltipContent>
            </Tooltip>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin menghapus skill {nama}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Menghapus Skill beserta subskillnya secara permanen
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
                        Batal
                    </AlertDialogCancel>
                    {/* ini submit ke action */}
                    <fetcher.Form method="post" action={`/${FIRST_SEGMENT}/master/skill/action/delete-skill/${idSkill}`}>
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