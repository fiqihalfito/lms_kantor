import { TableWrapper } from "~/components/table-wrapper"
import type { getSkillAndSubSkillByPIC } from "../_service"
import { ListSubSkill } from "./list-subskill"

type ListSkillSubskillType = {
    skillAndSubskill: Awaited<ReturnType<typeof getSkillAndSubSkillByPIC>>
}

export function ListSkillSubskill({ skillAndSubskill }: ListSkillSubskillType) {
    return (
        <div className="flex flex-col gap-12">
            {skillAndSubskill.filter(s => s.subSkill.length > 0).map((s, i) => (
                <div className="border rounded-sm p-4 space-y-4 shadow">
                    <div>
                        <h1 className="font-semibold">{s.namaSkill}</h1>
                    </div>
                    <ListSubSkill subskill={s.subSkill} />
                </div>
            ))}
        </div>
    )
}