import { userContext } from "~/lib/context"
import { getSkilldanSubskill } from "./_service"
import { Separator } from "~/components/ui/separator"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Link, Outlet, useSubmit } from "react-router"
import { CircleOffIcon, EyeIcon, FileCheckIcon, FileText, FileXIcon, HelpCircle, PencilOffIcon, Repeat1Icon, RepeatIcon } from "lucide-react"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemTitle } from "~/components/ui/item"
import { FieldGroup, FieldSeparator } from "~/components/ui/field"
import type { Route } from "./+types"
import { FIRST_SEGMENT } from "~/lib/route-config"

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const skilldanSubskill = await getSkilldanSubskill(params.idSkill, user.idUser)

    return { skilldanSubskill }
}

export default function KnowledgePage({ loaderData }: Route.ComponentProps) {

    const { skilldanSubskill } = loaderData

    const mulaiKuisSubmit = useSubmit()
    const handleMulaiKuis = (idKuis?: string | null) => {
        if (!idKuis) return

        mulaiKuisSubmit(null, {
            action: `/${FIRST_SEGMENT}/kuis/mulai-kuis/init/${idKuis}`,
            method: "post"
        })
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Knowledge</h1>
                    <p className="text-muted-foreground">Berisi subskill yang harus dilengkapi</p>
                </div>
                <div className="flex items-center gap-x-2">

                </div>

            </div>
            <Separator />

            <Outlet />

            <div>
                {skilldanSubskill.length === 0 ? (
                    <EmptyData />
                ) : (
                    skilldanSubskill.map((s, i) => (
                        <Card className="rounded-md " key={s.idSkill}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">{s.namaSkill}</CardTitle>
                                {/* <CardDescription className="text-sm">sdfsf</CardDescription> */}
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            <CardContent>
                                {s.subSkill.length === 0 ? (
                                    <EmptyData />
                                ) : (
                                    <div className="flex flex-col">
                                        {Object.entries(
                                            s.subSkill.reduce((acc: Record<string, typeof s.subSkill[number][]>, sub) => {
                                                const level = sub.level;
                                                if (!acc[level]) acc[level] = [];
                                                acc[level].push(sub);
                                                return acc;
                                            }, {})
                                        ).map(([level, subSkills], indexPerLevel, totalLevels) => (
                                            <div key={level}>
                                                <div className="flex flex-col px-4 pb-6 border rounded-md shadow-lg">
                                                    <div className="flex items-center justify-center gap-4 my-6">
                                                        {/* <Separator className="relative border-dashed">
                                                            <span className="absolute text-black font-bold bg-white px-8 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 rounded-md">Level {level}</span>
                                                        </Separator> */}
                                                        <span className="font-bold px-8 border-3 rounded-md">Level {level}</span>

                                                    </div>
                                                    <ItemGroup className="flex flex-col gap-4">
                                                        {subSkills.map((sub, i) => (
                                                            <Item variant="outline" key={sub.idSubSkill} className="shadow-md">
                                                                <ItemMedia variant="icon" className="self-start">
                                                                    {i + 1}
                                                                </ItemMedia>
                                                                <ItemContent className="flex flex-col gap-4">
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <ItemTitle className="text-base font-semibold">{sub.namaSubSkill}</ItemTitle>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">

                                                                        {/* status baca */}
                                                                        {sub.dokumen?.statusBaca.length > 0 && sub.dokumen?.statusBaca[0].isRead ? (
                                                                            <Badge className="py-1.5 px-3 [&>svg]:size-4 rounded-full bg-green-500">
                                                                                <FileCheckIcon />
                                                                                Sudah Baca
                                                                            </Badge>
                                                                        ) : (
                                                                            <Badge variant={"destructive"} className="py-1.5 px-3 [&>svg]:size-4 rounded-full">
                                                                                <FileXIcon />
                                                                                Belum Baca
                                                                            </Badge>
                                                                        )}

                                                                        {/* status kuis  */}
                                                                        {sub.dokumen?.kuis?.kuisProgress[0] && sub.dokumen?.kuis?.kuisProgress[0].isSelesai ? (
                                                                            <Badge className="py-1.5 px-3 [&>svg]:size-4 rounded-full bg-green-500">
                                                                                <FileCheckIcon />
                                                                                Kuis Selesai
                                                                            </Badge>
                                                                        ) : (
                                                                            <Badge variant={"destructive"} className="py-1.5 px-3 [&>svg]:size-4 rounded-full">
                                                                                <FileXIcon />
                                                                                Belum Kuis
                                                                            </Badge>
                                                                        )}


                                                                    </div>
                                                                    <div>
                                                                        <Badge variant="secondary" className="rounded-full">PIC: {sub.pic?.nama}</Badge>
                                                                        {sub.dokumen?.kuis?.kuisProgress[0] && <Badge variant="secondary" className="rounded-full">Skor: {sub.dokumen?.kuis?.kuisProgress[0].jumlahBenar} / {sub.dokumen?.kuis?.kuisElement.length}</Badge>}
                                                                    </div>
                                                                </ItemContent>
                                                                <ItemActions>
                                                                    {sub.dokumen ? (
                                                                        <Button size="default" asChild>
                                                                            <Link to={`baca/${sub.dokumen.idDokumen}`} viewTransition>
                                                                                <EyeIcon />
                                                                                Baca
                                                                            </Link>
                                                                        </Button>
                                                                    ) : (
                                                                        <Button size="default" disabled>
                                                                            <FileXIcon />
                                                                            Dokumen belum ada
                                                                        </Button>
                                                                    )}

                                                                    {sub.dokumen?.kuis ? (
                                                                        sub.dokumen.statusBaca[0]?.isRead ? (
                                                                            sub.dokumen.kuis.kuisElement.length > 0 ? (
                                                                                sub.dokumen.kuis.kuisProgress[0]?.isSelesai ? (
                                                                                    <Button size="default" onClick={() => handleMulaiKuis(sub.dokumen?.kuis?.idKuis)}>
                                                                                        <RepeatIcon />
                                                                                        Ulangi Kuis
                                                                                    </Button>
                                                                                ) : (
                                                                                    <Button size="default" onClick={() => handleMulaiKuis(sub.dokumen?.kuis?.idKuis)}>
                                                                                        <EyeIcon />
                                                                                        Mulai Kuis
                                                                                    </Button>
                                                                                )
                                                                            ) : (
                                                                                <Button size="default" disabled>
                                                                                    <HelpCircle />
                                                                                    Kuis belum ada soal
                                                                                </Button>
                                                                            )
                                                                        ) : (
                                                                            <Button size="default" disabled>
                                                                                <PencilOffIcon />
                                                                                Baca dokumen dulu
                                                                            </Button>
                                                                        )
                                                                    ) : (
                                                                        <Button size="default" disabled>
                                                                            <PencilOffIcon />
                                                                            Kuis belum ada
                                                                        </Button>
                                                                    )}

                                                                </ItemActions>
                                                                {/* <ItemFooter>

                                                                </ItemFooter> */}
                                                            </Item>
                                                        ))}
                                                    </ItemGroup>
                                                </div>
                                                {indexPerLevel !== totalLevels.length - 1 && (
                                                    <Separator orientation="vertical" className="data-[orientation=vertical]:h-40 mx-auto my-4" />
                                                )}
                                            </ div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            {/* <CardFooter>
                                        <p>Card Footer</p>
                                    </CardFooter> */}
                        </Card>
                    ))
                )}
            </div>

        </div>
    )
}

function EmptyData() {
    return (
        <div className="flex h-full items-center justify-center flex-col gap-3">
            <div className="bg-muted border p-2 rounded-lg">
                <CircleOffIcon />
            </div>
            <div className="text-center space-y-0.5">
                <h2 className="font-semibold">Belum ada skill</h2>
                <p className="text-muted-foreground text-sm">Silahkan tambah skill</p>
            </div>
        </div>
    )
}