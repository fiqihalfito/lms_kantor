import { Separator } from "~/components/ui/separator"

type FilterProps = {
    children: React.ReactNode
}

export function Filter({ children }: FilterProps) {
    return (
        <div className="border rounded-md p-4 mb-12">
            <h2 className="text-base font-semibold tracking-wide">Filter</h2>
            <Separator className="mb-6 mt-2" />
            <div>
                {children}
            </div>
        </div>
    )
}