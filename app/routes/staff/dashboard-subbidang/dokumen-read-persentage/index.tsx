import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { getAllTeam, getDokumenAndStatusRead, getJumlahOrang } from "./_service";
import { userContext } from "~/lib/context";
import { TableWrapper } from "~/components/table-wrapper";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { Button } from "~/components/ui/button";
import { Form, NavLink, Outlet, useSearchParams, useSubmit } from "react-router";
import type { TIPE_DOKUMEN } from "~/lib/constants";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Field, FieldLabel } from "~/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { BadgeXIcon, CircleSlashIcon, FunnelIcon, ListRestartIcon, SearchIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Spinner } from "~/components/ui/spinner";
import { Progress } from "~/components/ui/progress";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/components/ui/input-group";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Filter } from "./_components/filter";
import { Search } from "./_components/search";



export async function loader({ request, params, context }: Route.LoaderArgs) {

    // user
    const user = context.get(userContext)

    // filters
    const url = new URL(request.url)
    const tipeDokumen = params.tipe as TIPE_DOKUMEN
    const team = url.searchParams.get("team")
    const search = url.searchParams.get("search")

    const activeFilter = {
        tipeDokumen: tipeDokumen ?? undefined,
        team: team ?? undefined,
        search: search
    }
    const dokumenDanStatusRead = await getDokumenAndStatusRead(user?.idSubBidang!, {
        idTeam: activeFilter.team,
        tipe: activeFilter.tipeDokumen,
        search: activeFilter.search
    })

    // masterdata
    const teams = await getAllTeam(user?.idSubBidang!)
    const jumlahOrang = await getJumlahOrang(user?.idSubBidang!)

    const masterData = {
        teams: teams,
        jumlahOrang
    }


    return { dokumenDanStatusRead, masterData, activeFilter }
}




export default function DokumenReadPersentage({ loaderData, params }: Route.ComponentProps) {

    const { dokumenDanStatusRead, activeFilter, masterData } = loaderData
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false)

    // filter
    const tipeDokumenOptions: TIPE_DOKUMEN[] = ["SOP", "IK", "Knowledge"]

    // const submit = useSubmit()
    // const handleFilterSubmit = () => {
    //     // ambil hanya field yang punya nilai
    //     const nonEmptyFilter = Object.fromEntries(
    //         Object.entries(filter).filter(([_, value]) => value !== "")
    //     );

    //     submit(nonEmptyFilter, {
    //         method: "GET"
    //     })

    //     setFilterOpen(false)
    // }

    useEffect(() => {
        const searchField = document.getElementById("search");
        if (searchField instanceof HTMLInputElement) {
            searchField.value = activeFilter.search || "";
        }
    }, [activeFilter.search])


    type MapTipeDokumen = {
        [key in TIPE_DOKUMEN]: {
            title: string,
            desc: string,
            persentageTitleCard: string
        };
    };
    const mapTipeDokumen: MapTipeDokumen = {
        SOP: {
            title: "Persentase Dokumen SOP Telah Dibaca",
            desc: "jumlah anggota yang telah membaca dokumen SOP",
            persentageTitleCard: "Persentase Total Membaca Dokumen SOP"
        },
        IK: {
            title: "Persentase Dokumen IK Telah Dibaca",
            desc: "jumlah anggota yang telah membaca dokumen IK",
            persentageTitleCard: "Persentase Total Membaca Dokumen IK"
        },
        Knowledge: {
            title: "Persentase Dokumen Knowledge Telah Dibaca",
            desc: "jumlah anggota yang telah membaca dokumen Knowledge",
            persentageTitleCard: "Persentase Total Membaca Dokumen Knowledge"
        }
    }

    function getPersentageReader(totalPembaca: number, jumlahOrang: number) {
        if (jumlahOrang === 0) return 0 // hindari division by zero
        return (totalPembaca / jumlahOrang) * 100
    }

    const persentasePembacaSemuaDokumen = () => {
        if (dokumenDanStatusRead.length === 0) {
            return 0
        }
        const jumlah = dokumenDanStatusRead.reduce((total, item) => {
            return total + getPersentageReader(item.statusBaca.length, masterData.jumlahOrang)
        }, 0) / dokumenDanStatusRead.length
        return jumlah
    }

    // console.log("dokumenDanStatusRead.length", dokumenDanStatusRead.length);


    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="grid grid-cols-2 items-center">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">{mapTipeDokumen[params.tipe as TIPE_DOKUMEN].title}</h1>
                    <p className="text-muted-foreground">{mapTipeDokumen[params.tipe as TIPE_DOKUMEN].desc} </p>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardDescription>{mapTipeDokumen[params.tipe as TIPE_DOKUMEN].persentageTitleCard}</CardDescription>
                            <CardTitle className="text-4xl tabular-nums flex items-center gap-x-8">
                                <span>{persentasePembacaSemuaDokumen().toFixed(2)}%</span>
                                <Progress value={persentasePembacaSemuaDokumen()} className="h-4" />

                            </CardTitle>
                            {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                    </Card>
                </div>
            </div>
            <Separator />

            {/* Filtering */}
            <div className="flex items-center gap-x-2">

                <Search search={activeFilter.search} />
                {params.tipe !== "SOP" && <Filter activeFilter={activeFilter} teams={masterData.teams} />}

            </div>


            {dokumenDanStatusRead.length > 0 ? (
                <div className="flex gap-x-8 items-start">
                    <TableWrapper className="flex-1">
                        <Table>
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">No</TableHead>
                                    <TableHead>Judul Dokumen</TableHead>
                                    <TableHead>Tipe Dokumen</TableHead>
                                    {params.tipe !== "SOP" && <TableHead>Team</TableHead>}
                                    <TableHead>Telah dibaca</TableHead>
                                    <TableHead>Persentase Baca</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dokumenDanStatusRead.map((dok, i) => (
                                    <TableRow key={dok.idDokumen} className={cn(params.idDokumen === dok.idDokumen && "bg-yellow-200 hover:bg-yellow-200")}>
                                        <TableCell className="font-medium">{i + 1}</TableCell>
                                        <TableCell>{dok.judul}</TableCell>
                                        <TableCell>{dok.tipe}</TableCell>
                                        {params.tipe !== "SOP" && <TableCell>{dok.team?.nama}</TableCell>}
                                        <TableCell>{dok.statusBaca.length} orang / {masterData.jumlahOrang} orang </TableCell>
                                        <TableCell className="flex flex-col gap-1">
                                            <span className="font-medium text-sm">{getPersentageReader(dok.statusBaca.length, masterData.jumlahOrang).toFixed(2)}%</span>
                                            <Progress value={getPersentageReader(dok.statusBaca.length, masterData.jumlahOrang)} className="h-2.5" />
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <Button asChild size={"sm"}>
                                                <NavLink key={dok.idDokumen} to={`${dok.idDokumen}/jumlah-orang-baca`}>
                                                    {({ isPending }) => (
                                                        <>
                                                            {isPending && <Spinner />}
                                                            Lihat Jumlah Orang Baca
                                                        </>
                                                    )}
                                                </NavLink>
                                            </Button>
                                        </TableCell>
                                        {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
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
                    </TableWrapper>

                    <Outlet />
                </div>
            ) : (
                <EmptySearch />
            )}

            {/* Table ==================================================== */}

        </div>
    )
}

function EmptySearch() {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CircleSlashIcon />
                </EmptyMedia>
                <EmptyTitle>Dokumen Tidak Ditemukan</EmptyTitle>
                <EmptyDescription>
                    Harap cari dokumen lain
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" size="sm" onClick={() => setSearchParams({})}>
                    <ListRestartIcon />
                    Reset
                </Button>
            </EmptyContent>
        </Empty>
    )
}