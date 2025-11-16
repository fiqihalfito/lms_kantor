import { data, useFetcher, useSubmit } from "react-router";
import type { Route } from "./+types/team";
import { Button } from "~/components/ui/button";
import { ArrowLeftRightIcon, MoreVerticalIcon, OctagonXIcon, TrashIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { TableWrapper } from "~/components/table-wrapper";
import { getAllMemberTeamByIdTeam, getOtherTeamDataExceptThisTeam, getTeamName } from "./_service";
import { EmptyMaster } from "~/components/empty-master";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Spinner } from "~/components/ui/spinner";
import { MyAlert } from "~/components/alert-custom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useCallback } from "react";
import { getToast } from "remix-toast";
import { useToastEffect } from "~/hooks/use-toast";

export async function loader({ request, context, params }: Route.LoaderArgs) {

    // const user = context.get(userContext)
    // await wait(3000)
    const members = await getAllMemberTeamByIdTeam(params.idTeam)
    const nameTeam = await getTeamName(params.idTeam)
    const otherTeam = await getOtherTeamDataExceptThisTeam(params.idTeam)

    const { headers, toast } = await getToast(request)
    return data({ members, toast, nameTeam: nameTeam[0].namaTeam, otherTeam }, { headers })
}

export default function MemberTeamMaster({ loaderData }: Route.ComponentProps) {

    const { members, toast, nameTeam, otherTeam } = loaderData

    useToastEffect(toast)

    const submit = useSubmit()
    const handleSubmit = useCallback(({
        destinationTeam,
        idUser,
        namaUser,
        namaDestinationTeam
    }: {
        destinationTeam: string,
        idUser: string,
        namaUser: string,
        namaDestinationTeam: string
    }) => {
        submit({
            destinationTeam: destinationTeam,
            idUser: idUser,
            namaUser: namaUser,
            namaDestinationTeam: namaDestinationTeam
        }, {
            action: "transfer",
            method: "post"
        })
    }, [])

    return (
        // <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
        <div className="flex flex-col gap-4">

            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Team {nameTeam}</h1>
                    <p className="text-muted-foreground">List Member Team</p>
                </div>
            </div>

            <Separator />


            {members.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Member team" />
            ) : (
                <TableWrapper className="w-1/2">
                    <Table key={nameTeam}>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Nama Anggota</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member, i) => (
                                <TableRow key={member.idUser}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{member.nama}</TableCell>
                                    <TableCell className="text-right space-x-1.5">


                                        <DropdownMenu >
                                            <DropdownMenuTrigger asChild>
                                                <Button size={"icon"} variant={"ghost"} className="cursor-pointer size-8" >
                                                    <MoreVerticalIcon />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="end">
                                                <DropdownMenuLabel>
                                                    Pindah Team lain
                                                </DropdownMenuLabel>
                                                <DropdownMenuGroup>
                                                    {otherTeam.map((o, i) => (
                                                        <DropdownMenuItem onClick={() => handleSubmit({
                                                            destinationTeam: o.idTeam,
                                                            idUser: member.idUser,
                                                            namaUser: member.nama!,
                                                            namaDestinationTeam: o.idTeam
                                                        })}>
                                                            {o.nama}
                                                            <DropdownMenuShortcut>
                                                                <ArrowLeftRightIcon />
                                                            </DropdownMenuShortcut>
                                                        </DropdownMenuItem>
                                                    ))}
                                                    {/* <DropdownMenuItem onClick={() => handleSubmit()}>
                                                        Profile
                                                        <DropdownMenuShortcut>
                                                            <ArrowLeftRightIcon />
                                                        </DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Billing
                                                        <DropdownMenuShortcut>
                                                            <ArrowLeftRightIcon />
                                                        </DropdownMenuShortcut>
                                                    </DropdownMenuItem> */}
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* <AlertDialogDeleteButton idTeam={item.idTeam} nama={item.nama!} /> */}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableWrapper>
            )}

        </div >
    )
}

function AlertDialogDeleteButton({
    idTeam,
    nama
}: {
    idTeam: string,
    nama: string
}) {

    const fetcher = useFetcher({ key: "delete_team" })

    const isDeleting = fetcher.state !== "idle"


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"icon"} className="cursor-pointer" variant={"destructive"} >
                    <TrashIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin menghapus team [{nama}]?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Menghapus tidak bisa dibatalkan. Ini akan menghapus permanen di server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
                        Batal
                    </AlertDialogCancel>
                    {/* ini submit ke action */}
                    <fetcher.Form method="post" action={`delete`}>
                        <input type="hidden" name="_action" value="delete" />
                        <input type="hidden" name="idTeam" value={idTeam} />
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

