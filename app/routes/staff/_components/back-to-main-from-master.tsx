import { DatabaseIcon, ExternalLinkIcon, SquareChevronLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { FIRST_SEGMENT } from "~/lib/route-config";


export function BackToMainFromMaster() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link to={`/${FIRST_SEGMENT}/dashboard`} className="flex justify-between">
                        <SquareChevronLeftIcon />
                        Kembali ke Dashboard
                        <ExternalLinkIcon className="ml-auto" />
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}