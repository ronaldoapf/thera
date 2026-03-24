import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserDropdown } from "./user-dropdown"

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-muted p-2">
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  )
}
