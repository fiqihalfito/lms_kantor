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

export function EmptyNotPic() {
    return (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30% border">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <XIcon />
                </EmptyMedia>
                <EmptyTitle>Anda bukan PIC</EmptyTitle>
                <EmptyDescription>
                    Anda tidak memiliki hak akses untuk mengelola Skill. Silahkan membaca dokumen dan melakukan kuis
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
