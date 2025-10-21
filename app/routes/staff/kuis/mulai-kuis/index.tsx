import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types";
import { getKuisBelumDikerjakan } from "./_service";
import { userContext } from "~/lib/context";
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
import { CheckCircle2Icon, CircleCheck, OctagonXIcon, PencilRulerIcon } from "lucide-react";
import { Form, Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { formatTimestampId } from "~/lib/utils";
import { ButtonGroup } from "~/components/ui/button-group";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    const kuislist = await getKuisBelumDikerjakan(user?.idUser!, user?.idSubBidang!)


    return { kuislist }
}

export default function MulaiKuisPage({ loaderData }: Route.ComponentProps) {

    const { kuislist } = loaderData

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Mulai Kuis</h1>
                    <p className="text-muted-foreground">Lakukan kuis untuk meningkatkan kompetensi Anda</p>
                </div>
            </div>

            <Separator />


            {kuislist.length === 0 ? (
                <EmptyKuis />
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
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kuislist.map((item, i) => (
                                <TableRow key={item.idKuis}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{item.judulDokumen}</TableCell>
                                    <TableCell>{item.tipeDokumen}</TableCell>
                                    <TableCell>{item?.namaLayanan ?? "-"}</TableCell>
                                    <TableCell>{item?.uploadedBy ?? "-"}</TableCell>
                                    <TableCell>{formatTimestampId(item.tanggalKuisTerbuat)}</TableCell>
                                    <TableHead>{item.jumlahSoal}</TableHead>
                                    <TableCell className="text-right space-x-1.5">
                                        <Form method="post" action={`init/${item.idKuis}`}>
                                            <Button type="submit" size={"sm"} className="cursor-pointer">
                                                <PencilRulerIcon />
                                                Mulai Kuis
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

function EmptyKuis() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <CircleCheck />
                </EmptyMedia>
                <EmptyTitle>Semua kuis sudah diselesaikan</EmptyTitle>
                <EmptyDescription>
                    Tunggu kuis kuis selanjutnya
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}