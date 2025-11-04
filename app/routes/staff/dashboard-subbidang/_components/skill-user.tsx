import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet"
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

type SkillUserType = {
    idUser: string
}

export function SkillUser() {



    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size={"sm"}>Lihat Skill</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Skill Member</SheetTitle>
                    <SheetDescription>
                        {/* Make changes to your profile here. Click save when you&apos;re done. */}
                        {/* {nama} */}
                    </SheetDescription>
                </SheetHeader>
                <div className=" gap-6 px-4">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                    // defaultValue="item-1"
                    >
                        <AccordionItem value="skill">
                            <AccordionTrigger>Skill Terupdate</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-1.5">
                                {/* {!!kuisProgress ? (
                                    <>
                                        {kuisProgress.map((s, i) => (
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
                                ) : undefined} */}
                                <p>dsf</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="unskill">
                            <AccordionTrigger>Belum dikuasai</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-1.5">
                                <p>
                                    We offer worldwide shipping through trusted courier partners.
                                    Standard delivery takes 3-5 business days, while express shipping
                                    ensures delivery within 1-2 business days.
                                </p>
                                <p>
                                    All orders are carefully packaged and fully insured. Track your
                                    shipment in real-time through our dedicated tracking portal.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div>

                </div>
                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
