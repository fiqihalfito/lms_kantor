import { Button } from "~/components/ui/button";
import type { Route } from "./+types";
import { getAllReadersByIdDokumen, getAllUnreadersByIdDokumen, getJudulDokumen } from "./_service";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "~/components/ui/item"
import { Badge } from "~/components/ui/badge";
import { formatTimestampId, wait } from "~/lib/utils";
import { NavLink } from "react-router";
import { CircleCheckBigIcon, CircleSlash, XCircleIcon } from "lucide-react";
import { userContext } from "~/lib/context";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/ui/tabs"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "~/components/ui/empty"

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // await wait(3000)
    const user = context.get(userContext)
    const judulDokumen = await getJudulDokumen(params.idDokumen)
    const readers = await getAllReadersByIdDokumen(params.idDokumen)

    const idReaders = readers.map(reader => reader.userBaca?.idUser!)
    const unreaders = await getAllUnreadersByIdDokumen(user?.idSubBidang!, idReaders)

    return { readers, unreaders, judulDokumen }
}

export default function JumlahOrangBaca({ params, loaderData, matches }: Route.ComponentProps) {

    const { readers, unreaders, judulDokumen } = loaderData
    const jumlahOrang = matches[3].loaderData.masterData.jumlahOrang

    return (
        <div className="border rounded-lg shadow p-4 space-y-4">

            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="font-semibold">Jumlah orang baca</h1>
                    <h6 className="text-muted-foreground">Dokumen {judulDokumen}</h6>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="rounded-full tabular-nums  ">
                        {readers.length} / {jumlahOrang} orang
                    </Badge>
                    <Button variant={"outline"} size={"sm"} asChild>
                        <NavLink to={`..`}>
                            Tutup
                            <XCircleIcon />
                        </NavLink>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col  min-w-lg ">


                <Tabs defaultValue="done" className="">
                    <TabsList>
                        <TabsTrigger value="done">Sudah Baca</TabsTrigger>
                        <TabsTrigger value="notyet">Belum Baca</TabsTrigger>
                    </TabsList>
                    <TabsContent value="done" >
                        {readers.length === 0 ? (
                            <EmptyStatus status="belumsatupun" />
                        ) : (
                            <ItemGroup className="flex flex-col gap-2">
                                {readers.map((reader, i) => (
                                    <Item variant="outline" key={reader.idStatusBaca} size={"sm"}>
                                        <ItemMedia variant="icon">
                                            {i + 1}
                                        </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle>{reader.userBaca?.nama}</ItemTitle>
                                            <ItemDescription>
                                                {reader.userBaca?.memberTeams.team?.nama}
                                            </ItemDescription>
                                        </ItemContent>
                                        <ItemActions>
                                            <Badge className="rounded-full" variant={"secondary"}>
                                                {formatTimestampId(reader.createdAt, { withZoneLabel: true })}
                                            </Badge>
                                        </ItemActions>
                                    </Item>
                                ))}
                            </ItemGroup>
                        )}

                    </TabsContent>
                    <TabsContent value="notyet">
                        {unreaders.length === 0 ? (
                            <EmptyStatus status="selesai" />
                        ) : (
                            <ItemGroup className="flex flex-col gap-2">
                                {unreaders.map((unreader, i) => (
                                    <Item variant="outline" key={unreader.idUser} size={"sm"}>
                                        <ItemMedia variant="icon">
                                            {i + 1}
                                        </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle>{unreader.nama}</ItemTitle>
                                            <ItemDescription>
                                                {unreader.memberTeams.team?.nama}
                                            </ItemDescription>
                                        </ItemContent>
                                        {/* <ItemActions>
                                        <Badge className="rounded-full" variant={"secondary"}>
                                            {formatTimestampId(unreader.createdAt, { withZoneLabel: true })}
                                        </Badge>
                                    </ItemActions> */}
                                    </Item>
                                ))}
                            </ItemGroup>
                        )}

                    </TabsContent>
                </Tabs>
            </div>


        </div >
    )
}

export function EmptyStatus({
    status
}: {
    status: "selesai" | "belumsatupun"
}) {
    return (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {status === "selesai" ? <CircleCheckBigIcon /> : <CircleSlash />}
                </EmptyMedia>
                <EmptyTitle>{status === "selesai" ? "Selesai" : "Belum Ada"}</EmptyTitle>
                <EmptyDescription>
                    {status === "selesai" ? "Semua orang telah membaca" : "Semua orang belum membaca"}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}