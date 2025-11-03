import { userContext } from "~/lib/context";
import type { Route } from "./+types";
import { getJumlahDokumen, getTeamAndMember } from "./_service";
import { Separator } from "~/components/ui/separator";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { NavLink, Outlet } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    // currentSubbidang
    const currentSubbidang = user?.namaSubbidang!
    // total tim dan anggota
    const teamAndMember = await getTeamAndMember(user?.idSubBidang!)
    // jumlah dokumen
    const jumlahDokumen = await getJumlahDokumen(user?.idSubBidang!)

    return { currentSubbidang, teamAndMember, jumlahDokumen }
}

export default function DashboardSubbidang({ loaderData }: Route.ComponentProps) {

    const { currentSubbidang, teamAndMember, jumlahDokumen } = loaderData
    const totalMembers = teamAndMember.reduce((total, team) => {
        // Add the number of members in the current team to the total
        return total + team.members.length;
    }, 0); // Start the initial total at 0

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Dashboard Subbidang</h1>
                    <p className="text-muted-foreground">Subbidang {currentSubbidang}</p>
                </div>
            </div>
            <Separator />

            {/* <Outlet /> */}

            <div className="flex flex-col gap-4">

                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Jumlah dokumen terupload</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">{jumlahDokumen}</CardTitle>
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                    <NavLink to={"dokumen-read-persentage"}>
                        <Card>
                            <CardHeader>
                                <CardDescription>Persentase Membaca Dokumen</CardDescription>
                                <CardTitle className="text-4xl tabular-nums">50.5%</CardTitle>
                                {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                        </Card>
                    </NavLink>

                    <Card>
                        <CardHeader>
                            <CardDescription>Persentase Selesai Kuis</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">50.5%</CardTitle>
                            {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                </div>

                {/* baris 2 */}
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Jumlah dokumen SOP</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">{jumlahDokumen}</CardTitle>
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                    <NavLink to={"dokumen-read-persentage/tipe/SOP"}>
                        <Card>
                            <CardHeader>
                                <CardDescription>Persentase Membaca Dokumen SOP</CardDescription>
                                <CardTitle className="text-4xl tabular-nums">50.5%</CardTitle>
                                {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                        </Card>
                    </NavLink>

                    <Card>
                        <CardHeader>
                            <CardDescription>Persentase Selesai Kuis</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">50.5%</CardTitle>
                            {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                </div>

                <div className="border shadow rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-base font-semibold">Team {currentSubbidang}</h1>
                        <div className="space-x-1.5">
                            <Badge className=" rounded-full text-sm">
                                {totalMembers} Anggota
                            </Badge>
                            <Badge className=" rounded-full text-sm">
                                {teamAndMember.length} Team
                            </Badge>
                        </div>


                    </div>
                    <div className={
                        cn("grid", `grid-cols-${teamAndMember.length} gap-4`)
                    }>
                        {teamAndMember.map((tim, i) => (
                            <Card key={tim.idTeam}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>{tim.nama}</CardTitle>
                                        <Badge className=" rounded-full ">
                                            {tim.members.length} Anggota
                                        </Badge>
                                    </div>

                                    {/* <CardDescription>Card Description</CardDescription> */}
                                    {/* <CardAction>Card Action</CardAction> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1.5">
                                        {tim.members.map((member, i) => (
                                            <Item variant="outline" size="sm" key={member.idMemberTeam}>
                                                <ItemMedia variant={"icon"}>
                                                    {/* <BadgeCheckIcon className="size-5" /> */}
                                                    {i + 1}
                                                </ItemMedia>
                                                <ItemContent>
                                                    <ItemTitle>{member.user?.nama}</ItemTitle>
                                                </ItemContent>
                                                {/* <ItemActions>
                                                    <ChevronRightIcon className="size-4" />
                                                </ItemActions> */}
                                            </Item>
                                        ))}
                                    </div>

                                </CardContent>
                                {/* <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter> */}
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}