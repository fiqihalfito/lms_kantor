import { Separator } from "~/components/ui/separator"
import type { getDokumenSudahDibaca, getKuisSelesai } from "../_service"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { Badge } from "~/components/ui/badge"
import { EmptyList } from "./empty-list"


type KuisSudahSelesaiProp = {
    kuisSudahSelesai: Awaited<ReturnType<typeof getKuisSelesai>>
}

export function KuisSudahSelesai({ kuisSudahSelesai }: KuisSudahSelesaiProp) {
    return (
        <div className="border rounded-md p-4 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl tracking-tight">Kuis Sudah Selesai</h1>
                <Badge className="px-3 py-2 rounded-full text-sm">Jumlah Kuis Selesai : {kuisSudahSelesai.length} kuis</Badge>
            </div>
            <Separator className="bg-border" />
            <div className="flex-1">
                {kuisSudahSelesai.length === 0 ? (
                    <EmptyList />
                ) : (
                    <ItemGroup className="flex flex-col gap-y-1.5">
                        {kuisSudahSelesai.map((kp, i) => (
                            <Item key={kp.idKuisProgress} variant="outline" size={"sm"}>
                                <ItemMedia variant="icon">
                                    {i + 1}
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>{kp.subSkill?.namaSubSkill}</ItemTitle>
                                </ItemContent>
                            </Item>
                        ))}
                    </ItemGroup>
                )}

            </div>
        </div>
    )
}