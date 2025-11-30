import { ArrowUpRightIcon, CircleXIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"

export function EmptyList() {
    return (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CircleXIcon />
                </EmptyMedia>
                <EmptyTitle>Tidak ada data</EmptyTitle>
                <EmptyDescription>
                    List data tidak ditemukan, silahkan lakukan kegiatan tersebut
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
