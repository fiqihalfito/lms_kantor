import { TableWrapper } from "~/components/table-wrapper"
import type { getSkillAndSubSkillByPIC } from "../_service"
import { ListSubSkill } from "./list-subskill"

type ListSkillSubskillType = {
    skillAndSubskill: Awaited<ReturnType<typeof getSkillAndSubSkillByPIC>>
}

export function ListSkillSubskill({ skillAndSubskill }: ListSkillSubskillType) {
    return (
        <div className="flex flex-col gap-12">
            {skillAndSubskill.filter(s => s.jumlahSubskill > 0).map((s, i) => (
                <div key={s.idSkill} className="border rounded-sm p-4 space-y-4 shadow">
                    <div>
                        <h1 className="font-semibold">{s.namaSkill}</h1>
                    </div>
                    <div className="flex flex-col gap-6">
                        {s.levelSubskill.map(([level, subskill], i) => (
                            <ListSubSkill key={level} level={level} subskill={subskill} />
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}