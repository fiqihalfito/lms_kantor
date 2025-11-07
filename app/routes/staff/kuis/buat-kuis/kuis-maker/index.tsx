import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { createKuis, getDokumenDataById, getSoal } from "./_service";
import { data, Link, NavLink, Outlet, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRightIcon, CircleOffIcon, FilePlusIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "~/components/ui/item";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { getFlashSession } from "~/lib/session.server";
import { MyAlert } from "~/components/alert-custom";
import { Spinner } from "~/components/ui/spinner";
import { userContext } from "~/lib/context";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const { headers, flashData } = await getFlashSession(request)

    const dokumen = await getDokumenDataById(params.idDokumen)
    let idKuis = dokumen[0]?.idKuis
    if (!idKuis) {
        idKuis = await createKuis(user?.idSubBidang!, dokumen[0].idDokumen)
    }
    const soal = await getSoal(idKuis)

    // const currentKuis = await getCurrentKuis(dokumen[0].idKuis)
    // let idKuis: string | undefined = currentKuis[0]?.idKuis
    // if (currentKuis.length === 0) {
    //     const kuis = await createKuis(user?.idSubBidang!, dokumen[0].idDokumen)
    //     idKuis = kuis[0].idKuis
    // }


    return data({ dokumen, soal, idKuis, flashData }, { headers })
}


export default function KuisMaker({ params, loaderData }: Route.ComponentProps) {

    const { dokumen, soal, idKuis, flashData } = loaderData
    let location = useLocation()
    let currentPathname = location.pathname



    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Pembuatan Kuis</h1>
                    <p className="text-muted-foreground">Soal Soal Kuis dari dokumen "{dokumen[0].judul}"</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <Button variant={"outline"} className="cursor-pointer" size={"lg"} asChild >
                        <NavLink to={`../..`} relative="path" viewTransition>
                            {({ isPending }) => (
                                <>
                                    {isPending ? <Spinner /> : <ChevronLeft className="size-5" />}
                                    Kembali
                                </>
                            )}

                        </NavLink>
                    </Button>
                    <Button className="cursor-pointer" size={"lg"} asChild >
                        <Link to={`new`} viewTransition>
                            <FilePlusIcon className="size-5" />
                            Tambah Soal
                        </Link>
                    </Button>
                </div>

            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-x-4 h-full">
                <div className="border-4 rounded-lg border-dashed flex flex-col p-4">
                    {soal.length === 0 ? (
                        <div className="flex h-full items-center justify-center flex-col gap-3">
                            <div className="bg-muted border p-3.5 rounded-lg">
                                <CircleOffIcon />
                            </div>
                            <div className="text-center space-y-0.5">
                                <h2 className="font-semibold">Belum ada soal</h2>
                                <p className="text-muted-foreground text-sm">Silahkan tambah soal</p>
                            </div>
                        </div>
                    ) : (
                        <ItemGroup className="gap-4">
                            {flashData ? <MyAlert title={flashData.message} status={flashData.type} className="w-1/2x" /> : null}
                            {soal.map((s, i) => (
                                <Item variant="outline" key={s.idKuisElement} className="hover:bg-secondary">
                                    <ItemMedia variant="icon">
                                        {/* <ShieldAlertIcon /> */}
                                        {i + 1}
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>{s.soal}</ItemTitle>
                                        <ItemDescription>
                                            Jawaban : {s.jawaban?.toUpperCase()} . {s?.pilgan ? JSON.parse(s.pilgan)[s.jawaban!] : null}
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="cursor-pointer"
                                            disabled={`/${FIRST_SEGMENT}/kuis/buat-kuis/kuis-maker/${params.idDokumen}/review/${s.idKuisElement}` === currentPathname}
                                            type="button"
                                        >
                                            <NavLink to={`review/${s.idKuisElement}`} viewTransition>
                                                {({ isPending, isActive }) => (
                                                    <span className="flex items-center">
                                                        {isActive ? (
                                                            <>
                                                                Sedang direview
                                                                <ChevronRightIcon />
                                                            </>
                                                        ) : (
                                                            "Review"
                                                        )}
                                                    </span>
                                                )}
                                            </NavLink>
                                        </Button>
                                    </ItemActions>
                                </Item>
                            ))}
                        </ItemGroup>
                    )}
                </div>
                <div>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}