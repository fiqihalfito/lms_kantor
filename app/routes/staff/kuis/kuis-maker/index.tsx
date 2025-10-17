import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { createKuis, getCurrentKuis, getDokumenDataById, getSoal } from "./_service";
import { data, Link, NavLink, Outlet, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { ChevronRightIcon, CircleOffIcon, FilePlusIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "~/components/ui/item";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { tKuisElement } from "database/schema/schema";
import { getFlashSession } from "~/lib/session.server";
import { MyAlert } from "~/components/alert-custom";

export async function loader({ request, params }: Route.LoaderArgs) {

    const { headers, flashData } = await getFlashSession(request)

    const dokumen = await getDokumenDataById(params.idDokumen)
    const currentKuis = await getCurrentKuis(dokumen[0].idDokumen)
    let idKuis: string | undefined = currentKuis[0]?.idKuis
    if (currentKuis.length === 0) {
        const kuis = await createKuis(dokumen[0].idDokumen)
        idKuis = kuis[0].idKuis
    }
    const soal = await getSoal(idKuis)

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
                <Link to={`new`} viewTransition>
                    <Button className="cursor-pointer" size={"lg"} >
                        <FilePlusIcon className="size-5" />
                        Tambah Soal
                    </Button>
                </Link>
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
                                        {/* <ItemDescription>
                                            New login detected from unknown device.
                                        </ItemDescription> */}
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="cursor-pointer"
                                            disabled={`/${FIRST_SEGMENT}/kuis/kuis-maker/${params.idDokumen}/review/${s.idKuisElement}` === currentPathname}
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