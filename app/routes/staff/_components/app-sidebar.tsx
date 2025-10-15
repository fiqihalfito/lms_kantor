"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  BookOpenCheckIcon,
  BookOpenIcon,
  BookOpenTextIcon,
  Bot,
  Command,
  FilesIcon,
  FileStackIcon,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "~/components/nav-main"
import { NavProjects } from "~/components/nav-projects"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"
import { TeamSwitcher } from "../../../components/team-switcher"
import { FIRST_SEGMENT } from "~/lib/route-config"
import { useLocation, useRouteLoaderData } from "react-router"
import { NavMasterExternal } from "./nav-master-external"
import { NavMaster } from "./nav-master"
import { BackToMainFromMaster } from "./back-to-main-from-master"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = useRouteLoaderData("app_segment")
  const location = useLocation();
  const isMasterPage = location.pathname.includes("master");

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {!isMasterPage ? <NavMain key={"nav-main"} /> : <NavMaster key={"nav-master"} />}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {!isMasterPage ? <NavMasterExternal /> : <BackToMainFromMaster />}
        <NavUser user={user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
