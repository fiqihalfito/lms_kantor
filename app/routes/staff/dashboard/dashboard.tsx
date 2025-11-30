import { userContext } from "~/lib/context";
import type { Route } from "./+types/dashboard";
import { Separator } from "~/components/ui/separator";
import { ProfilSection } from "./_components/profil-section";
import { getDokumenSudahDibaca, getKuisSelesai, getNamaTeam } from "./_service";
import { DokumenSudahDibaca } from "./_components/dokumen-sudah-dibaca";
import { KuisSudahSelesai } from "./_components/kuis-sudah-selesai";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const namaTeam = await getNamaTeam(user.idTeam!)
    const dokumenSudahDibaca = await getDokumenSudahDibaca(user.idUser)
    const kuisSudahSelesai = await getKuisSelesai(user.idUser)


    return { user, namaTeam, dokumenSudahDibaca, kuisSudahSelesai }
}


export default function DashboardPage({ loaderData }: Route.ComponentProps) {

    const { user, namaTeam, dokumenSudahDibaca, kuisSudahSelesai } = loaderData

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Informasi Progress User</p>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-8">
                <ProfilSection user={user} namaTeam={namaTeam} />
                <div className="grid grid-cols-2 gap-4">
                    <DokumenSudahDibaca dokumenSudahDibaca={dokumenSudahDibaca} />
                    <KuisSudahSelesai kuisSudahSelesai={kuisSudahSelesai} />

                </div>
            </div>
        </div>
    )
}