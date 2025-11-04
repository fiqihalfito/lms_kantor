import { Separator } from "~/components/ui/separator";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { Button } from "~/components/ui/button";
import type { TIPE_DOKUMEN } from "~/lib/constants";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Field, FieldLabel } from "~/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { BadgeXIcon, FunnelIcon } from "lucide-react";
import { Form, useSearchParams } from "react-router";
import type { getAllTeam } from "../_service";

type FilterType = {
    teams: Awaited<ReturnType<typeof getAllTeam>>
    activeFilter: {
        tipeDokumen?: TIPE_DOKUMEN,
        team?: string,
        // search?: string
    }
}

export function Filter({ teams, activeFilter }: FilterType) {

    const [filterOpen, setFilterOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();


    const handleReset = () => {
        setFilterOpen(false)

        setSearchParams({})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault()
        // const formData = new FormData(event.currentTarget)
        // const params = new URLSearchParams(formData as any)

        // setSearchParams(params)
        setFilterOpen(false)
    }

    //  const handleFilterSubmit = () => {
    //     // ambil hanya field yang punya nilai
    //     const nonEmptyFilter = Object.fromEntries(
    //         Object.entries(filter).filter(([_, value]) => value !== "")
    //     );

    //     submit(nonEmptyFilter, {
    //         method: "GET"
    //     })

    //     setFilterOpen(false)
    // }

    return (
        <>
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                <PopoverTrigger asChild>
                    <Button>
                        <FunnelIcon />
                        Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-medium text-sm text-muted-foreground">Filter Pencarian</h2>

                    </div>
                    <div className="space-y-4">
                        <Form method="GET" className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex">
                                <Field>
                                    <FieldLabel htmlFor="team">
                                        Team
                                    </FieldLabel>
                                    <Select
                                        defaultValue={activeFilter.team}
                                        name="team"
                                    >
                                        <SelectTrigger id="team">
                                            <SelectValue placeholder="team" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            {teams.map((team, i) => (
                                                <SelectItem key={team.idTeam} value={team.idTeam}>
                                                    {team.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    size={"sm"}
                                    variant={"outline"}
                                    className="border-dashed"
                                    onClick={handleReset}
                                >
                                    <BadgeXIcon />
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                // onClick={handleFilterSubmit}
                                >
                                    Filter
                                </Button>
                            </div>
                        </Form>

                    </div>

                </PopoverContent>
            </Popover>





            {/* Filter Result ====================== */}
            {/* {activeFilter.tipeDokumen && (
                            <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                                Tipe Dokumen
                                <Separator orientation="vertical" className="mx-2" />
                                <Badge variant={"default"}>
                                    {activeFilter.tipeDokumen}
                                </Badge>
                            </Button>
                        )} */}
            {activeFilter.team && (
                <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                    Team
                    <Separator orientation="vertical" className="mx-2" />
                    <Badge variant={"default"}>
                        {teams.find(team => team.idTeam === activeFilter.team)?.nama}
                    </Badge>
                </Button>
            )}
        </>
    )
}