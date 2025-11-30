import { NavLink, Outlet, useNavigation } from "react-router";
import type { Route } from "./+types/index";
import { Separator } from "~/components/ui/separator";
import { ChevronRightIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "~/components/ui/item";
import { getAllTeam } from "./_service";
import { userContext } from "~/lib/context";
import { Spinner } from "~/components/ui/spinner";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty";
import { cn } from "~/lib/utils";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const teams = await getAllTeam(user?.idSubBidang!)

    return { teams }
}


export default function IndexMemberTeamPage({ loaderData, params }: Route.ComponentProps) {

    const { teams } = loaderData

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Member Team</h1>
                    <p className="text-muted-foreground">List Member Team</p>
                </div>
            </div>

            <Separator />

            <div className="flex-1 flex gap-x-4">
                <div className="border shadow rounded-md w-72 p-4">
                    <h6 className="font-medium mb-4 text-sm text-muted-foreground ml-2">Available Team</h6>
                    <ItemGroup className="gap-y-2">
                        {teams.map((t, i) => (
                            <Item key={i} variant="outline" size="sm" asChild >
                                <NavLink to={t.idTeam} className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-slate-400/20" : "bg-slate-400/20"
                                }>
                                    {({ isPending, isActive }) => (
                                        <>
                                            <ItemMedia>
                                                {isPending && <Spinner className="size-5" />}
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemTitle className={cn(isActive ? "font-bold" : "text-muted-foreground")}>{t.nama}</ItemTitle>
                                            </ItemContent>
                                            <ItemActions>
                                                {isActive && <ChevronRightIcon className="size-5" />}
                                            </ItemActions>
                                        </>
                                    )}
                                </NavLink>
                            </Item>
                        ))}
                        <Item key={"belum_ada_team"} variant="outline" size="sm" asChild >
                            <NavLink to={"noteam"} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-slate-400/20" : "bg-slate-400/20"
                            }>
                                {({ isPending, isActive }) => (
                                    <>
                                        <ItemMedia>
                                            {isPending && <Spinner className="size-5" />}
                                        </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle className={cn(isActive ? "font-bold" : "text-muted-foreground")}>Belum ada team</ItemTitle>
                                        </ItemContent>
                                        <ItemActions>
                                            {isActive && <ChevronRightIcon className="size-5" />}
                                        </ItemActions>
                                    </>
                                )}
                            </NavLink>
                        </Item>
                    </ItemGroup>
                </div>
                <div className="flex-1">
                    <Outlet />
                    {isNavigating && <LoadingOutlet />}
                </div>
            </div>
        </div >
    )
}

function LoadingOutlet() {
    return (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Spinner />
                    </EmptyMedia>
                    <EmptyTitle>Sedang Memuat</EmptyTitle>
                </EmptyHeader>
            </Empty>
        </div>

    )
}