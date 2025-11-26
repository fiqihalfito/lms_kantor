import { userContext } from "~/lib/context"
import { getSkilldanSubskill } from "./_service"
import { Separator } from "~/components/ui/separator"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Link, Outlet, useSubmit } from "react-router"
import { ArrowDownIcon, CircleOffIcon, EyeIcon, FileCheckIcon, FileText, FileXIcon, HelpCircle, LockIcon, PencilOffIcon, Repeat1Icon, RepeatIcon } from "lucide-react"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemTitle } from "~/components/ui/item"
import { FieldGroup, FieldSeparator } from "~/components/ui/field"
import type { Route } from "./+types"
import { FIRST_SEGMENT } from "~/lib/route-config"
import { cn } from "~/lib/utils"

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
                                        ).map(([level, subSkills], indexPerLevel, totalLevels) => {

                                            const { isPreviousLevelBlocked, progressPercentage } = indexPerLevel > 0 ? (() => {
                                                const [prevLevelName, prevSubSkills] = totalLevels[indexPerLevel - 1];
                                                // let totalAchievedScore = 0;
                                                // let totalPossibleScore = 0;
                                                let totalPersenPerSubSkill = 0;

                                                prevSubSkills.forEach((prevSub) => {
                                                    if (prevSub.dokumen?.kuis) {
                                                        const jumlahBenar = prevSub.dokumen.kuis?.kuisProgress[0]?.jumlahBenar ?? 0;
                                                        const jumlahSoal = (prevSub.dokumen.kuis?.kuisElement.length ?? 0);
                                                        totalPersenPerSubSkill += (jumlahBenar / jumlahSoal) * 100;
                                                    } else {
                                                        totalPersenPerSubSkill += 0;
                                                    }
                                                });

                                                const progressPercentage = totalPersenPerSubSkill / prevSubSkills.length;
                                                const isPreviousLevelBlocked = progressPercentage < 80;
                                                // const isPreviousLevelNotCompleted = prevSubSkills.some((sub) => {
                                                //     return sub.dokumen === null || sub.dokumen?.idKuis === null || sub.dokumen?.kuis?.kuisProgress[0] === null || sub.dokumen?.kuis?.kuisProgress[0]?.isSelesai !== true
                                                // });

                                                return { isPreviousLevelBlocked, progressPercentage };
                                            })() : { isPreviousLevelBlocked: false, progressPercentage: 0 };

                                            const currentLevelProgressPercentage = (() => {
                                                let totalPersenPerSubSkill = 0;

                                                subSkills.forEach((currentSub) => {
                                                    if (currentSub.dokumen?.kuis) {
                                                        const jumlahBenar = currentSub.dokumen.kuis?.kuisProgress[0]?.jumlahBenar ?? 0;
                                                        const jumlahSoal = (currentSub.dokumen.kuis?.kuisElement.length ?? 0);
                                                        totalPersenPerSubSkill += (jumlahBenar / jumlahSoal) * 100;
                                                    } else {
                                                        totalPersenPerSubSkill += 0;
                                                    }
                                                });
                                                return totalPersenPerSubSkill / subSkills.length;
                                            })();


                                            return (
                                                <div key={level}>
                                                    <div className="flex flex-col px-4 pb-6 border rounded-md shadow-lg">
                                                        <div className="flex flex-col items-center justify-center gap-2 my-6">
                                                            {/* <Separator className="relative border-dashed">
                                                            <span className="absolute text-black font-bold bg-white px-8 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 rounded-md">Level {level}</span>
                                                        </Separator> */}
                                                            <span className="font-bold px-8 border-3 rounded-md">Level {level}</span>

                                                            {isPreviousLevelBlocked ? (
                                                                <div className="flex items-center gap-2 text-red-500 font-medium text-sm">
                                                                    <CircleOffIcon className="size-4" />
                                                                    <p>Selesaikan kuis level sebelumnya dengan minimal 80% untuk melanjutkan. (Saat ini: {progressPercentage.toFixed(2)}%)</p>

                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                                                                    <Badge
                                                                        variant={currentLevelProgressPercentage < 80 ? "destructive" : "default"}
                                                                        className={cn(`rounded-full text-sm px-4 py-1`, currentLevelProgressPercentage >= 80 && "bg-green-600")}
                                                                    >
                                                                        Progress Level: {currentLevelProgressPercentage.toFixed(2)}%
                                                                    </Badge>
                                                                </div>
                                                            )}

                                                            {/* {isPreviousLevelNotCompleted && (
                                                                <div className="flex items-center gap-2 text-red-500 font-medium text-sm">
                                                                    <CircleOffIcon className="size-4" />
                                                                    <p>ada kuis yang belum selesai</p>
                                                                </div>
                                                            )} */}

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
                                                                            {sub.dokumen?.kuis?.kuisElement.length && sub.dokumen.kuis.kuisElement.length > 0 && <Badge variant="secondary" className="rounded-full">Jumlah Soal: {sub.dokumen.kuis.kuisElement.length}</Badge>}
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
                                                                                    !isPreviousLevelBlocked ? (
                                                                                        // !isPreviousLevelNotCompleted ? (
                                                                                        //     sub.dokumen.kuis.kuisProgress[0]?.isSelesai ? (
                                                                                        //         <Button size="default" onClick={() => handleMulaiKuis(sub.dokumen?.kuis?.idKuis)}>
                                                                                        //             <RepeatIcon />
                                                                                        //             Ulangi Kuis
                                                                                        //         </Button>
                                                                                        //     ) : (
                                                                                        //         <Button size="default" onClick={() => handleMulaiKuis(sub.dokumen?.kuis?.idKuis)}>
                                                                                        //             <EyeIcon />
                                                                                        //             Mulai Kuis
                                                                                        //         </Button>
                                                                                        //     )
                                                                                        // ) : (
                                                                                        //     <Button size="default" disabled>
                                                                                        //         <LockIcon />
                                                                                        //         Kuis lainnya belum selesai
                                                                                        //     </Button>
                                                                                        // )
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
                                                                                            <LockIcon />
                                                                                            Level sebelumnya belum lulus 80%
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
                                                        // <Separator orientation="vertical" className="data-[orientation=vertical]:h-40 mx-auto my-4" />
                                                        <div className="flex flex-col items-center my-4">
                                                            <div className="h-32 border-l-2 border-black/50 border-dashed" />
                                                            <ArrowDownIcon className="size-6 text-black/50" />
                                                            {/* <div className="h-16 border-l-2 border-black/50 border-dashed" /> */}
                                                        </div>
                                                    )}
                                                </ div>
                                            )
                                        })
                                        }
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