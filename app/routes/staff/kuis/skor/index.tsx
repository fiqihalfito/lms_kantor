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
import { CircleXIcon, OctagonXIcon, PencilRulerIcon, RotateCcwIcon } from "lucide-react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { formatTimestampId } from "~/lib/utils";
import { userContext } from "~/lib/context";
import { getKuisSudahDikerjakan } from "./_service";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty";

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
                <EmptySkor />
            ) : (
                <TableWrapper className="">
                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Judul Dokumen</TableHead>
                                {/* <TableHead>Tipe</TableHead> */}
                                {/* <TableHead>Layanan</TableHead> */}
                                {/* <TableHead>Uploaded By</TableHead> */}
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
                                    <TableCell>{item.kuis?.dokumen.judul}</TableCell>
                                    {/* <TableCell>{item.dokumen.tipe}</TableCell> */}
                                    {/* <TableCell>{item.dokumen.layanan?.nama ?? "-"}</TableCell> */}
                                    {/* <TableCell>{item?.dokumen.user?.nama ?? "-"}</TableCell> */}
                                    <TableCell>{formatTimestampId(item.createdAt)}</TableCell>
                                    <TableHead>{item.kuis?.kuisElement.length}</TableHead>
                                    <TableHead>{`${item.jumlahBenar}/${item.kuis?.kuisElement.length}`}</TableHead>
                                    <TableCell className="text-right space-x-1.5">
                                        <Form method="post" action={`../kuis/mulai-kuis/init/${item.idKuis}`}>
                                            <Button type="submit" size={"sm"} className="cursor-pointer">
                                                <RotateCcwIcon />
                                                {/* {item.sudahMengerjakan && item.kuisProgress.isSelesai ? "Ujian lagi" : "Mulai Ujian"} */}
                                                Ujian Lagi
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

function EmptySkor() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CircleXIcon />
                </EmptyMedia>
                <EmptyTitle>Anda belum mengerjakan kuis apapun</EmptyTitle>
                <EmptyDescription>
                    Silahkan kerjakan kuis yang ada
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}