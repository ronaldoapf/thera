import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Header } from "./components/header"

export function Layout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="border border-muted shadow-2xl">
        <main className="">
          <Header />
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
