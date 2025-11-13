import { data, Link, Outlet, useFetcher } from "react-router";
import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";
import { CircleFadingPlusIcon, Grid2X2PlusIcon, OctagonXIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
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
import { getTeamAndSkill } from "./_service";
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
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "~/components/ui/item";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    // filter
    const url = new URL(request.url)
    const filterTeam = url.searchParams.get("team")
    const teamAndSkill = await getTeamAndSkill(user?.idSubBidang!, filterTeam)

    // masterFilter
    const listTeam = await getListTeam(user?.idSubBidang!)

    const { headers, flashData } = await getFlashSession(request)
    return data({ teamAndSkill, flashData, listTeam, filterTeam }, { headers })
}

export default function SkillMaster({ loaderData }: Route.ComponentProps) {

    const { teamAndSkill, listTeam, flashData, filterTeam } = loaderData



    // return (
    //     <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
    //         <div className="flex items-center justify-between">
    //             <div className="space-y-0.5">
    //                 <h1 className="text-3xl font-semibold tracking-tight">Skill</h1>
    //                 <p className="text-muted-foreground">List skill</p>
    //             </div>
    //             <Link to={`new`} viewTransition>
    //                 <Button className="cursor-pointer" size={"lg"} >
    //                     <CircleFadingPlusIcon className="size-5" />
    //                     Tambah Skill
    //                 </Button>
    //             </Link>
    //         </div>

    //         <Separator />

    //         <Outlet />

    //         {flashData ? <MyAlert title={flashData.message} status={flashData.type} className="w-1/2" /> : null}

    //         {skills.length === 0 ? (
    //             <EmptyMaster Icon={OctagonXIcon} title="Skill" />
    //         ) : (
    //             <div className="flex flex-col gap-2">
    //                 <div>
    //                     <FilterSkill listTeam={listTeam} currentFilterTeam={filterTeam} />
    //                 </div>
    //                 <TableWrapper className="w-1/2">
    //                     <Table>
    //                         {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    //                         <TableHeader>
    //                             <TableRow>
    //                                 <TableHead className="w-[100px]">No</TableHead>
    //                                 <TableHead>Nama Skill</TableHead>
    //                                 <TableHead>Subskill</TableHead>
    //                                 <TableHead>Team</TableHead>
    //                                 <TableHead className="text-right">Aksi</TableHead>
    //                             </TableRow>
    //                         </TableHeader>
    //                         <TableBody>
    //                             {skills.map((item, i) => (
    //                                 <TableRow key={item.idSkill}>
    //                                     <TableCell className="font-medium">{i + 1}</TableCell>
    //                                     <TableCell>{item.namaSkill}</TableCell>
    //                                     <TableCell>{item.namaSkill}</TableCell>
    //                                     <TableCell>{item.team?.nama}</TableCell>
    //                                     <TableCell className="text-right space-x-1.5">

    //                                         <Link to={`edit/${item.idSkill}`} viewTransition>
    //                                             <Button size={"icon"} className="cursor-pointer" >
    //                                                 <PencilIcon />
    //                                             </Button>
    //                                         </Link>

    //                                         <AlertDialogDeleteButton idSkill={item.idSkill} nama={item.namaSkill!} />
    //                                     </TableCell>
    //                                 </TableRow>
    //                             ))}

    //                         </TableBody>
    //                     </Table>
    //                 </TableWrapper>
    //             </div>
    //         )}

    //     </div >
    // )

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

            {teamAndSkill.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Skill" />
            ) : (
                <div className="flex flex-col gap-2">
                    <div>
                        <FilterSkill listTeam={listTeam} currentFilterTeam={filterTeam} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {teamAndSkill.map((t, i) => (
                            <div className="p-4 border rounded-md shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xs text-muted-foreground">Team</h2>
                                        <h1 className="font-semibold text-lg ">{t.nama}</h1>
                                    </div>
                                    <Button className="cursor-pointer" size={"sm"} variant={"outline"} asChild >
                                        <Link to={`new`} viewTransition>
                                            <CircleFadingPlusIcon className="size-5" />
                                            Tambah Skill
                                        </Link>
                                    </Button>
                                </div>
                                {t.skill.length === 0 ? (
                                    <EmptyList text="Belum ada skill" />
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {t.skill.map((s, i) => (
                                            <div className="px-4 py-4 border rounded-sm shadow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xs text-muted-foreground">Skill</h3>
                                                        <h2 className="font-medium">{s.namaSkill}</h2>
                                                    </div>
                                                    <div className="flex items-center gap-x-1.5">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button size={"icon-sm"} variant={"outline"}>
                                                                    <CircleFadingPlusIcon className="size-5" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Tambah SubSkill</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button size={"icon-sm"} variant={"outline"} className="cursor-pointer" asChild >
                                                                    <Link to={``} viewTransition>
                                                                        <PencilIcon />
                                                                    </Link>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit Skill</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button size={"icon-sm"} variant={"destructive"} className="cursor-pointer" asChild >
                                                                    <Link to={``} viewTransition>
                                                                        <TrashIcon />
                                                                    </Link>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Hapus SubSkill</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>

                                                </div>
                                                {s.subSkill.length === 0 ? (
                                                    <EmptyList text="Belum ada subskill" />
                                                ) : (
                                                    <div className="flex flex-col gap-2">
                                                        {s.subSkill.map((ss, i) => (
                                                            <div className="border rounded-sm px-2 py-2 text-sm flex items-center justify-between">
                                                                <span className="ml-2">{ss.namaSubSkill}</span>
                                                                <div className="flex items-center gap-x-1.5">
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button size={"icon-sm"} variant={"outline"} className="cursor-pointer" asChild >
                                                                                <Link to={``} viewTransition>
                                                                                    <PencilIcon />
                                                                                </Link>
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>Edit SubSkill</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Button size={"icon-sm"} variant={"destructive"} className="cursor-pointer" asChild >
                                                                                <Link to={``} viewTransition>
                                                                                    <TrashIcon />
                                                                                </Link>
                                                                            </Button>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>Hapus SubSkill</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            )
            }



        </div >
    )
}

function EmptyList({ text }: { text: string }) {
    return (
        <p className="text-muted-foreground text-sm">{text}</p>
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

