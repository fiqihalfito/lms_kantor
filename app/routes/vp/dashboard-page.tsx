import { userContext } from "~/lib/context";
import type { Route } from "./+types/dashboard-page";
import { getAllSkill, getAllSkillPercentageByFinishedQuiz, getAllSubbidang, getAllTeams, getAllUsersWithScore, getPersentaseKuis, getPersentaseMembaca } from "./_service";
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
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Await, NavLink, Outlet } from "react-router";
import { Suspense } from "react";
import { LoadingSkillUser } from "./_components/loading-skill-user";
import { ErrorSkillUser } from "./_components/error-skill-user";
import { ChevronLeft, LayersIcon } from "lucide-react";
import { Filter } from "./_components/filter";
import { FilterSubBidang } from "./_components/filter-subbidang";
import { Progress } from "~/components/ui/progress";

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

    // persentase skill
    const persentaseSkill = await getAllSkillPercentageByFinishedQuiz(idSubBidang)


    // filter master
    const allSubbidang = await getAllSubbidang()


    const filterMaster = {
        allSubbidang,
    }

    // currentFilter
    const url = new URL(request.url)
    const currentFilter = {
        subBidang: url.searchParams.get("subBidang") || idSubBidang,
    }




    return { currentSubbidang, allSkill, promiseAllUsers, allTeams, persentaseMembaca, persentaseKuis, filterMaster, currentFilter, persentaseSkill }
}

export default function DashboardSubbidang({ loaderData }: Route.ComponentProps) {

    const { currentSubbidang, allSkill, promiseAllUsers, allTeams, persentaseMembaca, persentaseKuis, filterMaster, currentFilter, persentaseSkill } = loaderData

    // Mapping data for performance   
    const teamMap = new Map(allTeams.map(team => [team.idTeam, team]));




    return (
        <div className="flex flex-col mx-auto container">
            <header className="flex items-center justify-between h-20 border-b mb-10">
                {/* entah apa nantinya, pokoknya dibuat space dulu */}
                <div className="flex items-center space-x-4">
                    <LayersIcon className="h-10 w-10" />
                    <h1 className="text-3xl font-extrabold tracking-wider text-foreground">
                        Learning Management System
                    </h1>
                </div>
                <div>
                    <p className="text-muted-foreground text-base font-bold tracking-wide border-2 border-muted-foreground px-6 py-2 rounded-full shadow-lg">Bidang Digitalisasi PLN 2</p>
                </div>
            </header>
            <div className="flex flex-col mx-auto container">
                {/* <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h1 className="text-3xl font-semibold tracking-tight">Dashboard Subbidang</h1>
                        <p className="text-muted-foreground">Subbidang {currentSubbidang}</p>
                    </div>
                </div>
                <Separator className="mt-4 mb-10" /> */}

                <Outlet />

                <Filter>
                    <FilterSubBidang allSubbidang={filterMaster.allSubbidang} dv={currentFilter.subBidang} />
                </Filter>

                <div className="flex flex-col gap-12">


                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold tracking-tight">Statistik Skill</h1>
                        {/* Card Section */}
                        <div className="grid grid-cols-2 gap-4">
                            {allTeams.map(team => (
                                // <NavLink key={team.idTeam} to={"dokumen-read-persentage/tipe/SOP"} viewTransition>
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardDescription>Persentase Skill {team.nama}</CardDescription>
                                        {/* {persentaseMembaca.map((item) => (
                                                <CardTitle key={"baca" + item.idTeam} className="text-4xl tabular-nums">{item.namaTeam}{" : "}{item.persentaseBaca.toFixed(2)}%</CardTitle>
                                            ))} */}
                                        {/* {persentaseSkill[team.idTeam].map((item) => (
                                                <CardTitle key={"skill" + item.idSkill} className="text-lg tabular-nums">{item.namaSkill}{" : "}{item.persentaseSkill.toFixed(2)}%</CardTitle>
                                            ))} */}
                                        <ItemGroup className="gap-1">
                                            {persentaseSkill[team.idTeam].map((skill) => (
                                                <Item key={skill.idSkill} variant="outline" size="sm" asChild role="listitem">
                                                    <NavLink to="#">
                                                        {/* <ItemMedia variant="default">
                                                                <div className="flex items-center justify-center text-base font-bold h-16 w-20 border rounded-sm tabular-nums">
                                                                    {skill.persentaseSkill === 0 ? "0%" : `${skill.persentaseSkill.toFixed(2)}%`}
                                                                </div>
                                                            </ItemMedia> */}
                                                        <ItemContent>
                                                            <ItemTitle className=" font-semibold">
                                                                {skill.namaSkill}
                                                                {/* <span className="text-muted-foreground">{song.album}</span> */}
                                                            </ItemTitle>
                                                            {/* <ItemDescription>
                                                                    <Progress value={skill.persentaseSkill} />
                                                                </ItemDescription> */}
                                                        </ItemContent>
                                                        <ItemContent>
                                                            <div className="flex flex-row items-center">
                                                                <ItemDescription className="w-40">
                                                                    <Progress value={skill.persentaseSkill} className="h-2.5" />
                                                                </ItemDescription>
                                                                <ItemDescription className="w-20 text-center">
                                                                    {skill.persentaseSkill === 0 ? "0%" : `${skill.persentaseSkill.toFixed(2)}%`}
                                                                </ItemDescription>
                                                            </div>
                                                        </ItemContent>
                                                    </NavLink>
                                                </Item>
                                            ))}
                                        </ItemGroup>
                                        {/* <pre>{JSON.stringify(persentaseSkill[team.idTeam], null, 2)}</pre> */}
                                    </CardHeader>
                                </Card>
                                // </NavLink>
                            ))}

                            {/* <NavLink to={"dokumen-read-persentage/tipe/IK"} viewTransition>
                                <Card>
                                    <CardHeader>
                                        <CardDescription>Persentase Kuis</CardDescription>
                                        {persentaseKuis.map((item) => (
                                            <CardTitle key={"kuis" + item.idTeam} className="text-4xl tabular-nums">{item.namaTeam}{" : "}{item.persentaseOrangKuis.toFixed(2)}%</CardTitle>
                                        ))}
                                    </CardHeader>
                                </Card>
                            </NavLink> */}
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
            <NavLink to={`detail-skill/${idUser}/skill/${skill.idSkill}`} viewTransition>
                {skill.namaSkill} : {" "}
                {persenSkill !== undefined ? `${persenSkill.toFixed(2)} %` : '0%'}
            </NavLink>
        </Badge>
    )
}

