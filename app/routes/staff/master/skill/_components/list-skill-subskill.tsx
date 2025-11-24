import type { getAllUsers, getListTeam, getTeamAndSkill } from "../_service"
import { Link, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { CircleFadingPlusIcon, GripVerticalIcon, OctagonXIcon, PencilIcon, TrashIcon } from "lucide-react";
import { EmptyMaster } from "~/components/empty-master";
import { FilterSkill } from "./filter-skill";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { FormSubSkill } from "./form-subskill";
import { DeleteSubSkill } from "./delete-subskill";
import { FormSkill } from "./form-skill";
import { DeleteSkill } from "./delete-skill";
import { Badge } from "~/components/ui/badge";
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from "~/components/ui/sortable";
import type { mSubSkill } from "database/schema/schema";
import type { DragEndEvent } from "@dnd-kit/core";
import { cn } from "~/lib/utils";

type ListSkillSubSkillType = {
    teamAndSkill: Awaited<ReturnType<typeof getTeamAndSkill>>,
    listTeam: Awaited<ReturnType<typeof getListTeam>>
    filterTeam: string | null,
    allUsers: Awaited<ReturnType<typeof getAllUsers>>
}

export function ListSkillSubSkill({ teamAndSkill, listTeam, filterTeam, allUsers }: ListSkillSubSkillType) {


    const fetcher = useFetcher({ key: "update-urutan-subskill" })

    const handleOrderSubSkill = (subskills: typeof teamAndSkill[number]["skill"][number]["subSkill"]) => {
        const newOrderSubskill = subskills.map((subskill, index) => ({
            idSubSkill: subskill.idSubSkill,
            urutan: index + 1
        }))
        fetcher.submit({
            idSkill: subskills[0].idSkill,
            level: subskills[0].level,
            newOrder: JSON.stringify(newOrderSubskill), // to database
            newSubskill: JSON.stringify(subskills) // untuk optimistic update
        }, {
            method: "post",
            action: `${subskills[0].idSkill}/update-urutan`
        })
    }

    return (
        <>
            {teamAndSkill.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Skill" />
            ) : (
                <div className="flex flex-col gap-2">
                    <div>
                        <FilterSkill listTeam={listTeam} currentFilterTeam={filterTeam} />
                    </div>
                    <div className={cn("grid grid-cols-2 gap-4", teamAndSkill.length === 1 ? "grid-cols-1" : "")}>
                        {teamAndSkill.map((t, i) => (
                            <div key={t.idTeam} className="p-4 border rounded-md shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xs text-muted-foreground">Team</h2>
                                        <h1 className="font-semibold text-lg ">{t.nama}</h1>
                                    </div>
                                    <FormSkill
                                        key={"insert" + t.idTeam}
                                        mode="insert"
                                        idTeam={t.idTeam}
                                        namaTeam={t.nama!}
                                    />
                                </div>
                                {t.skill.length === 0 ? (
                                    <EmptyList text="Belum ada skill" />
                                ) : (
                                    <div className="flex flex-col gap-12">
                                        {t.skill.map((s, i) => (
                                            <div key={s.idSkill} className="px-4 py-4 border rounded-sm shadow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xs text-muted-foreground">Skill</h3>
                                                        <h2 className="font-medium">{s.namaSkill}</h2>
                                                    </div>
                                                    <div className="flex items-center gap-x-1.5">
                                                        <FormSubSkill
                                                            key={"insert" + s.idSkill}
                                                            allUsers={allUsers}
                                                            idTeam={t.idTeam}
                                                            idSkill={s.idSkill}
                                                            namaSkill={s.namaSkill}
                                                            mode="insert"
                                                        />
                                                        <FormSkill
                                                            key={"update" + s.idSkill}
                                                            mode="update"
                                                            defaultValues={{
                                                                namaSkill: s.namaSkill
                                                            }}
                                                            idSkill={s.idSkill}

                                                        />
                                                        <DeleteSkill idSkill={s.idSkill} nama={s.namaSkill} />
                                                    </div>

                                                </div>
                                                {
                                                    s.subSkill.length === 0 ? (
                                                        <EmptyList text="Belum ada subskill" />
                                                    ) : (
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-xs text-muted-foreground">list subskill</p>
                                                            {
                                                                // Group subskills by their level for better readability
                                                                Object.entries(s.subSkill.reduce((acc: Record<string, typeof s.subSkill[number][]>, sub) => {
                                                                    const level = sub.level;
                                                                    if (!acc[level]) acc[level] = [];
                                                                    acc[level].push(sub);
                                                                    return acc;
                                                                }, {})).sort(([levelA], [levelB]) => parseInt(levelA) - parseInt(levelB)).map(([level, subskills]) => {


                                                                    // for optimistic update
                                                                    let subskillsForLevel = subskills
                                                                    if (fetcher.formData?.get("level") == level && fetcher.formData?.get("idSkill") == s.idSkill) {
                                                                        subskillsForLevel = JSON.parse(fetcher.formData?.get("newSubskill") as string || "[]") as typeof subskills
                                                                    }


                                                                    return (
                                                                        <Sortable
                                                                            key={level}
                                                                            value={subskillsForLevel}
                                                                            onValueChange={handleOrderSubSkill}
                                                                            getItemValue={(subskill) => subskill.idSubSkill}
                                                                        >

                                                                            <div className="mb-4 last:mb-0">
                                                                                <h4 className="text-sm font-semibold mb-2">Level {level}</h4>
                                                                                <SortableContent asChild>
                                                                                    <div className="flex flex-col gap-2">
                                                                                        {subskillsForLevel.map((ss) => (
                                                                                            <SortableItem key={ss.idSubSkill} value={ss.idSubSkill}>
                                                                                                <div className="border rounded-sm px-2 py-2 text-sm flex items-center justify-between">
                                                                                                    <div className="flex items-center gap-x-1.5">
                                                                                                        <SortableItemHandle asChild>
                                                                                                            <Button variant="ghost" size="icon" className="size-8">
                                                                                                                <GripVerticalIcon className="h-4 w-4" />
                                                                                                            </Button>
                                                                                                        </SortableItemHandle>
                                                                                                        <div className="space-y-1.5">
                                                                                                            <div className="flex items-center gap-x-1.5">
                                                                                                                <span>{ss.namaSubSkill}</span>
                                                                                                                <Badge className="rounded-full" variant="outline">Level {ss.level}</Badge>
                                                                                                            </div>
                                                                                                            <p className="text-xs text-muted-foreground">PIC: {ss.pic?.nama}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="flex items-center gap-x-1.5">
                                                                                                        <FormSubSkill
                                                                                                            key={"update" + ss.idSubSkill}
                                                                                                            allUsers={allUsers}
                                                                                                            idTeam={t.idTeam}
                                                                                                            mode="update"
                                                                                                            idSubSkill={ss.idSubSkill}
                                                                                                            dv={{
                                                                                                                namaSubSkill: ss.namaSubSkill,
                                                                                                                idUser: ss.idUser,
                                                                                                                level: ss.level
                                                                                                            }}
                                                                                                        />
                                                                                                        <DeleteSubSkill key={"delete" + ss.idSubSkill} idSkill={s.idSkill} idSubSkill={ss.idSubSkill} nama={ss.namaSubSkill} />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </SortableItem>

                                                                                        ))}
                                                                                    </div>

                                                                                </SortableContent>
                                                                            </div>
                                                                            {/* <SortableOverlay>
                                                                            <div className="size-full rounded-md bg-primary/10" />
                                                                        </SortableOverlay> */}
                                                                        </Sortable>
                                                                    )

                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div >

                </div >
            )
            }
        </>
    )
}

function EmptyList({ text }: { text: string }) {
    return (
        <p className="text-muted-foreground text-sm">{text}</p>
    )
}