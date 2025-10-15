import type { PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

interface TableWrapperProp extends PropsWithChildren {
    className?: string
}

export function TableWrapper({ children, className }: TableWrapperProp) {
    return (
        <div className={cn("overflow-hidden rounded-lg border border-gray-200 shadow-sm", className)}>
            {children}
        </div>
    )
}