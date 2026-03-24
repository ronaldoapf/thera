import {
  DoorOpen,
  FileText,
  Grid2x2,
  HeartHandshake,
  Users,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import iconLogo from "@/assets/icon-logo.png"
import { useAuth } from "@/hooks/use-auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar"
import { NavUser } from "./nav-user"

const routes = {
  mainRoutes: [
    {
      icon: Grid2x2,
      label: "Dashboard",
      tooltip: "Dashboard",
      to: "/app",
    },
    {
      label: "Equipe",
      tooltip: "Equipe",
      icon: HeartHandshake,
      to: "/app/collaborators",
    },
    {
      icon: Users,
      label: "Pacientes",
      to: "/app/patients",
      tooltip: "Pacientes",
    },
    {
      label: "Salas",
      icon: DoorOpen,
      tooltip: "Salas",
      to: "/app/rooms",
    },
    {
      icon: FileText,
      to: "/app/forms",
      label: "Formulários",
      tooltip: "Formulários",
    },
  ],
}

export function AppSidebar() {
  const { pathname } = useLocation()
  const { clinic, user } = useAuth()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="ml-1.5 flex items-center gap-3">
              <img src={iconLogo} width={20} alt="Logo Thera" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {clinic?.legalName}
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {routes.mainRoutes.map(({ to, label, tooltip, icon: Icon }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton
                  tooltip={tooltip}
                  asChild
                  isActive={pathname === to}
                >
                  <Link to={to}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
