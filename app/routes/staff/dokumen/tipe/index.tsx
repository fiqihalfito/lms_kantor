import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types/index";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { ArrowUpRightIcon, FolderXIcon } from "lucide-react"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"
import { getAllDokumenByTipe } from "./_services";
import { Button } from "~/components/ui/button";
import { EyeIcon, FilePlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Link, Outlet, useFetcher } from "react-router";
import { formatTimestampId } from "~/lib/utils";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { userContext } from "~/lib/context";


export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)


    const dokumens = await getAllDokumenByTipe(user?.idSubBidang!, params.tipeDokumen)

    return { dokumens }
}




export default function DokumenIndex({ loaderData, params }: Route.ComponentProps) {

    const { dokumens } = loaderData

    const tipeMapping: Record<any, any> = {
        descPage: {
            "SOP": "Berisi dokumen SOP",
            "IK": "Berisi dokumen IK",
            "Knowledge": "Berisi dokumen Knowledge",
        },
    }



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
                                {(params.tipeDokumen === "IK" || params.tipeDokumen === "Knowledge") && <TableHead>Layanan</TableHead>}
                                {/* <TableHead>Tipe Dokumen</TableHead> */}
                                <TableHead>Uploaded By</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                                {/* <TableHead>Aksi</TableHead> */}
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dokumens.map((d, i) => (
                                <TableRow key={d.idDokumen}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{d.judul}</TableCell>
                                    {(params.tipeDokumen === "IK" || params.tipeDokumen === "Knowledge") && <TableCell>{d.layanan?.nama ?? "-"}</TableCell>}
                                    <TableCell>{d.user?.nama}</TableCell>
                                    <TableCell>{formatTimestampId(d.createdAt, { withZoneLabel: true })}</TableCell>
                                    <TableCell>{d.updatedAt ? formatTimestampId(d.updatedAt, { withZoneLabel: true }) : "-"}</TableCell>
                                    {/* <TableCell>{d.createdAt}</TableCell> */}
                                    {/* <TableCell>{d.subBidang?.nama}</TableCell> */}
                                    <TableCell className="text-right space-x-1.5">
                                        <Link to={`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}/preview/${d.idDokumen}`} viewTransition>
                                            <Button size={"icon"} className="cursor-pointer" >
                                                <EyeIcon />
                                            </Button>
                                        </Link>

                                        <Link to={`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}/edit/${d.idDokumen}`} viewTransition>
                                            <Button size={"icon"} className="cursor-pointer" >
                                                <PencilIcon />
                                            </Button>
                                        </Link>

                                        <AlertDialogDeleteButton idDokumen={d.idDokumen} tipeDokumen={params.tipeDokumen} />
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
    tipeDokumen
}: {
    idDokumen: string,
    tipeDokumen: string
}) {

    const fetcher = useFetcher({ key: "delete_dokumen" })

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
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
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