import type { Route } from "./+types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button";
import { useEffect } from "react";
import { getAllSkill, getUserData } from "./_service";
import { useNavigate } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {

    const allSkill = await getAllSkill(params.idUser)
    const userdata = await getUserData(params.idUser)

    return { allSkill, userdata }
}

export default function DetailSkill({ params, loaderData }: Route.ComponentProps) {

    const { allSkill, userdata } = loaderData

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

    const groupedSkills = Object.entries(allSkill.kuisProgress.reduce((acc: Record<string, Array<NonNullable<typeof allSkill.kuisProgress[0]['subSkill']>>>, kp) => {
        const skillId = kp.subSkill?.skill?.namaSkill;
        if (skillId && kp.subSkill) {
            if (!acc[skillId]) {
                acc[skillId] = [];
            }
            acc[skillId].push(kp.subSkill);
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
                                    {groupedSkills.map(([idSkill, subSkills], i) => (
                                        <div>
                                            <h6 className="font-semibold">{idSkill}</h6>
                                            <ul>
                                                {subSkills.map((ss, i) => (
                                                    <li>{ss.namaSubSkill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    {groupedSkills.length === 0 ? (
                                        <p className="text-center text-red-500">Belum melakukan kuis</p>
                                    ) : undefined}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="unskill">
                                <AccordionTrigger>Belum dikuasai</AccordionTrigger>
                                <AccordionContent className="">
                                    {/* <ScrollArea className="h-96 border rounded-md p-4">
                                        <div className=" flex flex-col gap-1.5">
                                            {unskilled.length > 0 ? (
                                                <>
                                                    {unskilled.map((s, i) => (
                                                        <Item variant="outline" key={i} size={"sm"}>
                                                            <ItemMedia variant="icon">
                                                                {i + 1}
                                                            </ItemMedia>
                                                            <ItemContent>
                                                                <ItemTitle>{s.judulDokumen}</ItemTitle>
                                                            </ItemContent>
                                                            <ItemActions>
                                                                <div className="bg-red-400 size-5 rounded" />
                                                            </ItemActions>
                                                        </Item>
                                                    ))}
                                                </>
                                            ) : undefined}
                                        </div>

                                    </ScrollArea> */}

                                </AccordionContent>
                            </AccordionItem>
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