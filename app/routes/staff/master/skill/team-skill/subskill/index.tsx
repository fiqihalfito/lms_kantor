import { ItemGroup } from "~/components/ui/item";
import { getSubSkillByidSkill } from "../../_service";
import type { Route } from "./+types";
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay } from "~/components/ui/sortable";
import { TableWrapper } from "~/components/table-wrapper";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

import { GripVerticalIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { data, useFetcher } from "react-router";
import { FormSubSkill } from "../../_components/form-subskill";
import { useToastEffect } from "~/hooks/use-toast";
import { getToast } from "remix-toast";
import { DeleteSubSkill } from "../../_components/delete-subskill";
import { EmptySubSkill } from "../../_components/empty-subskill";
import { wait } from "~/lib/utils";
import { useState } from "react";

export async function loader({ request, params }: Route.LoaderArgs) {


    const allSubskill = await getSubSkillByidSkill(params.idSkill)

    // toast
    const { toast, headers } = await getToast(request);

    return data({ allSubskill, toast }, { headers })
}


export default function SubskillList({ loaderData, params, matches }: Route.ComponentProps) {

    const { allSubskill, toast } = loaderData
    const namaSkill = matches[4].loaderData.listSkill.find((skill) => skill.idSkill === params.idSkill)?.namaSkill

    useToastEffect(toast)

    const fetcher = useFetcher()
    // let groupSubskill = allSubskill
    // for optimistic UI
    // if (fetcher.formData) {
    //     let changedSubskillOrder = JSON.parse(fetcher.formData.get("newOrder") as string) as { idSubSkill: string, urutan: number }[]
    //     let mapping = new Map(changedSubskillOrder.map(s => [s.idSubSkill, s.urutan]));
    //     let level = Number(fetcher.formData.get("level"))
    //     let oldOrderLevel = allSubskill[level - 1]
    //     let newSubskillOrder: typeof groupSubskill[number] = [
    //         level,
    //         oldOrderLevel[1].map(s =>
    //             mapping.has(s.idSubSkill)
    //                 ? { ...s, urutan: mapping.get(s.idSubSkill)! }
    //                 : s
    //         ).sort((a, b) => a.urutan! - b.urutan!)
    //     ]
    //     groupSubskill[level - 1] = newSubskillOrder
    // }

    const [groupSubskill, setGroupSubskill] = useState(allSubskill)

    const handleOrderSubSkill = (newSubskillOrder: typeof groupSubskill[number][1]) => {

        setGroupSubskill((prev) => {
            return prev.map(([level, subskills], i) => {
                if (level === newSubskillOrder[0].level) {
                    return [level, newSubskillOrder]
                }
                return [level, subskills]
            })
        })

        const submittedNewSubskillOrder = newSubskillOrder.map((subskill, i) => {
            return {
                idSubSkill: subskill.idSubSkill,
                urutan: i + 1
            }
        })

        fetcher.submit({
            newOrder: JSON.stringify(submittedNewSubskillOrder), // to database
            // level: newSubskillOrder[0].level, // level sample
        }, {
            method: "post",
            action: `update-urutan`,
        })


    }

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-muted-foreground mb-2">SubSkill</h1>
                <FormSubSkill
                    key={"insert" + params.idSkill}
                    idTeam={params.idTeam}
                    idSkill={params.idSkill}
                    namaSkill={namaSkill}
                    mode="insert"
                />

            </div>

            {groupSubskill.length === 0 && (
                <EmptySubSkill />
            )}

            <ItemGroup className="flex flex-col gap-6">
                {groupSubskill.map(([level, subskills]) => (
                    <div key={level}>



                        <Sortable
                            key={level}
                            value={subskills}
                            onValueChange={(items) => handleOrderSubSkill(items)}
                            getItemValue={(subskill) => subskill.idSubSkill}
                        >
                            <div>
                                <h4 className="text-sm font-semibold mb-2">Level {level}</h4>
                            </div>
                            <TableWrapper>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]" />
                                            <TableHead>SubSkill</TableHead>
                                            <TableHead>PIC</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <SortableContent asChild>
                                        <TableBody>
                                            {subskills.map((ss) => (
                                                <SortableItem key={ss.idSubSkill} asChild value={ss.idSubSkill}>
                                                    <TableRow key={ss.idSubSkill}>
                                                        <TableCell>
                                                            <SortableItemHandle asChild>
                                                                <Button variant="ghost" size="icon" className="size-8">
                                                                    <GripVerticalIcon className="h-4 w-4" />
                                                                </Button>
                                                            </SortableItemHandle>
                                                        </TableCell>
                                                        <TableCell className="font-medium">{ss.namaSubSkill}</TableCell>
                                                        <TableCell>{ss.pic?.nama}</TableCell>
                                                        <TableCell className="flex justify-end items-center gap-x-1.5">
                                                            <FormSubSkill
                                                                key={"update" + ss.idSubSkill}
                                                                idTeam={params.idTeam}
                                                                mode="update"
                                                                idSubSkill={ss.idSubSkill}
                                                                dv={{
                                                                    namaSubSkill: ss.namaSubSkill,
                                                                    idUser: ss.idUser,
                                                                    level: ss.level
                                                                }}
                                                            />
                                                            <DeleteSubSkill key={"delete" + ss.idSubSkill} idSkill={params.idSkill} idSubSkill={ss.idSubSkill} nama={ss.namaSubSkill} />
                                                        </TableCell>
                                                    </TableRow>
                                                </SortableItem>
                                            ))}
                                        </TableBody>
                                    </SortableContent>
                                </Table>
                            </TableWrapper>
                            <SortableOverlay>
                                <div className="size-full rounded-none bg-primary/10" />
                            </SortableOverlay>
                        </Sortable>
                    </div>

                ))
                }
            </ItemGroup >
        </div >
    )
}