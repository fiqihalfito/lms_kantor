"use client"

import { ChevronRight, LayoutDashboardIcon, type LucideIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router"

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
import { Spinner } from "../../../components/ui/spinner"

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
      title: "Dokumen",
      url: "#",
      icon: FilesIcon,
      isActive: true,
      items: [
        {
          title: "SOP",
          url: `/${FIRST_SEGMENT}/dokumen/SOP`,
        },
        {
          title: `IK`,
          url: `/${FIRST_SEGMENT}/dokumen/IK`,
        },
        {
          title: `Knowledge`,
          url: `/${FIRST_SEGMENT}/dokumen/Knowledge`,
        },
      ],
    },
    {
      title: "Kuis",
      url: "#",
      icon: BookOpenCheckIcon,
      isActive: true,
      items: [
        {
          title: "Buat Kuis",
          url: `/${FIRST_SEGMENT}/kuis/buat-kuis`,
        },
        {
          title: `Mulai Kuis`,
          url: `/${FIRST_SEGMENT}/kuis/mulai-kuis`,
        },
        {
          title: `Skor`,
          url: `/${FIRST_SEGMENT}/kuis/skor`,
        },
      ],
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ]

export function NavMain() {

  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key={"dashboard"}>
          <SidebarMenuButton asChild isActive={location.pathname === `/${FIRST_SEGMENT}/dashboard`}>
            <NavLink to={`/${FIRST_SEGMENT}/dashboard`}>
              {({ isPending }) => (
                <>
                  <LayoutDashboardIcon />
                  {"Dashboard"}
                  {isPending && <Spinner className="ml-auto" />}
                </>
              )}


            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <NavLink to={subItem.url}>
                        {({ isActive, isPending }) => (
                          <SidebarMenuSubButton isActive={isActive}>
                            {isPending && <Spinner />}
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        )}
                      </NavLink>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
