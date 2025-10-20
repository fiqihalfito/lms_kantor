import type { Route } from "./+types/index";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { getKuisElementById } from "./_service";
import { Button } from "~/components/ui/button";
import { NavLink, Outlet, useFetcher } from "react-router";
import { CheckIcon, CircleXIcon, SquarePenIcon, TrashIcon } from "lucide-react";
import { ItemMedia } from "~/components/ui/item";
import { Spinner } from "~/components/ui/spinner";

export async function loader({ request, params }: Route.LoaderArgs) {

    const kuisElement = await getKuisElementById(params.idKuisElement)

    return { kuisElement: kuisElement[0] }
}

export default function ReviewSoal({ params, loaderData }: Route.ComponentProps) {

    const { kuisElement } = loaderData
    const pilganParse: Record<"a" | "b" | "c" | "d", string> | null = kuisElement?.pilgan ? JSON.parse(kuisElement.pilgan) : null
    const pilgan = pilganParse ? Object.entries(pilganParse) : [];

    return (
        <Card>
            <CardHeader>
                <Outlet />
                <CardTitle>{kuisElement.soal}</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
                <CardAction className="space-x-2">

                    <Button variant="default" asChild size={"sm"}>
                        <NavLink to={`edit`}>
                            <SquarePenIcon />
                            Edit
                        </NavLink>
                    </Button>
                    <AlertDialogDeleteButton idKuisElement={kuisElement.idKuisElement} />
                    <Button variant="outline" asChild size={"sm"}>
                        <NavLink to={`..`} viewTransition>
                            <CircleXIcon />
                            Tutup
                        </NavLink>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4x">
                {pilgan.length > 0 && (
                    <ul className="space-y-2">
                        {pilgan.map(([key, value], i) => (
                            <li
                                key={key}
                                className="flex items-start gap-2 rounded-lg border border-muted-foreground/20 p-3 hover:bg-muted transition-colors"
                            >
                                <span className="font-semibold text-muted-foreground">{key.toUpperCase()}.</span>
                                <span className="text-sm leading-relaxed">{value}</span>
                                {key == kuisElement.jawaban && <CheckIcon className="ml-auto" />}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>

            <CardFooter className="flex flex-col items-start border-t border-muted-foreground/10 space-y-2">
                <h6 className="text-sm font-medium text-muted-foreground">Jawaban:</h6>
                <Button size={"icon"} variant={"secondary"} className="text-lg font-semibold tracking-wide text-primary">
                    {kuisElement.jawaban?.toUpperCase()}
                </Button>
            </CardFooter>
        </Card>
    )
}

function AlertDialogDeleteButton({
    idKuisElement,
}: {
    idKuisElement: string,
}) {

    const fetcher = useFetcher({ key: "delete_soal" })

    const isDeleting = fetcher.state !== "idle"


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"sm"} className="cursor-pointer" variant={"destructive"} >
                    <TrashIcon />
                    Hapus
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin menghapus soal ini?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Menghapus tidak bisa dibatalkan. Ini akan menghapus permanen di server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
                        Batal
                    </AlertDialogCancel>
                    {/* ini submit ke action */}
                    <fetcher.Form method="post" action={`delete`}>
                        <input type="hidden" name="_action" value="delete" />
                        <input type="hidden" name="idKuisElement" value={idKuisElement} />
                        {/* <AlertDialogAction */}
                        {/* pakai button supaya bisa loading dulu baru menutup dialog */}
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Spinner />
                                    Menghapus ...
                                </>
                            ) : "Ya, Hapus"}
                        </Button>
                    </fetcher.Form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}