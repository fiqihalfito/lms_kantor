import {
    Field,
    FieldDescription,
    FieldLabel,
} from "~/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import type { getAllSubbidang } from "../_service"


type FilterSubBidangProps = {
    allSubbidang: Awaited<ReturnType<typeof getAllSubbidang>>,
    dv?: string
}

export function FilterSubBidang({ allSubbidang, dv }: FilterSubBidangProps) {


    return (
        <div className="w-full max-w-md">
            <Field>
                <FieldLabel>SubBidang</FieldLabel>
                <Select name="subBidang" defaultValue={dv}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih SubBidang" />
                    </SelectTrigger>
                    <SelectContent>
                        {allSubbidang.map((subbidang) => (
                            <SelectItem key={subbidang.idSubBidang} value={subbidang.idSubBidang}>{subbidang.nama}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
        </div>
    )
}