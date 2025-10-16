import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { createKuis, getCurrentKuis, getDokumenDataById, getSoal } from "./_service";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { CircleOffIcon, FilePlusIcon } from "lucide-react";

export async function loader({ request, params }: Route.LoaderArgs) {

    const dokumen = await getDokumenDataById(params.idDokumen)
    const currentKuis = await getCurrentKuis(dokumen[0].idDokumen)
    let idKuis: string | undefined = currentKuis[0]?.idKuis
    if (currentKuis.length === 0) {
        const kuis = await createKuis(dokumen[0].idDokumen)
        idKuis = kuis[0].idKuis
    }
    const soal = await getSoal(idKuis)

    return { dokumen, soal }
}


export default function KuisMaker({ params, loaderData }: Route.ComponentProps) {

    const { dokumen, soal } = loaderData
    console.log(soal);


    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Pembuatan Kuis</h1>
                    <p className="text-muted-foreground">Kuis dari dokumen "{dokumen[0].judul}"</p>
                </div>
                <Link to={`new`}>
                    <Button className="cursor-pointer" size={"lg"} >
                        <FilePlusIcon className="size-5" />
                        Tambah Soal
                    </Button>
                </Link>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-x-4 h-full">
                <div className="border-4 rounded-lg border-dashed flex flex-col">
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
                    ) : null}
                </div>
                <div></div>
            </div>

        </div>
    )
}