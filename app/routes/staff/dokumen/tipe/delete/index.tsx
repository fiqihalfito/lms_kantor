import { wait } from "~/lib/utils";
import type { Route } from "./+types/index";
import { deleteDokumen, getJudulDokumen } from "./_service";
import { data, redirect, useNavigate } from "react-router";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { redirectWithSuccess } from "remix-toast";

export async function action({ request, params }: Route.ActionArgs) {

    let deletedJudul = await deleteDokumen(params.idDokumen)
    // const headers = await setFlashSession(request, {
    //     type: "success",
    //     message: "Berhasil menghapus dokumen " + deletedJudul
    // })
    // return redirect(`..`, { headers })
    return redirectWithSuccess(`..`, "Berhasil menghapus dokumen " + deletedJudul)

}

export async function loader({ request, params }: Route.LoaderArgs) {

    const dokumen = await getJudulDokumen(params.idDokumen)

    return { dokumen }
}

export default function DeletePage({ loaderData, params }: Route.ComponentProps) {

    const fetcher = useFetcher()
    const isDeleting = fetcher.state !== "idle"
    const navigate = useNavigate();

    const { dokumen } = loaderData


    return (
        <div className="fixed inset-0  bg-black/50 z-99">
            <div className="h-screen w-screen flex items-center justify-center">
                <Card className="w-1/4">
                    <CardHeader className="">
                        <CardTitle>{`Apakah anda yakin hapus dokumen ${dokumen[0].judul}?`}</CardTitle>
                        <CardDescription>{`Menghapus tidak bisa dibatalkan. Ini akan menghapus permanen dokumen di server.`}</CardDescription>
                        {/* <CardAction>
                            <Link to={`/${FIRST_SEGMENT}/dokumen/${tipeDokumen}`} viewTransition>
                                <Button type="button" size={"sm"} className="cursor-pointer flex items-center" variant={"outline"}>
                                    Batal
                                    <XIcon className="size-5" />
                                </Button>
                            </Link>
                        </CardAction> */}
                    </CardHeader>
                    {/* <CardContent className="flex-1">

                    </CardContent> */}
                    <CardFooter className="flex gap-1.5 justify-end">
                        <Button
                            type="button"
                            variant={"outline"}
                            className="cursor-pointer"
                            disabled={isDeleting}
                            onClick={() => navigate("..", {
                                viewTransition: true
                            })}
                        >
                            Batal
                        </Button>

                        <fetcher.Form method="post" >
                            {/* <input type="hidden" name="_action" value="delete" />
                            <input type="hidden" name="idDokumen" value={idDokumen} /> */}
                            <Button
                                type="submit"
                                className="cursor-pointer"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <span className="flex items-center gap-x-2">
                                        {/* <LoaderCircleIcon className="animate-spin" /> */}
                                        <Spinner />
                                        Menghapus ...
                                    </span>
                                ) : "Ya, Hapus"}
                            </Button>
                        </fetcher.Form>

                    </CardFooter>
                </Card>
            </div>
        </div >
    )
}