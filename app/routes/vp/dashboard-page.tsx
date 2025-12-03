import { userContext } from "~/lib/context";
import type { Route } from "./+types/dashboard-page";
import { getAllSkill, getAllTeams, getAllUsersWithScore, getPersentaseKuis, getPersentaseMembaca } from "./_service";
import { Separator } from "~/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
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
import { Await, NavLink, Outlet } from "react-router";
import { Suspense } from "react";
import { LoadingSkillUser } from "./_components/loading-skill-user";
import { ErrorSkillUser } from "./_components/error-skill-user";
import { ChevronLeft } from "lucide-react";

export async function loader({ request, params }: Route.LoaderArgs) {

    // currentSubbidang
    const currentSubbidang = "Aplikasi PLN Korporat dan Pelayanan Pelanggan 1"
    const idSubBidang = "s1"
    // total tim dan anggota

    const promiseAllUsers = getAllUsersWithScore(idSubBidang)
    const allTeams = await getAllTeams(idSubBidang)

    // skill    
    const allSkill = await getAllSkill(idSubBidang)

    // persentase membaca
    const persentaseMembaca = await getPersentaseMembaca(idSubBidang)
    const persentaseKuis = await getPersentaseKuis(idSubBidang)








    return { currentSubbidang, allSkill, promiseAllUsers, allTeams, persentaseMembaca, persentaseKuis }
}

export default function DashboardSubbidang({ loaderData }: Route.ComponentProps) {

    const { currentSubbidang, allSkill, promiseAllUsers, allTeams, persentaseMembaca, persentaseKuis } = loaderData

    // Mapping data for performance   
    const teamMap = new Map(allTeams.map(team => [team.idTeam, team]));




    return (
        <div className="container mx-auto">
            <header className="flex items-center justify-between h-12">
                {/* entah apa nantinya, pokoknya dibuat space dulu */}
            </header>
            <div className="flex flex-1 flex-col p-8 pt-2">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h1 className="text-3xl font-semibold tracking-tight">Dashboard Subbidang</h1>
                        <p className="text-muted-foreground">Subbidang {currentSubbidang}</p>
                    </div>
                </div>
                <Separator className="mt-4 mb-10" />

                <Outlet />

                <div className="flex flex-col gap-12">


                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold tracking-tight">Statistik Subbidang</h1>
                        {/* Card Section */}
                        <div className="grid grid-cols-2 gap-4">
                            <NavLink to={"dokumen-read-persentage/tipe/SOP"} viewTransition>
                                <Card>
                                    <CardHeader>
                                        <CardDescription>Persentase Membaca</CardDescription>
                                        {/* <CardTitle className="text-4xl tabular-nums">{}%</CardTitle> */}
                                        {persentaseMembaca.map((item) => (
                                            <CardTitle key={"baca" + item.idTeam} className="text-4xl tabular-nums">{item.namaTeam}{" : "}{item.persentaseBaca.toFixed(2)}%</CardTitle>
                                        ))}
                                    </CardHeader>
                                </Card>
                            </NavLink>
                            <NavLink to={"dokumen-read-persentage/tipe/IK"} viewTransition>
                                <Card>
                                    <CardHeader>
                                        <CardDescription>Persentase Kuis</CardDescription>
                                        {/* <CardTitle className="text-4xl tabular-nums">%</CardTitle> */}
                                        {persentaseKuis.map((item) => (
                                            <CardTitle key={"kuis" + item.idTeam} className="text-4xl tabular-nums">{item.namaTeam}{" : "}{item.persentaseOrangKuis.toFixed(2)}%</CardTitle>
                                        ))}
                                        {/* <CardAction>Card Action</CardAction> */}
                                    </CardHeader>
                                    {/* <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter> */}
                                </Card>
                            </NavLink>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold tracking-tight">Persentase Skill Team</h1>
                        {/* List Persentase Skill User */}
                        <Suspense fallback={<LoadingSkillUser />}>
                            <Await resolve={promiseAllUsers} errorElement={<ErrorSkillUser />}>
                                {(allUsers) => {

                                    // Mapping data for performance
                                    const userMap = new Map(allUsers.map(user => [user.idUser, user]));
                                    const userByTeamMap = new Map(allTeams.map(team => [team.idTeam, allUsers.filter(user => user.idTeam === team.idTeam)]));

                                    return (
                                        <div className="border shadow rounded-lg p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-base font-semibold">Team {currentSubbidang}</h1>
                                                <div className="space-x-1.5">
                                                    <Badge className=" rounded-full text-sm">
                                                        {/* {totalMembers} Anggota */}
                                                        {userMap.size} Anggota
                                                    </Badge>
                                                    <Badge className=" rounded-full text-sm">
                                                        {teamMap.size} Team
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className={cn("grid", `grid-cols-${allTeams.length} gap-4`)}>
                                                {allTeams.map((t, i) => (
                                                    <Card key={t.idTeam}>
                                                        <CardHeader>
                                                            <div className="flex items-center justify-between">
                                                                <CardTitle>{t.nama}</CardTitle>
                                                                <Badge className=" rounded-full ">
                                                                    {allUsers.filter((user) => user.idTeam === t.idTeam).length} Anggota
                                                                </Badge>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-2">
                                                                {userByTeamMap.get(t.idTeam)?.map((user, i) => (
                                                                    <Item variant="outline" size="sm" key={user.idUser}>
                                                                        <ItemMedia variant={"icon"} className="self-start">
                                                                            {i + 1}
                                                                        </ItemMedia>
                                                                        <ItemContent className="flex flex-col gap-2">
                                                                            <ItemTitle className="text-lg font-semibold ml-2">{user.nama}</ItemTitle>
                                                                            <div className="flex flex-wrap items-center gap-1">
                                                                                {allSkill.filter((skill) => skill.idTeam === t.idTeam).map((skill) => (
                                                                                    <BadgeSkill key={skill.idSkill} skill={skill} persenSkill={user.persentaseTiapSkill?.[skill.idSkill]} idUser={user.idUser} />
                                                                                ))}
                                                                            </div>
                                                                        </ItemContent>
                                                                        {/* <ItemActions>
                                                    <Button size={"sm"} variant={"outline"}>
                                                        <NavLink to={`detail-skill/${user.idUser}`}>
                                                            Lihat Skill
                                                        </NavLink>
                                                    </Button>
                                                </ItemActions> */}
                                                                    </Item>
                                                                ))}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }}
                            </Await>

                        </Suspense>
                    </div>



                </div>
            </div>
        </div>

    )
}

function BadgeSkill({ skill, persenSkill, idUser }: {
    skill: Awaited<ReturnType<typeof getAllSkill>>[number],
    persenSkill?: number,
    idUser: string
}) {
    return (
        <Badge key={skill.idSkill}
            className={cn(" rounded-full py-1 px-2.5", {
                "bg-green-500 text-white": persenSkill !== undefined && persenSkill >= 80,
            })}
            variant={"secondary"}
            asChild>
            <NavLink to={`detail-skill/${idUser}/skill/${skill.idSkill}`}>
                {skill.namaSkill} : {" "}
                {persenSkill !== undefined ? `${persenSkill.toFixed(2)} %` : '0%'}
            </NavLink>
        </Badge>
    )
}

