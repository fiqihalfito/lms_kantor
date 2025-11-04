import type { Route } from "./+types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button";
import { useEffect } from "react";
import { getAllSkill, getUnskilled, getUserData } from "./_service";
import { userContext } from "~/lib/context";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useNavigate } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const allSkill = await getAllSkill(user?.idUser!)
    const idSkilled = allSkill.flatMap(s =>
        s.kuis?.idDokumen ? [s.kuis.idDokumen] : []
    );
    const unskilled = await getUnskilled(user?.idSubBidang!, idSkilled)
    const userdata = await getUserData(params.idUser)

    return { allSkill, unskilled, userdata }
}

export default function DetailSkill({ params, loaderData }: Route.ComponentProps) {

    const { allSkill, unskilled, userdata } = loaderData

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
                                <AccordionContent className="">
                                    <ScrollArea className="h-96 border rounded-md p-4">
                                        <div className=" flex flex-col gap-1.5">
                                            {allSkill.length > 0 ? (
                                                <>
                                                    {allSkill.map((s, i) => (
                                                        <Item variant="outline" key={i} size={"sm"}>
                                                            <ItemMedia variant="icon">
                                                                {i + 1}
                                                            </ItemMedia>
                                                            <ItemContent>
                                                                <ItemTitle>{s.kuis?.dokumen.judul}</ItemTitle>
                                                            </ItemContent>
                                                            <ItemActions>
                                                                <div className="bg-green-400 size-5 rounded" />
                                                            </ItemActions>
                                                        </Item>
                                                    ))}
                                                </>
                                            ) : undefined}
                                        </div>

                                    </ScrollArea>

                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="unskill">
                                <AccordionTrigger>Belum dikuasai</AccordionTrigger>
                                <AccordionContent className="">
                                    <ScrollArea className="h-96 border rounded-md p-4">
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

                                    </ScrollArea>

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