import type { getAllUsers, getListTeam, getTeamAndSkill } from "../_service"
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { CircleFadingPlusIcon, OctagonXIcon, PencilIcon, TrashIcon } from "lucide-react";
import { EmptyMaster } from "~/components/empty-master";
import { FilterSkill } from "./filter-skill";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { FormSubSkill } from "./form-subskill";
import { DeleteSubSkill } from "./delete-subskill";
import { FormSkill } from "./form-skill";
import { DeleteSkill } from "./delete-skill";

type ListSkillSubSkillType = {
    teamAndSkill: Awaited<ReturnType<typeof getTeamAndSkill>>,
    listTeam: Awaited<ReturnType<typeof getListTeam>>
    filterTeam: string | null,
    allUsers: Awaited<ReturnType<typeof getAllUsers>>
}

export function ListSkillSubSkill({ teamAndSkill, listTeam, filterTeam, allUsers }: ListSkillSubSkillType) {

    return (
        <>
            {teamAndSkill.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Skill" />
            ) : (
                <div className="flex flex-col gap-2">
                    <div>
                        <FilterSkill listTeam={listTeam} currentFilterTeam={filterTeam} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                                    <div className="flex flex-col gap-4">
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
                                                            {s.subSkill.map((ss, i) => (
                                                                <div key={ss.idSubSkill} className="border rounded-sm px-2 py-2 text-sm flex items-center justify-between">
                                                                    <div className="ml-2">
                                                                        <span >{ss.namaSubSkill}</span>
                                                                        <p className="text-xs text-muted-foreground">PIC: {ss.pic?.nama}</p>
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
                                                                                idUser: ss.idUser
                                                                            }}
                                                                        />
                                                                        <DeleteSubSkill key={"delete" + ss.idSubSkill} idSkill={s.idSkill} idSubSkill={ss.idSubSkill} nama={ss.namaSubSkill} />
                                                                        {/* <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button size={"icon-sm"} variant={"destructive"} className="cursor-pointer" asChild >
                                                                                    <Link to={``} viewTransition>
                                                                                        <TrashIcon />
                                                                                    </Link>
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p>Hapus SubSkill</p>
                                                                            </TooltipContent>
                                                                        </Tooltip> */}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

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