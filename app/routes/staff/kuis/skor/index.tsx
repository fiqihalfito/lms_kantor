import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { TableWrapper } from "~/components/table-wrapper";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { EmptyMaster } from "~/components/empty-master";
import { OctagonXIcon, PencilRulerIcon } from "lucide-react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { formatTimestampId } from "~/lib/utils";
import { userContext } from "~/lib/context";
import { getKuisSudahDikerjakan } from "./_service";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const kuisSudahDikerjakan = await getKuisSudahDikerjakan(user?.idUser!)

    return { kuisSudahDikerjakan }
}

export default function SkorPage({ loaderData }: Route.ComponentProps) {

    const { kuisSudahDikerjakan } = loaderData

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Skor Kuis</h1>
                    <p className="text-muted-foreground">Semua kuis yang anda selesaikan</p>
                </div>
            </div>

            <Separator />

            {kuisSudahDikerjakan.length === 0 ? (
                <EmptyMaster Icon={OctagonXIcon} title="Dokumen Kuis" />
            ) : (
                <TableWrapper className="">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Judul Dokumen</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Layanan</TableHead>
                                <TableHead>Uploaded By</TableHead>
                                <TableHead>Kuis created at</TableHead>
                                <TableHead>Jumlah soal</TableHead>
                                <TableHead>Skor</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kuisSudahDikerjakan.map((item, i) => (
                                <TableRow key={item.idKuis}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{item.dokumen.judul}</TableCell>
                                    <TableCell>{item.dokumen.tipe}</TableCell>
                                    <TableCell>{item.dokumen.layanan?.nama ?? "-"}</TableCell>
                                    <TableCell>{item?.dokumen.user?.nama ?? "-"}</TableCell>
                                    <TableCell>{formatTimestampId(item.createdAt)}</TableCell>
                                    <TableHead>{item.kuisElement.length}</TableHead>
                                    <TableHead>{`${item.kuisProgress.jumlahBenar}/${item.kuisElement.length}`}</TableHead>
                                    <TableCell className="text-right space-x-1.5">
                                        <Form method="post" action={`init/${item.idKuis}`}>
                                            <Button type="submit" size={"sm"} className="cursor-pointer">
                                                <PencilRulerIcon />
                                                {/* {item.sudahMengerjakan && item.kuisProgress.isSelesai ? "Ujian lagi" : "Mulai Ujian"} */}
                                                {item?.kuisProgress && item.kuisProgress.isSelesai ? "Ujian lagi" : "Mulai Ujian"}
                                            </Button>
                                        </Form>

                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableWrapper>
            )}
        </div>
    )
}