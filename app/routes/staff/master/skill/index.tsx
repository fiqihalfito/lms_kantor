import { data, Link, Outlet } from "react-router";
import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";
import { CircleFadingPlusIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { getAllUsers, getListTeam, getTeamAndSkill } from "./_service";
import { userContext } from "~/lib/context";
import { getToast } from "remix-toast";
import { ListSkillSubSkill } from "./_components/list-skill-subskill";
import { useToastEffect } from "~/hooks/use-toast";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    // toast
    const { toast, headers } = await getToast(request);

    // filter
    const url = new URL(request.url)
    const filterTeam = url.searchParams.get("team")
    const teamAndSkill = await getTeamAndSkill(user?.idSubBidang!, filterTeam)

    // masterFilter
    const listTeam = await getListTeam(user.idSubBidang)

    // masterForm
    const allUsers = await getAllUsers(user?.idSubBidang!)

    return data({ teamAndSkill, listTeam, filterTeam, allUsers, toast }, { headers })
}


export default function SkillMaster({ loaderData }: Route.ComponentProps) {

    const { teamAndSkill, listTeam, filterTeam, allUsers, toast } = loaderData


    useToastEffect(toast)


    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Skill</h1>
                    <p className="text-muted-foreground">List skill</p>
                </div>

            </div>

            <Separator />

            <Outlet />

            <ListSkillSubSkill
                allUsers={allUsers}
                filterTeam={filterTeam}
                listTeam={listTeam}
                teamAndSkill={teamAndSkill}
            />




        </div >
    )
}





