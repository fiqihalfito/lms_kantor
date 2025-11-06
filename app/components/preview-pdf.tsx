import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button";
import { XIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formatTimestampId } from "~/lib/utils";
import type { tDokumen } from "database/schema/schema";

type PreviewPDFProp = {
    dokumen: typeof tDokumen.$inferSelect,
    url: string
}

export function PreviewPDFViewer({ dokumen, url }: PreviewPDFProp) {

    const navigate = useNavigate()

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-99">
            <Card className="w-3/4 h-[92svh]">
                <CardHeader>
                    <CardTitle>{dokumen.judul}</CardTitle>
                    {/* <CardDescription>{dokumen.createdAt}</CardDescription> */}
                    <CardDescription>{formatTimestampId(dokumen.createdAt, { withZoneLabel: true })}</CardDescription>
                    <CardAction>
                        {/* <Link to={`/${FIRST_SEGMENT}/dokumen/${params.tipeDokumen}`} viewTransition> */}
                        {/* <Link to={`..`} viewTransition> */}
                        <Button
                            type="button"
                            className="cursor-pointer flex items-center"
                            variant={"default"}
                            onClick={() => navigate(-1)}>
                            Tutup
                            <XIcon className="size-5" />
                        </Button>
                        {/* </Link> */}
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