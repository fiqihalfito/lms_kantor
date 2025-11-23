import { getPresignedUrl } from "~/lib/minio.server";
import { getDokumenById, setDokumenisRead } from "./_service";
import { PreviewPDFViewer } from "~/components/preview-pdf";
import { userContext } from "~/lib/context";
import type { Route } from "./+types";
import { getDbErrorMessage } from "database/dbErrorUtils";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    try {
        const user = context.get(userContext)
        const dokumen = await getDokumenById(params.idDokumen)
        if (dokumen.length === 0) {
            throw new Response("Not Found", { status: 404 });
        }

        await setDokumenisRead(user?.idUser!, params.idDokumen)

        const url = await getPresignedUrl("dokumen", dokumen[0].filename!)

        return { url, dokumen: dokumen[0] }
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);

        console.error(message, constraint);

        throw new Error(message);
    }
}


export default function PreviewPDF({ loaderData }: Route.ComponentProps) {

    const { url, dokumen } = loaderData


    return (
        <PreviewPDFViewer dokumen={dokumen} url={url} />
    )
}