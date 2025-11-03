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
import { XCircleIcon } from "lucide-react";
import { userContext } from "~/lib/context";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/ui/tabs"

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // await wait(3000)
    const user = context.get(userContext)
    const judulDokumen = await getJudulDokumen(params.idDokumen)
    const readers = await getAllReadersByIdDokumen(params.idDokumen)

    const idReaders = readers.map(reader => reader.userBaca?.idUser!)
    const unreaders = await getAllUnreadersByIdDokumen(user?.idSubBidang!, idReaders)

    return { readers, unreaders, judulDokumen }
}

export default function JumlahOrangBaca({ params, loaderData }: Route.ComponentProps) {

    const { readers, unreaders, judulDokumen } = loaderData

    return (
        <div className="border rounded-lg shadow p-4 space-y-4">

            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="font-semibold">Jumlah orang baca</h1>
                    <h6 className="text-muted-foreground">Dokumen {judulDokumen}</h6>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="rounded-full tabular-nums  ">
                        {readers.length} / {unreaders.length} orang
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


                    </TabsContent>
                    <TabsContent value="notyet">
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
                    </TabsContent>
                </Tabs>
            </div>


        </div >
    )
}