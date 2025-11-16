import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types/index";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { FolderXIcon, MoreVerticalIcon, NotebookPenIcon } from "lucide-react"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"
import { getAllDokumenByTipe, getAllLayanan, getAllSkill, getAllTeams } from "./_services";
import { Button } from "~/components/ui/button";
import { EyeIcon, FilePlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { data, Link, Outlet, useFetcher, useSubmit } from "react-router";
import { formatTimestampId } from "~/lib/utils";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { userContext } from "~/lib/context";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { MyAlert } from "~/components/alert-custom";
import { Badge } from "~/components/ui/badge";
import { Filter } from "./_components/filter";
import { Search } from "./_components/search";
import type { TIPE_DOKUMEN } from "~/lib/constants";
import { useToastEffect } from "~/hooks/use-toast";
import { getToast } from "remix-toast";



export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    // find idTeam if exists
    let idTeam = null;
    if (params.tipeDokumen !== "SOP") {
        // const userTeam = await checkWhichTeam(user?.idUser!)
        idTeam = user?.idTeam
    }

    // url search param
    const url = new URL(request.url);
    const teamFilter = url.searchParams.get("teamFilter");
    const layananFilter = url.searchParams.get("layananFilter");
    const skillFilter = url.searchParams.get("skillFilter");
    const searchFilter = url.searchParams.get("search");

    const activeFilter = {
        team: teamFilter ?? idTeam,
        layanan: layananFilter || null,
        skill: skillFilter || null,
        search: searchFilter || null,
    }



    // get Main data ===========
    const dokumens = await getAllDokumenByTipe(
        user?.idSubBidang!,
        user?.idUser!,
        params.tipeDokumen,
        {
            idTeam: activeFilter.team,
            idLayanan: activeFilter.layanan,
            idSkill: activeFilter.skill,
            search: activeFilter.search
        }
    )

    // filter master data
    const teams = await getAllTeams(user?.idSubBidang!)
    const layanan = params.tipeDokumen === "IK" ? await getAllLayanan(user?.idSubBidang!) : undefined
    const skill = params.tipeDokumen === "Knowledge" ? await getAllSkill(user?.idSubBidang!, activeFilter.team) : undefined
    const filterData = {
        teams,
        layanan,
        skill
    }

    // get toast
    const { toast, headers } = await getToast(request)

    return data({
        dokumens,
        filterData,
        currentLoginIdUser: user?.idUser,
        activeFilter,
        toast
    },
        { headers }
    )
}




export default function DokumenIndex({ loaderData, params }: Route.ComponentProps) {

    const { dokumens, toast, currentLoginIdUser, filterData, activeFilter } = loaderData

    const tipeMapping: Record<any, any> = {
        descPage: {
            "SOP": "Berisi dokumen SOP",
            "IK": "Berisi dokumen IK",
            "Knowledge": "Berisi dokumen Knowledge",
        },
    }

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const mulaiKuisSubmit = useSubmit()
    const handleMulaiKuis = (idKuis: string | null) => {
        if (idKuis === null) return

        mulaiKuisSubmit(null, {
            action: `/${FIRST_SEGMENT}/kuis/mulai-kuis/init/${idKuis}`,
            method: "post"
        })
    }

    useToastEffect(toast)



    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Dokumen</h1>
                    {/* <p className="text-muted-foreground">Berisi SOP, IK, dan Sharing Knowledge</p> */}
                    <p className="text-muted-foreground">{tipeMapping.descPage[params.tipeDokumen]}</p>
                </div>
                <Link to={`new`}>
                    <Button className="cursor-pointer" size={"lg"} >
                        <FilePlusIcon className="size-5" />
                        Tambah Dokumen {params.tipeDokumen}
                    </Button>
                </Link>

            </div>

            <Separator />


            <Outlet />

            {/* {flashData && <MyAlert status={flashData.type} title={flashData.message} />} */}


            <div className="flex gap-4">
                <Search search={activeFilter.search} />
                {params.tipeDokumen !== "SOP" && (
                    <Filter
                        filterData={filterData}
                        activeFilter={activeFilter}
                        tipe={params.tipeDokumen as Exclude<TIPE_DOKUMEN, "SOP">}
                    />
                )}
            </div>


            {dokumens.length === 0 ? (
                <EmptyComp />
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Judul Dokumen</TableHead>
                                {(params.tipeDokumen === "IK") && <TableHead>Layanan</TableHead>}
                                {(params.tipeDokumen === "Knowledge") && <TableHead>Skill</TableHead>}
                                {/* <TableHead>Tipe Dokumen</TableHead> */}
                                <TableHead>Uploaded By</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                                <TableHead>Baca</TableHead>
                                {params.tipeDokumen === "Knowledge" && <TableHead>Kuis</TableHead>}
                                {/* <TableHead>Aksi</TableHead> */}
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dokumens.map((d, i) => (
                                <TableRow key={d.idDokumen}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{d.judul}</TableCell>
                                    {(params.tipeDokumen === "IK") && <TableCell>{d.layanan?.nama ?? "-"}</TableCell>}
                                    {(params.tipeDokumen === "Knowledge") && <TableCell>{d.skill?.namaSkill ?? "-"}</TableCell>}
                                    <TableCell>{d.user?.nama}</TableCell>
                                    <TableCell>{formatTimestampId(d.createdAt, { withZoneLabel: true })}</TableCell>
                                    <TableCell>{d.updatedAt ? formatTimestampId(d.updatedAt, { withZoneLabel: true }) : "-"}</TableCell>
                                    <TableCell>
                                        {d.statusBaca[0]?.isRead ? (
                                            <Badge className="bg-green-600 rounded-full">Done</Badge>
                                        ) : (
                                            <Badge variant={"destructive"} className="rounded-full">Not Yet</Badge>
                                        )}
                                    </TableCell>
                                    {params.tipeDokumen === "Knowledge" && (
                                        <TableCell>
                                            {d.kuis?.kuisProgress[0]?.idKuisProgress && d.kuis?.kuisProgress[0]?.isSelesai === true ? (
                                                <Badge className="bg-green-600 rounded-full">Done</Badge>
                                            ) : (
                                                <Badge variant={"destructive"} className="rounded-full">Not Yet</Badge>
                                            )}
                                        </TableCell>
                                    )}

                                    <TableCell className="text-right space-x-1.5">

                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>

                                                <Button variant="secondary" size={"icon"}>
                                                    <MoreVerticalIcon />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="sm:min-w-60" align="end">
                                                {/* <DropdownMenuLabel>Menu Aksi</DropdownMenuLabel> */}
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem asChild>
                                                        <Link to={`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}/preview/${d.idDokumen}`} viewTransition>
                                                            Baca
                                                            <DropdownMenuShortcut>
                                                                <EyeIcon />
                                                            </DropdownMenuShortcut>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild disabled={currentLoginIdUser !== d.idUser}>
                                                        <Link to={`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}/edit/${d.idDokumen}`} viewTransition>
                                                            Edit
                                                            <DropdownMenuShortcut>
                                                                {currentLoginIdUser !== d.idUser ? (
                                                                    <span className="text-red-600 text-xs">dilarang</span>
                                                                ) : (
                                                                    <PencilIcon />
                                                                )}
                                                            </DropdownMenuShortcut>
                                                        </Link>
                                                    </DropdownMenuItem>

                                                </DropdownMenuGroup>
                                                {params.tipeDokumen === "Knowledge" && (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuGroup>
                                                            <DropdownMenuItem disabled={d.statusBaca[0]?.isRead === false || d.kuis === null || d?.kuis?.kuisElement?.length < 10} onClick={() => handleMulaiKuis(d.idKuis)}>
                                                                Mulai Kuis
                                                                <DropdownMenuShortcut>
                                                                    {d.statusBaca[0]?.isRead === false ? (
                                                                        // <Badge variant={"destructive"} className="tracking-wider rounded-full">Baca dulu</Badge>
                                                                        <span className="text-red-600 ">Baca dulu</span>
                                                                    ) : (
                                                                        <>
                                                                            {d.kuis === null || d?.kuis?.kuisElement?.length < 10 ? (
                                                                                // <Badge variant={"destructive"} className="tracking-wider rounded-full">Belum dibuat</Badge>
                                                                                <span className="text-red-600 ">Belum dibuat</span>
                                                                            ) : (
                                                                                <NotebookPenIcon />
                                                                            )}
                                                                        </>
                                                                    )}

                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>

                                                        </DropdownMenuGroup>
                                                    </>
                                                )}

                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem variant="destructive" asChild disabled={currentLoginIdUser !== d.idUser}>
                                                        <Link to={`delete/${d.idDokumen}`} viewTransition>
                                                            Hapus
                                                            <DropdownMenuShortcut>
                                                                {currentLoginIdUser !== d.idUser ? (
                                                                    // <Badge variant={"destructive"} className="ml-auto tracking-wider rounded-full">Dilarang</Badge>
                                                                    <span className="text-red-600 ">dilarang</span>
                                                                ) : (
                                                                    <TrashIcon className="ml-auto text-red-600" />
                                                                )}
                                                            </DropdownMenuShortcut>


                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {/* <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} variant="destructive">
                                                        Hapus
                                                        <TrashIcon className="ml-auto" />
                                                    </DropdownMenuItem> */}
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <AlertDialogDeleteButton
                                            key={d.idDokumen}
                                            idDokumen={d.idDokumen}
                                            tipeDokumen={params.tipeDokumen}
                                            judul={d.judul}
                                            open={showDeleteDialog}
                                            onOpenChange={setShowDeleteDialog}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
                    </Table>
                </div>
            )}


        </div >
    )
}

function AlertDialogDeleteButton({
    idDokumen,
    tipeDokumen,
    judul,
    open,
    onOpenChange
}: {
    idDokumen: string,
    tipeDokumen: string,
    judul: string | null
    open: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const fetcher = useFetcher({ key: "delete_dokumen" })
    const isDeleting = fetcher.state !== "idle"

    // Tutup modal saat delete sukses
    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.success) {
            onOpenChange(false);
        }
    }, [fetcher.state, fetcher.data, onOpenChange]);



    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {/* <AlertDialog> */}
            {/* <AlertDialogTrigger asChild>
                <Button size={"icon"} className="cursor-pointer" variant={"destructive"} >
                    <TrashIcon />
                </Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin hapus {judul}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Menghapus tidak bisa dibatalkan. Ini akan menghapus permanen dokumen di server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
                        Batal
                    </AlertDialogCancel>
                    {/* ini submit ke action */}
                    <fetcher.Form method="post" action={`/${FIRST_SEGMENT}/dokumen/${tipeDokumen}/delete`}>
                        <input type="hidden" name="_action" value="delete" />
                        <input type="hidden" name="idDokumen" value={idDokumen} />
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                        </Button>
                    </fetcher.Form>
                    {/* <fetcher.Form method="post">
                        <Button
                            type="submit"
                            className="cursor-pointer"
                        >
                            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                        </Button>
                    </fetcher.Form> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function EmptyComp() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderXIcon />
                </EmptyMedia>
                <EmptyTitle>Belum Ada Dokumen</EmptyTitle>
                <EmptyDescription>
                    Belum ada yang upload dokumen. Mulailah dengan tambah dokumen di tombol pojok kanan atas
                    {/* You haven&apos;t created any projects yet. Get started by creating
                    your first project. */}
                </EmptyDescription>
            </EmptyHeader>
            {/* <EmptyContent>
                <div className="flex gap-2">
                    <Button>Create Project</Button>
                    <Button variant="outline">Import Project</Button>
                </div>
            </EmptyContent> */}
        </Empty>
    )
}