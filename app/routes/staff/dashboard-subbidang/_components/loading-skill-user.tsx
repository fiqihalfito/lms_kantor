
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"
import { Spinner } from "~/components/ui/spinner"

export function LoadingSkillUser() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Spinner />
                </EmptyMedia>
                <EmptyTitle>Sedang memuat</EmptyTitle>
                <EmptyDescription>Mengambil data skill user...</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}