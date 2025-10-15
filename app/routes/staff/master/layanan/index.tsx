import { data, Link, Outlet, useFetcher } from "react-router";
import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";
import { Grid2X2PlusIcon, OctagonXIcon, PencilIcon, TrashIcon } from "lucide-react";
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
import { getAllLayanan } from "./_service";
import { userContext } from "~/lib/context";
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
import { getFlashSession } from "~/lib/session.server";
import { MyAlert } from "~/components/alert-custom";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const layanans = await getAllLayanan(user?.idSubBidang!)

    const { headers, flashData } = await getFlashSession(request)
    return data({ layanans, flashData }, { headers })
}

export default function LayananMaster({ loaderData }: Route.ComponentProps) {

    const { layanans, flashData } = loaderData



    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Layanan</h1>
                    <p className="text-muted-foreground">List Layanan</p>
                </div>
                <Link to={`new`}>
                    <Button className="cursor-pointer" size={"lg"} >
                        <Grid2X2PlusIcon className="size-5" />
                        Tambah Layanan
                    </Button>
                </Link>
            </div>

            <Separator />

            <Outlet />

            {flashData ? <MyAlert title={flashData.message} status={flashData.type} className="w-1/2" /> : null}

            {layanans.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Layanan" />
            ) : (
                <TableWrapper className="w-1/2">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Nama Layanan</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {layanans.map((item, i) => (
                                <TableRow key={item.idLayanan}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{item.nama}</TableCell>
                                    <TableCell className="text-right space-x-1.5">

                                        <Link to={`edit/${item.idLayanan}`} viewTransition>
                                            <Button size={"icon"} className="cursor-pointer" >
                                                <PencilIcon />
                                            </Button>
                                        </Link>

                                        <AlertDialogDeleteButton idLayanan={item.idLayanan} nama={item.nama!} />
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
    idLayanan,
    nama
}: {
    idLayanan: string,
    nama: string
}) {

    const fetcher = useFetcher({ key: "delete_layanan" })

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
                    <AlertDialogTitle>Apakah Anda yakin menghapus layanan {nama}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Menghapus tidak bisa dibatalkan. Ini akan menghapus permanen layanan di server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
                        Batal
                    </AlertDialogCancel>
                    {/* ini submit ke action */}
                    <fetcher.Form method="post" action={`delete`}>
                        <input type="hidden" name="_action" value="delete" />
                        <input type="hidden" name="idLayanan" value={idLayanan} />
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

