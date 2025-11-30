import { LayoutGridIcon, PyramidIcon, ShapesIcon, SquareUserRoundIcon, UsersRoundIcon } from "lucide-react";
import type { Route } from "./+types/index";
import { Separator } from "~/components/ui/separator";
import { NavLink } from "react-router";

export default function MasterIndexPage({ }: Route.ComponentProps) {

    const menuMaster = [
        {
            title: "Layanan",
            url: `layanan`,
            icon: LayoutGridIcon,
            isActive: true,
        },
        {
            title: "User",
            url: `user`,
            icon: UsersRoundIcon,
            isActive: true,
        },
        {
            title: "Team",
            url: `team`,
            icon: ShapesIcon,
            isActive: true,
        },
        {
            title: "Member Team",
            url: `member_team`,
            icon: SquareUserRoundIcon,
            isActive: true,
        },
        {
            title: "Skill",
            url: `skill`,
            icon: PyramidIcon,
            isActive: true,
        },
    ]

    return (
        <div className="flex flex-1 flex-col gap-4 p-8 pt-2">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">Master Page</h1>
                    <p className="text-muted-foreground">Menu Master</p>
                </div>
            </div>

            <Separator />

            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
                    {menuMaster.map((item, i) => (
                        <NavLink to={item.url}>
                            <div key={i} className="flex flex-col items-center gap-6 py-8 border-2 rounded-lg hover:bg-accent">
                                <item.icon className="size-12" />
                                <p className="font-medium tracking-wide">{item.title}</p>
                            </div>
                        </NavLink>

                    ))}
                </div>
            </div>
        </div>
    )
}