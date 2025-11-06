import type { getAllLayanan, getAllSkill, getAllTeams } from "../_services"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form, useFetcher, useSearchParams } from "react-router";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { useState } from "react";
import { BadgeXIcon, FunnelIcon } from "lucide-react";
import type { TIPE_DOKUMEN } from "~/lib/constants";

type FilterType = {
    filterData: {
        layanan?: Awaited<ReturnType<typeof getAllLayanan>>,
        skill?: Awaited<ReturnType<typeof getAllSkill>>,
        teams: Awaited<ReturnType<typeof getAllTeams>>
    },
    activeFilter: {
        team?: string | null,
        layanan?: string | null,
        skill?: string | null,
    }
    tipe: Exclude<TIPE_DOKUMEN, "SOP">
}

export function Filter({ filterData, activeFilter, tipe }: FilterType) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterOpen, setFilterOpen] = useState(false)

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

    return (
        <div className="flex items-center gap-x-2">
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                <PopoverTrigger asChild>
                    <Button>
                        <FunnelIcon />
                        Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-96 space-y-4">
                    <h1 className="text-sm text-muted-foreground">
                        Filter Pencarian
                    </h1>
                    <Form method="GET" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="team">
                                    Team
                                </FieldLabel>
                                <Select defaultValue={activeFilter.team ?? undefined} name="teamFilter">
                                    <SelectTrigger id="team">
                                        <SelectValue placeholder="team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterData.teams.map((t, i) => (
                                            <SelectItem value={t.idTeam}>{t.nama}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                            {tipe === "IK" && (
                                <Field>
                                    <FieldLabel htmlFor="layanan">
                                        Layanan
                                    </FieldLabel>
                                    <Select defaultValue={activeFilter.layanan ?? undefined} name="layananFilter">
                                        <SelectTrigger id="layanan">
                                            <SelectValue placeholder="layanan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filterData.layanan?.map((l, i) => (
                                                <SelectItem value={l.idLayanan}>{l.nama}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                            {tipe === "Knowledge" && (
                                <Field>
                                    <FieldLabel htmlFor="skill">
                                        Skill
                                    </FieldLabel>
                                    <Select defaultValue={activeFilter.skill ?? undefined} name="skillFilter">
                                        <SelectTrigger id="skill">
                                            <SelectValue placeholder="Skill" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filterData.skill?.map((l, i) => (
                                                <SelectItem value={l.idSkill}>{l.namaSkill}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}

                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button
                                type="button"
                                variant={"outline"}
                                size={"sm"}
                                onClick={handleReset}
                            >
                                <BadgeXIcon />
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                size={"sm"}

                            >
                                <FunnelIcon />
                                Filter
                            </Button>
                        </div>

                    </Form>
                </PopoverContent>
            </Popover>

            {activeFilter.team && (
                <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                    Team
                    <Separator orientation="vertical" className="mx-2" />
                    <Badge variant={"default"}>
                        {filterData.teams.find(team => team.idTeam === activeFilter.team)?.nama}
                    </Badge>
                </Button>
            )}
            {activeFilter.layanan && (
                <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                    Layanan
                    <Separator orientation="vertical" className="mx-2" />
                    <Badge variant={"default"}>
                        {filterData.layanan?.find(l => l.idLayanan === activeFilter.layanan)?.nama}
                    </Badge>
                </Button>
            )}
            {activeFilter.skill && (
                <Button variant={"outline"} className="border-dashed font-medium " size={"sm"}>
                    Skill
                    <Separator orientation="vertical" className="mx-2" />
                    <Badge variant={"default"}>
                        {filterData.skill?.find(l => l.idSkill === activeFilter.skill)?.namaSkill}
                    </Badge>
                </Button>
            )}
        </div>

    )
}