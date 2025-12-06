import { NavLink, Outlet } from "react-router";
import type { Route } from "./+types";
import { getSkillByIdTeam } from "../_service";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { ChevronRightIcon, EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { FormSkill } from "../_components/form-skill";
import { DeleteSkill } from "../_components/delete-skill";
import { Button } from "~/components/ui/button";
import { EmptySkill } from "../_components/empty-skill";

export async function loader({ request, params }: Route.LoaderArgs) {

    const listSkill = await getSkillByIdTeam(params.idTeam)

    return { listSkill }
}

export default function TeamSkill({ loaderData, params, matches }: Route.ComponentProps) {

    const { listSkill } = loaderData
    const namaTeam = matches[3].loaderData.allTeams.find((team) => team.idTeam === params.idTeam)?.nama


    return (
        <>
            <div className="min-w-96">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold text-muted-foreground ">Skill</h1>
                    <FormSkill
                        key={"insert" + params.idTeam}
                        mode="insert"
                        idTeam={params.idTeam}
                        namaTeam={namaTeam}
                    />

                </div>


                {listSkill.length === 0 && <EmptySkill />}

                <ItemGroup className="flex flex-col gap-2">
                    {listSkill.map((skill, i) => (

                        <Item key={skill.idSkill} variant={"outline"} size={"sm"} className={""}>
                            <ItemMedia variant={"icon"} className="size-5 text-muted-foreground text-xs">
                                {i + 1}
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{skill.namaSkill}</ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <FormSkill
                                    key={"update" + skill.idSkill}
                                    mode="update"
                                    defaultValues={{
                                        namaSkill: skill.namaSkill
                                    }}
                                    idSkill={skill.idSkill}
                                />
                                <DeleteSkill idSkill={skill.idSkill} nama={skill.namaSkill} />
                                <NavLink to={`team-skill/${skill.idSkill}`}>
                                    {({ isActive }) => (
                                        <Button variant="outline" size="sm" disabled={isActive}>
                                            {isActive ? "Dilihat" : <EyeIcon />}
                                            {isActive && <ChevronRightIcon className="size-4" />}
                                        </Button>
                                    )}
                                </NavLink>
                            </ItemActions>
                        </Item>

                    ))}
                </ItemGroup>
            </div>

            <Outlet />
        </>

    )
}