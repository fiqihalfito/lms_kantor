import { NavLink, Outlet } from "react-router";
import type { Route } from "./+types/index";
import { ChevronRightIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { getListTeam } from "./_service";
import { userContext } from "~/lib/context";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { cn } from "~/lib/utils";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    // toast
    // const { toast, headers } = await getToast(request);

    // // filter
    // const url = new URL(request.url)
    // const filterTeam = url.searchParams.get("team")
    // const teamAndSkill = await getTeamAndSkill(user?.idSubBidang!, filterTeam)

    // // masterFilter
    // const listTeam = await getListTeam(user.idSubBidang)

    // // masterForm
    // const allUsers = await getAllUsers(user?.idSubBidang!)

    // return data({ teamAndSkill, listTeam, filterTeam, allUsers, toast }, { headers })

    const allTeams = await getListTeam(user.idSubBidang)

    return { allTeams }

}


export default function SkillMaster({ loaderData }: Route.ComponentProps) {

    const { allTeams } = loaderData




    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Skill</h1>
                    <p className="text-muted-foreground">List skill</p>
                </div>

            </div>

            <Separator />


            {/* <ListSkillSubSkill
                allUsers={allUsers}
                filterTeam={filterTeam}
                listTeam={listTeam}
                teamAndSkill={teamAndSkill}
            /> */}

            <div className="flex flex-row gap-8">
                <div className="w-60">
                    <h1 className="font-semibold text-muted-foreground mb-2">Team</h1>
                    <ItemGroup className="flex flex-col gap-2">
                        {allTeams.map((team, i) => (
                            <NavLink key={team.idTeam} to={`team/${team.idTeam}`}>
                                {({ isActive }) => (
                                    <Item variant={"outline"} className={cn(isActive && "bg-accent")}>

                                        <ItemContent>
                                            <ItemTitle>{team.nama}</ItemTitle>
                                        </ItemContent>
                                        <ItemActions>
                                            <ChevronRightIcon className="size-4" />
                                        </ItemActions>
                                    </Item>
                                )}

                            </NavLink>
                        ))}
                    </ItemGroup>
                </div>

                <Outlet />


            </div>





        </div >
    )
}





