import { Form, useSubmit } from "react-router"
import type { getAllTeam } from "../_service"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"

type FilterTeamProps = {
    idTeam?: string | null,
    allTeam: Awaited<ReturnType<typeof getAllTeam>>
}

export function FilterTeam({ idTeam, allTeam }: FilterTeamProps) {

    const submit = useSubmit()
    const handleSubmit = (value: string) => {
        submit({ idTeam: value }, { method: "get" })
    }

    return (
        <div>
            <Select name="idTeam" defaultValue={idTeam ?? undefined} onValueChange={handleSubmit}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter team" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Team</SelectLabel>
                        {allTeam.map((team) => (
                            <SelectItem key={team.idTeam} value={team.idTeam}>
                                {team.nama}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    )
}