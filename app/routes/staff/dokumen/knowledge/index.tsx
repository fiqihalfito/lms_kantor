import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { userContext } from "~/lib/context";
import { getAllSkill, getAllTeam } from "./_service";
import { Button } from "~/components/ui/button";
import { NavLink } from "react-router";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "~/components/ui/item";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"
import { FolderXIcon } from "lucide-react";
import { FilterTeam } from "./_components/filter-team";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const url = new URL(request.url)
    const idTeam = url.searchParams.get("idTeam") || user.idTeam
    const allSkill = await getAllSkill(user.idSubBidang, { idTeam })

    // master filter
    const allTeam = await getAllTeam(user.idSubBidang)

    return { allSkill, allTeam, idTeam }
}


export default function KnowledgeSkillPage({ loaderData }: Route.ComponentProps) {

    const { allSkill, allTeam, idTeam } = loaderData


    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Knowledge</h1>
                    <p className="text-muted-foreground">Berisi skill</p>
                </div>
                <div className="flex items-center gap-x-2">

                </div>

            </div>
            <Separator />
            <div className="flex flex-col gap-2">
                <div>
                    <FilterTeam allTeam={allTeam} idTeam={idTeam} />
                </div>
                {allSkill.length === 0 ? (<EmptyList />) : (

                    <div className="flex flex-col gap-y-2 w-1/2">
                        {allSkill.map((skill, i) => (
                            <Item variant="outline" size="sm" asChild>
                                <NavLink to={`skill/${skill.idSkill}`}>
                                    <ItemMedia variant={"icon"}>
                                        {i + 1}
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>{skill.namaSkill}</ItemTitle>
                                    </ItemContent>
                                    {/* <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions> */}
                                </NavLink>
                            </Item>
                        ))}
                    </div>
                )}


            </div>
        </div>
    )
}

export function EmptyList() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderXIcon />
                </EmptyMedia>
                <EmptyTitle>Belum Ada Skill</EmptyTitle>
                <EmptyDescription>
                    Tambahkan skill baru untuk memulai
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}