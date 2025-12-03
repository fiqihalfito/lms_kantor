
import { XIcon } from "lucide-react"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"

export function ErrorSkillUser() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <XIcon />
                </EmptyMedia>
                <EmptyTitle>Gagal mengambil data skill user</EmptyTitle>
                <EmptyDescription>Terjadi kesalahan saat mengambil data skill user</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}