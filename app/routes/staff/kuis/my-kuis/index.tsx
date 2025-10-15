import { Link } from "react-router";
import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";
import { EyeIcon, OctagonXIcon, UserPlusIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { getDokumenUploadBySelf } from "./_service";
import { userContext } from "~/lib/context";
import { EmptyMaster } from "~/components/empty-master";
import { TableWrapper } from "~/components/table-wrapper";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const dokumens = await getDokumenUploadBySelf(user?.idUser!)

    return { dokumens }
}

export default function MyKuis({ loaderData }: Route.ComponentProps) {

    const { dokumens } = loaderData

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Pembuatan Kuis</h1>
                    <p className="text-muted-foreground">Kuis dari dokumen yang Anda upload</p>
                </div>
                <Link to={`new`}>
                    <Button className="cursor-pointer" size={"lg"} >
                        <UserPlusIcon className="size-5" />
                        Tambah Kuis
                    </Button>
                </Link>
            </div>

            <Separator />

            {/* {flashData ? <MyAlert title={flashData.message} status={flashData.type} className="w-2/3" /> : null} */}

            {dokumens.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Dokumen Kuis" />
            ) : (
                <TableWrapper className="w-2/3">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Judul Dokumen</TableHead>
                                <TableHead>Filename</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Layanan</TableHead>
                                <TableHead>Uploaded By</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dokumens.map((item, i) => (
                                <TableRow key={item.idDokumen}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{item.judul}</TableCell>
                                    <TableCell>{item.filename}</TableCell>
                                    <TableCell>{item.tipe}</TableCell>
                                    <TableCell>{item.layanan?.nama ?? "-"}</TableCell>
                                    <TableCell>{item.user?.nama}</TableCell>
                                    <TableCell className="text-right space-x-1.5">

                                        <Link to={`preview/${item.filename}`} viewTransition>
                                            <Button size={"icon"} className="cursor-pointer" >
                                                <EyeIcon />
                                            </Button>
                                        </Link>
                                        {/* <Link to={`edit/${item.idUser}`} viewTransition>
                                            <Button size={"icon"} className="cursor-pointer" >
                                                <PencilIcon />
                                            </Button>
                                        </Link>

                                        <AlertDialogDeleteButton idUser={item.idUser} nama={item.nama!} /> */}
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