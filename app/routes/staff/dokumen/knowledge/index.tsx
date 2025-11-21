import { userContext } from "~/lib/context"
import type { Route } from "./+types"
import { getTeamSkilldanSubskill } from "./_service"
import { Separator } from "~/components/ui/separator"
import { Card } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Link } from "react-router"
import { FileText, HelpCircle } from "lucide-react"

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const url = new URL(request.url)
    const idTeam = url.searchParams.get("idTeam") || user.idTeam
    const teamSkilldanSubskill = await getTeamSkilldanSubskill(user.idSubBidang, user.idUser, { idTeam })

    return { teamSkilldanSubskill }
}

export default function KnowledgePage({ loaderData }: Route.ComponentProps) {

    const { teamSkilldanSubskill } = loaderData

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Knowledge</h1>
                    <p className="text-muted-foreground">Knowledge berisi dokumen dan kuis</p>
                </div>
                <div className="flex items-center gap-x-2">

                </div>

            </div>
            <Separator />
            <div>
                <div className="space-y-6">
                    {teamSkilldanSubskill.map((team) => (
                        <div key={team.idTeam} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold">{team.nama}</h2>
                                <Badge variant="outline" className="text-xs">
                                    {team.skill.length} Skill
                                </Badge>
                            </div>

                            <div className="grid gap-4">
                                {team.skill.map((skill) => (
                                    <Card key={skill.idSkill} className="p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="font-medium text-lg">{skill.namaSkill}</h3>
                                        </div>

                                        <div className="space-y-4">
                                            {skill.subSkill.map((sub) => {
                                                // @ts-ignore
                                                const dokumen = sub.dokumen
                                                // @ts-ignore
                                                const statusBaca = dokumen?.statusBaca[0]
                                                // @ts-ignore
                                                const kuis = dokumen?.kuis
                                                // @ts-ignore
                                                const kuisProgress = kuis?.kuisProgress[0]
                                                // @ts-ignore
                                                const jumlahSoal = kuis?.kuisElement.length || 0
                                                const pic = sub.pic

                                                const isDokumenRead = statusBaca?.isRead || false
                                                const isKuisDone = kuisProgress?.isSelesai || false
                                                const hasDokumen = !!dokumen
                                                const hasKuis = !!kuis && jumlahSoal > 0

                                                return (
                                                    <div key={sub.idSubSkill} className="rounded-lg border p-4 bg-card/50">
                                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="font-medium">{sub.namaSubSkill}</h4>
                                                                    {pic && (
                                                                        <Badge variant="secondary" className="text-[10px]">
                                                                            PIC: {pic.nama}
                                                                        </Badge>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                                                    <div className="flex items-center gap-1">
                                                                        <FileText className="h-3 w-3" />
                                                                        <span>
                                                                            {hasDokumen
                                                                                ? (isDokumenRead ? "Sudah Dibaca" : "Belum Dibaca")
                                                                                : "Belum ada materi"
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    {hasKuis && (
                                                                        <>
                                                                            <Separator orientation="vertical" className="h-4" />
                                                                            <div className="flex items-center gap-1">
                                                                                <HelpCircle className="h-3 w-3" />
                                                                                <span>
                                                                                    {isKuisDone
                                                                                        ? `Nilai: ${kuisProgress?.jumlahBenar}/${jumlahSoal}`
                                                                                        : `${jumlahSoal} Soal`
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant={isDokumenRead ? "outline" : "default"}
                                                                    size="sm"
                                                                    disabled={!hasDokumen}
                                                                    asChild={hasDokumen}
                                                                >
                                                                    {hasDokumen ? (
                                                                        <Link to={`/staff/dokumen/knowledge/${dokumen.idDokumen}/baca`}>
                                                                            {isDokumenRead ? "Baca Ulang" : "Baca Materi"}
                                                                        </Link>
                                                                    ) : (
                                                                        <span>Belum Ada Materi</span>
                                                                    )}
                                                                </Button>

                                                                <Button
                                                                    variant={isKuisDone ? "secondary" : "default"}
                                                                    size="sm"
                                                                    disabled={!hasKuis || !isDokumenRead}
                                                                    asChild={hasKuis && isDokumenRead}
                                                                >
                                                                    {hasKuis && isDokumenRead ? (
                                                                        <Link to={`/staff/dokumen/knowledge/${dokumen.idDokumen}/kuis`}>
                                                                            {isKuisDone ? "Lihat Hasil" : "Mulai Kuis"}
                                                                        </Link>
                                                                    ) : (
                                                                        <span>
                                                                            {!hasKuis ? "Belum Ada Kuis" : "Baca Materi Dulu"}
                                                                        </span>
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {skill.subSkill.length === 0 && (
                                                <div className="text-center text-sm text-muted-foreground py-4">
                                                    Belum ada subskill
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                                {team.skill.length === 0 && (
                                    <div className="text-center text-sm text-muted-foreground py-8 border rounded-lg border-dashed">
                                        Belum ada skill di team ini
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}