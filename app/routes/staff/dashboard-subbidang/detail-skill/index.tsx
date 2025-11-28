import type { Route } from "./+types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button";
import { useEffect } from "react";
import { getAllSubSkillByLevel, getUserData } from "./_service";
import { useNavigate } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { CirclePercent, PercentIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export async function loader({ request, params }: Route.LoaderArgs) {

    const userdata = await getUserData(params.idUser)
    const allSubSkill = await getAllSubSkillByLevel(params.idUser, params.idSkill)

    return { allSubSkill, userdata }
}

export default function DetailSkill({ params, loaderData }: Route.ComponentProps) {

    const { allSubSkill, userdata } = loaderData

    // background lock scroll
    useEffect(() => {
        // Kunci scroll body saat sheet aktif
        document.body.classList.add("overflow-hidden");

        // Bersihkan saat sheet di-unmount
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const navigate = useNavigate()


    return (
        <div className="fixed inset-0  bg-black/50 z-99 flex items-center justify-center">

            <div className="w-3/4 h-5/6 bg-white rounded-md p-8 relative flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">{userdata.nama}</h1>
                    <Button onClick={() => navigate(-1)}>Tutup</Button>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{allSubSkill.namaSkill}</h2>
                    {(() => {

                        let totalPersenSkill = 0

                        allSubSkill.groupedLevelSubSkill.forEach(([level, subSkills], i) => {

                            let totalPersenSubSkill = 0
                            subSkills.forEach((ss) => {
                                const jumlahBenar = ss.kuisProgress[0]?.jumlahBenar ?? 0;
                                const totalKuisElement = ss.kuisProgress[0]?.kuis?.kuisElement.length ?? 0;
                                const percentage = totalKuisElement > 0 ? (jumlahBenar / totalKuisElement) * 100 : 0;
                                totalPersenSubSkill += percentage;
                            });
                            // const persenSubSkill = totalPersenSubSkill / subSkills.length;
                            totalPersenSkill += totalPersenSubSkill;

                        });

                        const sumSubskill = allSubSkill.groupedLevelSubSkill.reduce((acc, [level, subSkills]) => acc + subSkills.length, 0);

                        // const persenSkill = totalPersenSkill / allSubSkill.groupedLevelSubSkill.length;
                        const persenSkill = totalPersenSkill / sumSubskill;


                        return (
                            <>
                                <Badge className="rounded-full py-2 px-4 [&>svg]:size-5 [&>svg]:mr-2 text-sm" variant="default">
                                    <PercentIcon />
                                    Progress Skill : {persenSkill.toFixed(2)}%
                                </Badge>
                            </>
                        )
                    })()}
                </div>
                <div className=" flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="space-y-6">
                            {allSubSkill.groupedLevelSubSkill.map(([level, subSkills], i) => (
                                <div>
                                    <div className="flex justify-start  gap-x-2">
                                        <h1 className="text-base font-semibold text-black/80 mb-2">Level {level}</h1>
                                        <div>
                                            {(() => {

                                                let totalPersenSubSkill = 0

                                                subSkills.forEach((ss) => {
                                                    const jumlahBenar = ss.kuisProgress[0]?.jumlahBenar ?? 0;
                                                    const totalKuisElement = ss.kuisProgress[0]?.kuis?.kuisElement.length ?? 0;
                                                    const percentage = totalKuisElement > 0 ? (jumlahBenar / totalKuisElement) * 100 : 0;
                                                    totalPersenSubSkill += percentage;
                                                });

                                                const persenSubSkill = totalPersenSubSkill / subSkills.length;

                                                return (

                                                    <Badge
                                                        className={cn("rounded-full", persenSubSkill > 80 && "bg-green-600")}
                                                        variant={persenSubSkill > 80 ? "default" : "destructive"}
                                                    >
                                                        Progress Level {level}: {persenSubSkill.toFixed(2)}%
                                                    </Badge>

                                                )
                                            })()}
                                        </div>

                                    </div>
                                    <ItemGroup className="flex flex-col gap-y-1">
                                        {subSkills.map((ss, i) => (
                                            <Item variant="outline" size={"sm"}>
                                                <ItemMedia variant="icon">
                                                    {i + 1}
                                                </ItemMedia>
                                                <ItemContent>
                                                    <ItemTitle>{ss.namaSubSkill}</ItemTitle>

                                                </ItemContent>
                                                <ItemContent>
                                                    <div className="flex items-center gap-x-2">
                                                        {(() => {
                                                            const totalKuisElement = ss.kuisProgress[0]?.kuis?.kuisElement.length;
                                                            if (!totalKuisElement) {
                                                                return (
                                                                    <Badge className="rounded-full" variant="secondary">Belum ada soal</Badge>
                                                                );
                                                            }
                                                            const jumlahBenar = ss.kuisProgress[0]?.jumlahBenar ?? 0;
                                                            return (
                                                                <Badge className="rounded-full" variant="secondary">Jumlah benar : {jumlahBenar} / {totalKuisElement}</Badge>
                                                            );
                                                        })()}


                                                        {(() => {
                                                            const jumlahBenar = ss.kuisProgress[0]?.jumlahBenar ?? 0;
                                                            const totalKuisElement = ss.kuisProgress[0]?.kuis?.kuisElement.length ?? 0;
                                                            const percentage = totalKuisElement > 0 ? (jumlahBenar / totalKuisElement) * 100 : 0;
                                                            const displayPercentage = percentage.toFixed(0);
                                                            return (
                                                                <Badge
                                                                    className={cn("rounded-full", percentage > 80 && "bg-green-600")}
                                                                    variant={percentage > 80 ? "default" : "destructive"}>
                                                                    Persentase : {displayPercentage}%
                                                                </Badge>
                                                            );
                                                        })()}

                                                    </div>

                                                </ItemContent>
                                                {/* <ItemActions>
                                                    <Button size="sm" variant="outline">
                                                        Review
                                                    </Button>
                                                </ItemActions> */}
                                            </Item>
                                        ))}
                                    </ItemGroup>
                                </div>
                            ))}
                        </div>

                    </ScrollArea>
                </div>


            </div>

        </div >

    )
}