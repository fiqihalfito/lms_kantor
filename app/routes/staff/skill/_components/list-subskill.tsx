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
                        <TableHead className="text-center">Level</TableHead>
                        <TableHead className="text-center">PIC</TableHead>
                        <TableHead className="text-center">Dokumen</TableHead>
                        <TableHead className="text-center">Kuis</TableHead>
                        <TableHead className="text-center">Jumlah Soal</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subskill.map((ss, i) => (
                        <TableRow key={ss.idSubSkill}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{ss.namaSubSkill}</TableCell>
                            <TableCell className="text-center">{ss.level}</TableCell>
                            <TableCell className="text-center">{ss.pic?.nama}</TableCell>
                            <TableCell className="text-center">
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
                            <TableCell className="text-center">
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
                            <TableCell className="text-center">{ss.dokumen?.kuis?.kuisElement?.length ?? "-"}</TableCell>
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