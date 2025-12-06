import { RefreshCcwIcon, XIcon } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"

export function EmptySkill() {
    return (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <XIcon />
                </EmptyMedia>
                <EmptyTitle>Tidak ada Skill</EmptyTitle>
                <EmptyDescription>
                    Anda belum menambahkan Skill.
                </EmptyDescription>
            </EmptyHeader>
            {/* <EmptyContent>
                <Button variant="outline" size="sm">
                    <RefreshCcwIcon />
                    Refresh
                </Button>
            </EmptyContent> */}
        </Empty>
    )
}
