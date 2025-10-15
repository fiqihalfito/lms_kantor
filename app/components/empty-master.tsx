import type { LucideIcon } from "lucide-react"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"

type EmptyMasterProp = {
    Icon: LucideIcon
    title: string
}

export function EmptyMaster({ Icon, title }: EmptyMasterProp) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Icon />
                </EmptyMedia>
                <EmptyTitle>Belum Ada {title}</EmptyTitle>
                <EmptyDescription>
                    Anda belum input {title.toLowerCase()} apapun.
                    Mulailah dengan menambahkan {title.toLowerCase()} di pojok kanan atas
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}