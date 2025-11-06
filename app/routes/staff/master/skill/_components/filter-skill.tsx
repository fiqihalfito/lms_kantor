import { Form, useSearchParams, useSubmit } from "react-router"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import type { getListTeam } from "../new/_service"
import { useEffect } from "react"
import { Field, FieldGroup, FieldLabel, FieldSet } from "~/components/ui/field"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { XCircleIcon } from "lucide-react"

type FilterSkillType = {
    listTeam: Awaited<ReturnType<typeof getListTeam>>,
    currentFilterTeam?: string | null
}

export function FilterSkill({ listTeam, currentFilterTeam }: FilterSkillType) {

    const submit = useSubmit();

    const [searchParams, setSearchParams] = useSearchParams()

    // useEffect(() => {
    //   first

    //   return () => {
    //     second
    //   }
    // }, [currentFilterTeam])

    console.log("reset", currentFilterTeam ?? undefined);


    return (
        <Form method="GET" onChange={(e) => submit(e.currentTarget)}>
            <div className="flex items-center gap-x-2">
                <Select
                    key={currentFilterTeam ?? 'none'}
                    name="team"
                    defaultValue={currentFilterTeam ?? undefined} >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter team" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Team</SelectLabel>
                            {listTeam.map((team, i) => (
                                <SelectItem value={team.idTeam}>{team.nama}</SelectItem>
                            ))}
                        </SelectGroup>

                    </SelectContent>
                </Select>
                {currentFilterTeam && (
                    <Button type="button" size={"sm"} variant={"secondary"} onClick={() => setSearchParams({})} className="cursor-pointer border-2 border-dashed border-border/30 hover:border-border transition-colors">
                        <XCircleIcon />
                        Reset
                    </Button>
                )}

            </div>




        </Form>

    )
}