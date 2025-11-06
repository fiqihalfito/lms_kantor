import { data, Link, Outlet, useFetcher } from "react-router";
import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";
import { CircleFadingPlusIcon, Grid2X2PlusIcon, OctagonXIcon, PencilIcon, TrashIcon } from "lucide-react";
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
import { getAllSkill } from "./_service";
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
import { getListTeam } from "./new/_service";
import { FilterSkill } from "./_components/filter-skill";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    // filter
    const url = new URL(request.url)
    const filterTeam = url.searchParams.get("team")
    const skills = await getAllSkill(user?.idSubBidang!, filterTeam)

    // masterFilter
    const listTeam = await getListTeam(user?.idSubBidang!)

    const { headers, flashData } = await getFlashSession(request)
    return data({ skills, flashData, listTeam, filterTeam }, { headers })
}

export default function SkillMaster({ loaderData }: Route.ComponentProps) {

    const { skills, listTeam, flashData, filterTeam } = loaderData



    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Skill</h1>
                    <p className="text-muted-foreground">List skill</p>
                </div>
                <Link to={`new`} viewTransition>
                    <Button className="cursor-pointer" size={"lg"} >
                        <CircleFadingPlusIcon className="size-5" />
                        Tambah Skill
                    </Button>
                </Link>
            </div>

            <Separator />

            <Outlet />

            {flashData ? <MyAlert title={flashData.message} status={flashData.type} className="w-1/2" /> : null}

            {skills.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Skill" />
            ) : (
                <div className="flex flex-col gap-2">
                    <div>
                        <FilterSkill listTeam={listTeam} currentFilterTeam={filterTeam} />
                    </div>
                    <TableWrapper className="w-1/2">
                        <Table>
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">No</TableHead>
                                    <TableHead>Nama Skill</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {skills.map((item, i) => (
                                    <TableRow key={item.idSkill}>
                                        <TableCell className="font-medium">{i + 1}</TableCell>
                                        <TableCell>{item.namaSkill}</TableCell>
                                        <TableCell>{item.team?.nama}</TableCell>
                                        <TableCell className="text-right space-x-1.5">

                                            <Link to={`edit/${item.idSkill}`} viewTransition>
                                                <Button size={"icon"} className="cursor-pointer" >
                                                    <PencilIcon />
                                                </Button>
                                            </Link>

                                            <AlertDialogDeleteButton idSkill={item.idSkill} nama={item.namaSkill!} />
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableWrapper>
                </div>
            )}

        </div >
    )
}

function AlertDialogDeleteButton({
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
                        <input type="hidden" name="idSkill" value={idSkill} />
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

