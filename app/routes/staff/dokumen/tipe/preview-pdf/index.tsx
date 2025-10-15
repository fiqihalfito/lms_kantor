import { getPresignedUrl } from "~/lib/minio.server";
import type { Route } from "./+types/index";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { getDokumenById } from "./_service";
import { Button } from "~/components/ui/button";
import { XIcon } from "lucide-react";
import { Link } from "react-router";
import { FIRST_SEGMENT } from "~/lib/route-config";
import { formatTimestampId } from "~/lib/utils";

export async function loader({ request, params }: Route.LoaderArgs) {

    try {
        const dokumen = await getDokumenById(params.idDokumen)
        if (dokumen.length === 0) {
            throw new Response("Not Found", { status: 404 });
        }

        const url = await getPresignedUrl("dokumen", dokumen[0].filename!)

        return { url, dokumen: dokumen[0] }
    } catch (error) {
        throw new Response("Not Found", { status: 404 });
    }
}


export default function PreviewPDF({ loaderData, params }: Route.ComponentProps) {

    const { url, dokumen } = loaderData

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-99">
            <Card className="w-3/4 h-[92svh]">
                <CardHeader>
                    <CardTitle>{dokumen.judul}</CardTitle>
                    {/* <CardDescription>{dokumen.createdAt}</CardDescription> */}
                    <CardDescription>{formatTimestampId(dokumen.createdAt, { withZoneLabel: true })}</CardDescription>
                    <CardAction>
                        {/* <Link to={`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}`} viewTransition> */}
                        <Link to={`..`} viewTransition>
                            <Button className="cursor-pointer flex items-center" variant={"default"}>
                                Tutup
                                <XIcon className="size-5" />
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex-1">
                    <embed
                        src={url}
                        type="application/pdf"
                        className="w-full h-full rounded-md"
                    />

                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>
    )
}