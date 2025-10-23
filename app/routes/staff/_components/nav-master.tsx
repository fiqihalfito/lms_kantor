
import { ChevronRight, LayoutGridIcon, ShapesIcon, SquareUserRoundIcon, UsersRoundIcon, type LucideIcon } from "lucide-react"
import { NavLink } from "react-router"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "~/components/ui/sidebar"
import {
    BookOpenCheckIcon,
    FilesIcon,
} from "lucide-react"
import { FIRST_SEGMENT } from "~/lib/route-config"

const items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}[] = [
        {
            title: "Layanan",
            url: `/${FIRST_SEGMENT}/master/layanan`,
            icon: LayoutGridIcon,
            isActive: true,
        },
        {
            title: "User",
            url: `/${FIRST_SEGMENT}/master/user`,
            icon: UsersRoundIcon,
            isActive: true,
        },
        {
            title: "Team",
            url: `/${FIRST_SEGMENT}/master/team`,
            icon: ShapesIcon,
            isActive: true,
        },
        {
            title: "Member Team",
            url: `/${FIRST_SEGMENT}/master/member_team`,
            icon: SquareUserRoundIcon,
            isActive: true,
        },
    ]

export function NavMaster() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Master</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, i) => (

                    <SidebarMenuItem key={i}>
                        <SidebarMenuButton tooltip={item.title} asChild>
                            <NavLink to={item.url}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </NavLink>
                        </SidebarMenuButton>

                        {/* <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                        <NavLink to={subItem.url}>
                                            <span>{subItem.title}</span>
                                        </NavLink>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub> */}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
