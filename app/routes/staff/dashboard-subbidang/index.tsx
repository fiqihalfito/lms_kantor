import { userContext } from "~/lib/context";
import type { Route } from "./+types";
import { getAllSkill, getDokumenAndStatusReadCount, getJumlahDokumen, getTeamAndMember } from "./_service";
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
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { NavLink, Outlet } from "react-router";
import type { TIPE_DOKUMEN } from "~/lib/constants";
// import { ChevronRightIcon } from "lucide-react";
import { SkillUser } from "./_components/skill-user";
import { Button } from "~/components/ui/button";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    // currentSubbidang
    const currentSubbidang = user?.namaSubbidang!
    // total tim dan anggota
    const teamAndMember = await getTeamAndMember(user?.idSubBidang!)

    // skill    
    const skill = await getAllSkill(user.idSubBidang)

    // jumlah dokumen
    const jumlahDokumen = {
        SOP: await getJumlahDokumen(user?.idSubBidang!, "SOP"),
        IK: await getJumlahDokumen(user?.idSubBidang!, "IK"),
        Knowledge: await getJumlahDokumen(user?.idSubBidang!, "Knowledge"),
    }

    const jumlahPembaca = {
        SOP: await getDokumenAndStatusReadCount(user?.idSubBidang!, "SOP"),
        IK: await getDokumenAndStatusReadCount(user?.idSubBidang!, "IK"),
        Knowledge: await getDokumenAndStatusReadCount(user?.idSubBidang!, "Knowledge")

    }









    return { currentSubbidang, teamAndMember, jumlahDokumen, jumlahPembaca, skill }
}

export default function DashboardSubbidang({ loaderData }: Route.ComponentProps) {

    const { currentSubbidang, teamAndMember, jumlahDokumen, jumlahPembaca, skill } = loaderData
    const totalMembers = teamAndMember.reduce((total, team) => {
        // Add the number of members in the current team to the total
        return total + team.user.length;
    }, 0); // Start the initial total at 0


    function getPersentageReader(totalPembaca: number, jumlahOrang: number) {
        if (jumlahOrang === 0) return 0 // hindari division by zero
        return (totalPembaca / jumlahOrang) * 100
    }

    const persentasePembacaSemuaDokumen = (tipe: TIPE_DOKUMEN) => {
        if (jumlahPembaca[tipe].length === 0) {
            return 0
        }
        const jumlah = jumlahPembaca[tipe].reduce((total, item) => {
            return total + getPersentageReader(item.jumlahDibaca, totalMembers)
        }, 0) / jumlahPembaca[tipe].length
        return jumlah
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Dashboard Subbidang</h1>
                    <p className="text-muted-foreground">Subbidang {currentSubbidang}</p>
                </div>
            </div>
            <Separator />

            <Outlet />

            <div className="flex flex-col gap-4">

                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Jumlah dokumen SOP</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">{jumlahDokumen.SOP}</CardTitle>
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Jumlah dokumen IK</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">{jumlahDokumen.IK}</CardTitle>
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Jumlah dokumen Knowledge</CardDescription>
                            <CardTitle className="text-4xl tabular-nums">{jumlahDokumen.Knowledge}</CardTitle>
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                    </Card>
                </div>

                {/* baris 2 */}
                <div className="grid grid-cols-3 gap-4">
                    <NavLink to={"dokumen-read-persentage/tipe/SOP"} viewTransition>
                        <Card>
                            <CardHeader>
                                <CardDescription>Persentase Membaca Dokumen SOP</CardDescription>
                                <CardTitle className="text-4xl tabular-nums">{persentasePembacaSemuaDokumen("SOP").toFixed(2)}%</CardTitle>
                                {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                        </Card>
                    </NavLink>
                    <NavLink to={"dokumen-read-persentage/tipe/IK"} viewTransition>
                        <Card>
                            <CardHeader>
                                <CardDescription>Persentase Membaca Dokumen IK</CardDescription>
                                <CardTitle className="text-4xl tabular-nums">{persentasePembacaSemuaDokumen("IK").toFixed(2)}%</CardTitle>
                                {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                        </Card>
                    </NavLink>

                    <NavLink to={"dokumen-read-persentage/tipe/Knowledge"} viewTransition>
                        <Card>
                            <CardHeader>
                                <CardDescription>Persentase Membaca Dokumen Knowledge</CardDescription>
                                <CardTitle className="text-4xl tabular-nums">{persentasePembacaSemuaDokumen("Knowledge").toFixed(2)}%</CardTitle>
                                {/* menampilkan dokumen > persentase isread dari tiap anggota > anggota yang belum baca */}
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                        </Card>
                    </NavLink>
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
                                            {tim.user.length} Anggota
                                        </Badge>
                                    </div>

                                    {/* <CardDescription>Card Description</CardDescription> */}
                                    {/* <CardAction>Card Action</CardAction> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {tim.user.map((member, i) => (
                                            <Item variant="outline" size="sm" key={member.idUser}>
                                                <ItemMedia variant={"icon"}>
                                                    {/* <BadgeCheckIcon className="size-5" /> */}
                                                    {i + 1}
                                                </ItemMedia>
                                                <ItemContent className="flex flex-col gap-2">
                                                    <ItemTitle className="text-lg font-semibold">{member.nama}</ItemTitle>
                                                    <SkillUserBadge skill={skill} member={member} />
                                                </ItemContent>
                                                {/* <ItemActions>
                                                    <Button size={"sm"} variant={"outline"}>
                                                        <NavLink to={`detail-skill/${member.idUser}`}>
                                                            Lihat Skill
                                                        </NavLink>
                                                    </Button>
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

function SkillUserBadge({ skill, member }: {
    skill: Awaited<ReturnType<typeof getAllSkill>>,
    member: Awaited<ReturnType<typeof getTeamAndMember>>[number]["user"][number]
}) {
    return (
        <div className="flex flex-wrap items-center gap-1">
            {skill
                .filter((skill) => skill.idTeam === member.idTeam)
                .map((skill) => {
                    const mapKuisProgress = new Map(member.kuisProgress.map(kp => [kp.idSubSkill, kp]))
                    let totalPersenSubskill = 0
                    skill.subSkill.forEach((subSkill) => {
                        const currKuisProgress = mapKuisProgress.get(subSkill.idSubSkill)
                        if (currKuisProgress) {
                            const jumlahBenar = currKuisProgress.jumlahBenar ?? 0;
                            const jumlahSoal = currKuisProgress?.kuis?.kuisElement?.length ?? 0;
                            totalPersenSubskill += (jumlahSoal === 0 ? 0 : jumlahBenar / jumlahSoal) * 100;
                        }
                    });
                    const persenSkill = skill.subSkill.length === 0 ? 0 : totalPersenSubskill / skill.subSkill.length;
                    return { skill, persenSkill };
                })
                .sort((a, b) => b.persenSkill - a.persenSkill) // Sort in descending order of persenSkill
                .map(({ skill, persenSkill }) => (
                    <Badge key={skill.idSkill}
                        className={cn(" rounded-full py-1 px-2.5", {
                            "bg-green-500 text-white": persenSkill >= 80,
                        })}
                        variant={"secondary"}
                        asChild>
                        <NavLink to={`detail-skill/${member.idUser}/skill/${skill.idSkill}`}>
                            {skill.namaSkill} : {" "}
                            {persenSkill.toFixed(2)} %
                        </NavLink>
                    </Badge>
                ))}
        </div>
    );
}
