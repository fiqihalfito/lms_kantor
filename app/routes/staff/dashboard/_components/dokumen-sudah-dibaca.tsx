import { Separator } from "~/components/ui/separator"
import type { getDokumenSudahDibaca } from "../_service"
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


type DokumenSudahDibacaProp = {
    dokumenSudahDibaca: Awaited<ReturnType<typeof getDokumenSudahDibaca>>
}

export function DokumenSudahDibaca({ dokumenSudahDibaca }: DokumenSudahDibacaProp) {
    return (
        <div className="border rounded-md p-4 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl tracking-tight">Dokumen Sudah Dibaca</h1>
                <Badge className="px-3 py-2 rounded-full text-sm">Jumlah Dokumen Dibaca : {dokumenSudahDibaca.length} dokumen</Badge>
            </div>
            <Separator className="bg-border" />
            <div>
                {dokumenSudahDibaca.length === 0 ? (
                    <EmptyList />
                ) : (
                    <ItemGroup className="flex flex-col gap-y-1.5">
                        {dokumenSudahDibaca.map((dok, i) => (
                            <Item key={dok.idDokumen} variant="outline" size={"sm"}>
                                <ItemMedia variant="icon">
                                    {i + 1}
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>{dok.dokumen?.judul}</ItemTitle>
                                </ItemContent>
                            </Item>
                        ))}
                    </ItemGroup>
                )}

            </div>
        </div>
    )
}