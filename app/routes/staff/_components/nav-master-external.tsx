import { DatabaseIcon, ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { FIRST_SEGMENT } from "~/lib/route-config";


export function NavMasterExternal() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link to={`/${FIRST_SEGMENT}/master`} className="flex justify-between">
                        <DatabaseIcon />
                        Master Data
                        <ExternalLinkIcon className="ml-auto" />
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}