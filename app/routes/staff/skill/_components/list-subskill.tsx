import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "~/components/ui/item"
import type { getSkillAndSubSkillByPIC } from "../_service"
import { Button } from "~/components/ui/button"
import { TableWrapper } from "~/components/table-wrapper"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { OptionSubskill } from "./option-subskill"

type ListSubSkillType = {
    subskill: Awaited<ReturnType<typeof getSkillAndSubSkillByPIC>>[number]["subSkill"]
}

export function ListSubSkill({ subskill }: ListSubSkillType) {
    return (
        <TableWrapper>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Subskill</TableHead>
                        <TableHead>PIC</TableHead>
                        <TableHead>Dokumen</TableHead>
                        <TableHead>Kuis</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subskill.map((ss, i) => (
                        <TableRow key={ss.idSubSkill}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{ss.namaSubSkill}</TableCell>
                            <TableCell>{ss.pic?.nama}</TableCell>
                            <TableCell>
                                {ss.dokumen ? (
                                    <Badge className="bg-green-500 rounded-full">
                                        Done
                                    </Badge>
                                ) : (
                                    <Badge variant={"destructive"} className="rounded-full">
                                        Belum
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                {ss.dokumen?.kuis ? (
                                    <Badge className="bg-green-500 rounded-full">
                                        Done
                                    </Badge>
                                ) : (
                                    <Badge variant={"destructive"} className="rounded-full">
                                        Belum
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <OptionSubskill idSubSkill={ss.idSubSkill} idTeam={ss.pic?.idTeam} idDokumen={ss.dokumen?.idDokumen} idKuis={ss.dokumen?.idKuis} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </TableWrapper>
    )
}