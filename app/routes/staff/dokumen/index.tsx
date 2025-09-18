import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types/index";
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
import { getAllDokumen } from "./_services";


export async function loader({ request, params }: Route.LoaderArgs) {

    const dokumens = await getAllDokumen()

    return { dokumens }
}


export default function DokumenIndex({ loaderData }: Route.ComponentProps) {

    const { dokumens } = loaderData


    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="space-y-0.5">
                <h1 className="text-3xl font-semibold tracking-tight">Dokumen</h1>
                <p className="text-muted-foreground">Berisi SOP, IK, dan Sharing Knowledge</p>
            </div>
            <Separator />
            {/* <div className="overflow-auto rounded-lg border border-gray-300"> */}
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Nama Dokumen</TableHead>
                        <TableHead>Jenis Dokumen</TableHead>
                        {/* <TableHead>Aksi</TableHead> */}
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dokumens.map((d, i) => (
                        <TableRow key={d.id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{d.nama}</TableCell>
                            <TableCell>{d.jenis}</TableCell>
                            <TableCell className="text-right"></TableCell>
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
            {/* </div> */}
        </div>
    )
}