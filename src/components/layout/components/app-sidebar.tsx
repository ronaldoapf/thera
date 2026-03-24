import { IndentDecrease, LayoutDashboard } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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
    { to: "/app", label: "Home", tooltip: "Home", icon: LayoutDashboard },
    { to: "/app/menu", label: "Menu", tooltip: "Menu", icon: LayoutDashboard },
  ],
}

export function AppSidebar() {
  const { pathname } = useLocation()

  const user = {
    name: "Ronaldo Filho",
    email: "ronaldo.alves.1997@gmail.com",
    avatar: "https://github.com/ronaldoapf.png",
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/app">
                <IndentDecrease className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
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
