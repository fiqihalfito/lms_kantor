import { data, Link, Outlet, useFetcher } from "react-router";
import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";
import { Grid2X2PlusIcon, OctagonXIcon, PencilIcon, TrashIcon, UserPlusIcon } from "lucide-react";
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
import { getAllUser } from "./_service";
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
import { MyAlert } from "~/components/alert-custom";
import { getToast } from "remix-toast";
import { useToastEffect } from "~/hooks/use-toast";

export async function loader({ request, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const users = await getAllUser(user?.idSubBidang!)

    const { headers, toast } = await getToast(request)
    return data({ users, toast }, { headers })
}

export default function UserMaster({ loaderData }: Route.ComponentProps) {

    const { users, toast } = loaderData

    useToastEffect(toast)

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">User</h1>
                    <p className="text-muted-foreground">List user</p>
                </div>
                <Link to={`new`}>
                    <Button className="cursor-pointer" size={"lg"} >
                        <UserPlusIcon className="size-5" />
                        Tambah User
                    </Button>
                </Link>
            </div>

            <Separator />

            <Outlet />


            {users.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Users" />
            ) : (
                <TableWrapper className="w-2/3">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Nama User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((item, i) => (
                                <TableRow key={item.idUser}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{item.nama}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell className="text-right space-x-1.5">

                                        <Link to={`edit/${item.idUser}`} viewTransition>
                                            <Button size={"icon"} className="cursor-pointer" >
                                                <PencilIcon />
                                            </Button>
                                        </Link>

                                        <AlertDialogDeleteButton idUser={item.idUser} nama={item.nama!} />
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
    idUser,
    nama
}: {
    idUser: string,
    nama: string
}) {

    const fetcher = useFetcher({ key: "delete_user" })

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
                    <AlertDialogTitle>Apakah Anda yakin menghapus user [{nama}]?</AlertDialogTitle>
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
                        <input type="hidden" name="idUser" value={idUser} />
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

