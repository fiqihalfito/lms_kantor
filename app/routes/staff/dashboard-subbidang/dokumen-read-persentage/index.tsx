import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { getAllTeam, getDokumenAndStatusRead } from "./_service";
import { userContext } from "~/lib/context";
import { TableWrapper } from "~/components/table-wrapper";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Form, NavLink, Outlet, useSearchParams, useSubmit } from "react-router";
import type { TIPE_DOKUMEN } from "~/lib/constants";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Field, FieldLabel } from "~/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { BadgeXIcon, BrushCleaningIcon, EraserIcon, FunnelIcon, XCircleIcon, XIcon } from "lucide-react";
import { cn, toTitleCaseUniversal, wait } from "~/lib/utils";
import { Spinner } from "~/components/ui/spinner";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // await wait(3000)
    const user = context.get(userContext)

    // filters
    const url = new URL(request.url)
    // const tipeDokumen = url.searchParams.get("tipeDokumen") as TIPE_DOKUMEN | null
    const tipeDokumen = params.tipe as TIPE_DOKUMEN
    const team = url.searchParams.get("team")
    const activeFilter = {
        tipeDokumen: tipeDokumen ?? undefined,
        team: team
    }
    const dokumenDanStatusRead = await getDokumenAndStatusRead(user?.idSubBidang!, {
        idTeam: activeFilter.team,
        tipe: activeFilter.tipeDokumen
    })

    // masterdata
    const teams = await getAllTeam(user?.idSubBidang!)

    const masterData = {
        teams: teams
    }


    return { dokumenDanStatusRead, masterData, activeFilter }
}


export default function DokumenReadPersentage({ loaderData, params }: Route.ComponentProps) {

    const { dokumenDanStatusRead, activeFilter, masterData } = loaderData
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false)

    // filter
    const tipeDokumenOptions: TIPE_DOKUMEN[] = ["SOP", "IK", "Knowledge"]

    // controller filter
    // const [filterTipe, setFilterTipe] = useState<TIPE_DOKUMEN | null>(activeFilter.tipe)
    const [filter, setFilter] = useState({
        // tipeDokumen: activeFilter.tipeDokumen ?? "",
        team: activeFilter.team ?? ""
    })

    const handleReset = () => {
        setFilter({
            // tipeDokumen: "",
            team: ""
        })

        setSearchParams({})
    }

    // handler umum
    const handleChange = (key: string, value: string) => {
        setFilter(prev => ({ ...prev, [key]: value }))
    }

    const submit = useSubmit()
    const handleFilterSubmit = () => {
        // ambil hanya field yang punya nilai
        const nonEmptyFilter = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== "")
        );

        submit(nonEmptyFilter, {
            method: "GET"
        })

        setFilterOpen(false)
    }

    // const filteredActiveFilter = Object.entries(activeFilter).filter(([key, value], i) => {
    //     return value !== null && value !== "";
    // })


    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Persentase Dokumen Telah Dibaca</h1>
                    <p className="text-muted-foreground">jumlah anggota yang telah membaca dokumen </p>
                </div>
            </div>
            <Separator />

            <div className="flex items-center gap-x-2">

                <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                    <PopoverTrigger asChild>
                        <Button>
                            <FunnelIcon />
                            Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-medium text-sm text-muted-foreground">Filter Pencarian</h2>
                            <Button
                                type="button"
                                size={"sm"}
                                variant={"outline"}
                                className="border-dashed"
                                onClick={handleReset}
                            >
                                <BadgeXIcon />
                                Reset
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                {/* <Field>
                                    <FieldLabel htmlFor="tipeDokumen">
                                        Tipe Dokumen
                                    </FieldLabel>
                                    <Select
                                        value={filter.tipeDokumen}
                                        onValueChange={(val: TIPE_DOKUMEN) => handleChange("tipeDokumen", val)}
                                    >
                                        <SelectTrigger id="tipeDokumen">
                                            <SelectValue placeholder="Tipe Dokumen" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            {tipeDokumenOptions.map((tipedok, i) => (
                                                <SelectItem key={tipedok} value={tipedok}>
                                                    {tipedok}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field> */}
                                <Field>
                                    <FieldLabel htmlFor="team">
                                        Team
                                    </FieldLabel>
                                    <Select
                                        value={filter.team}
                                        onValueChange={(val: TIPE_DOKUMEN) => handleChange("team", val)}
                                    >
                                        <SelectTrigger id="team">
                                            <SelectValue placeholder="team" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            {masterData.teams.map((team, i) => (
                                                <SelectItem key={team.idTeam} value={team.idTeam}>
                                                    {team.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={handleFilterSubmit}
                                >
                                    Filter
                                </Button>
                            </div>
                        </div>

                    </PopoverContent>
                </Popover>
                {/* {filteredActiveFilter.length > 0 && (
                    <>
                        {filteredActiveFilter.map(([key, value], i) => (
                            <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                                {toTitleCaseUniversal(key)}
                                <Separator orientation="vertical" className="mx-2" />
                                <Badge variant={"default"}>
                                    {value}
                                </Badge>
                            </Button>
                        ))}
                    </>
                )} */}

                {/* Filter Result ====================== */}
                {activeFilter.tipeDokumen && (
                    <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                        Tipe Dokumen
                        <Separator orientation="vertical" className="mx-2" />
                        <Badge variant={"default"}>
                            {activeFilter.tipeDokumen}
                        </Badge>
                    </Button>
                )}
                {activeFilter.team && (
                    <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                        Team
                        <Separator orientation="vertical" className="mx-2" />
                        <Badge variant={"default"}>
                            {masterData.teams.find(team => team.idTeam === activeFilter.team)?.nama}
                        </Badge>
                    </Button>
                )}
            </div>


            <div className="flex gap-x-4 items-start">
                <TableWrapper className="flex-1">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Judul Dokumen</TableHead>
                                <TableHead>Tipe Dokumen</TableHead>
                                {params.tipe !== "SOP" && <TableHead>Team</TableHead>}
                                <TableHead>telah dibaca</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dokumenDanStatusRead.map((dok, i) => (
                                <TableRow key={dok.idDokumen} className={cn(params.idDokumen === dok.idDokumen && "bg-slate-200 hover:bg-slate-200")}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{dok.judul}</TableCell>
                                    <TableCell>{dok.tipe}</TableCell>
                                    <TableCell>{dok.statusBaca.length} orang </TableCell>
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
            {/* Table ==================================================== */}

        </div>
    )
}