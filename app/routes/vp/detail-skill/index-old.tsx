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

export async function loader({ request, params }: Route.LoaderArgs) {

    const userdata = await getUserData(params.idUser)
    const allSubSkill = await getAllSubSkillByLevel(params.idUser, userdata.idTeam!)

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

    const groupedSkills = Object.entries(allSubSkill.reduce((acc: Record<string, { subskills: Array<NonNullable<typeof allSubSkill[number]>>, jumlahSubskill: number }>, ss) => {
        const namaSkill = ss.skill?.idTeam === userdata.idTeam ? ss.skill?.namaSkill : undefined;
        if (namaSkill) {
            if (!acc[namaSkill]) {
                acc[namaSkill] = {
                    subskills: [],
                    jumlahSubskill: allSubSkill.filter(s => s.skill?.namaSkill === namaSkill).length
                };
            }
            if (ss.kuisProgress?.length > 0) {
                acc[namaSkill].subskills.push(ss);
            }
        }
        return acc;
    }, {}));


    return (
        <div className="fixed inset-0 z-50 bg-black/50">
            <div className="fixed inset-y-0 right-0 z-50 
                flex flex-col gap-4 
                h-full w-3/4 sm:max-w-md 
                border-l bg-background shadow-lg p-4">

                <div className="flex-1 flex flex-col  gap-4">
                    <h1 className="font-semibold text-3xl">{userdata.nama}</h1>
                    <div className="flex-1 gap-6 px-4">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                        // defaultValue="item-1"
                        >
                            <AccordionItem value="skill">
                                <AccordionTrigger>Skill Terupdate</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-2">
                                        {groupedSkills.map(([namaSkill, item]) => (
                                            <div className="flex flex-col gap-2 border-2 rounded-md p-2">
                                                <div className="flex justify-between items-center">
                                                    <h6 className="font-semibold">{namaSkill}</h6>
                                                    <Badge className="rounded-full">{item.subskills.length}/{item.jumlahSubskill}</Badge>
                                                </div>
                                                <ul>
                                                    {item.subskills.map((ss, i) => (
                                                        <li>{ss.namaSubSkill}</li>
                                                    ))}
                                                </ul>
                                                {item.subskills.length == 0 ? (
                                                    <p className="text-center text-red-500">Belum melakukan kuis</p>
                                                ) : undefined}
                                            </div>
                                        ))}
                                    </div>

                                    {groupedSkills.length === 0 ? (
                                        <p className="text-center text-red-500">Belum melakukan kuis</p>
                                    ) : undefined}
                                </AccordionContent>
                            </AccordionItem>
                            {/* <AccordionItem value="unskill">
                                <AccordionTrigger>Belum dikuasai</AccordionTrigger>
                                <AccordionContent className="">
                                 

                                </AccordionContent>
                            </AccordionItem> */}
                        </Accordion>
                    </div>
                    <div className="flex">
                        <Button size={"lg"} className="w-full cursor-pointer" onClick={() => navigate(-1)}>
                            Tutup
                        </Button>
                    </div>
                </div>
            </div>


        </div>
    )
}