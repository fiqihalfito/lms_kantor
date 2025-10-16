import { getPresignedUrl } from "~/lib/minio.server";
import type { Route } from "./+types/index";
import { getDokumenById } from "./_service";
import { PreviewPDFViewer } from "~/components/preview-pdf";

export async function loader({ request, params }: Route.LoaderArgs) {

    console.log("preview pdf loader hit");


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
        <PreviewPDFViewer dokumen={dokumen} url={url} />
    )
}