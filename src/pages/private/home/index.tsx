import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2, UserX } from "lucide-react"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import type { DataTableFilterField } from "@/components/data-table"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDataTable } from "@/hooks/use-data-table"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "inactive" | "pending"
  joinedAt: string
}

const FAKE_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "editor",
    status: "active",
    joinedAt: "2024-02-03",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    role: "viewer",
    status: "inactive",
    joinedAt: "2024-02-18",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "editor",
    status: "pending",
    joinedAt: "2024-03-01",
  },
  {
    id: "5",
    name: "Eva Martinez",
    email: "eva@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-03-12",
  },
  {
    id: "6",
    name: "Frank Lee",
    email: "frank@example.com",
    role: "viewer",
    status: "active",
    joinedAt: "2024-04-05",
  },
  {
    id: "7",
    name: "Grace Kim",
    email: "grace@example.com",
    role: "editor",
    status: "inactive",
    joinedAt: "2024-04-22",
  },
  {
    id: "8",
    name: "Henry Chen",
    email: "henry@example.com",
    role: "viewer",
    status: "pending",
    joinedAt: "2024-05-07",
  },
  {
    id: "9",
    name: "Isabel Davis",
    email: "isabel@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-05-19",
  },
  {
    id: "10",
    name: "James Wilson",
    email: "james@example.com",
    role: "viewer",
    status: "active",
    joinedAt: "2024-06-01",
  },
  {
    id: "11",
    name: "Karen Taylor",
    email: "karen@example.com",
    role: "editor",
    status: "active",
    joinedAt: "2024-06-15",
  },
  {
    id: "12",
    name: "Liam Anderson",
    email: "liam@example.com",
    role: "viewer",
    status: "inactive",
    joinedAt: "2024-07-02",
  },
  {
    id: "13",
    name: "Mia Thomas",
    email: "mia@example.com",
    role: "admin",
    status: "pending",
    joinedAt: "2024-07-18",
  },
  {
    id: "14",
    name: "Noah Jackson",
    email: "noah@example.com",
    role: "editor",
    status: "active",
    joinedAt: "2024-08-03",
  },
  {
    id: "15",
    name: "Olivia Harris",
    email: "olivia@example.com",
    role: "viewer",
    status: "active",
    joinedAt: "2024-08-20",
  },
  {
    id: "16",
    name: "Paul Martin",
    email: "paul@example.com",
    role: "editor",
    status: "inactive",
    joinedAt: "2024-09-04",
  },
  {
    id: "17",
    name: "Quinn Garcia",
    email: "quinn@example.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-09-17",
  },
  {
    id: "18",
    name: "Rachel Moore",
    email: "rachel@example.com",
    role: "viewer",
    status: "pending",
    joinedAt: "2024-10-01",
  },
  {
    id: "19",
    name: "Samuel Clark",
    email: "samuel@example.com",
    role: "editor",
    status: "active",
    joinedAt: "2024-10-14",
  },
  {
    id: "20",
    name: "Tara Lewis",
    email: "tara@example.com",
    role: "viewer",
    status: "active",
    joinedAt: "2024-11-05",
  },
  {
    id: "21",
    name: "Uma Robinson",
    email: "uma@example.com",
    role: "admin",
    status: "inactive",
    joinedAt: "2024-11-22",
  },
  {
    id: "22",
    name: "Victor Walker",
    email: "victor@example.com",
    role: "editor",
    status: "active",
    joinedAt: "2024-12-08",
  },
  {
    id: "23",
    name: "Wendy Hall",
    email: "wendy@example.com",
    role: "viewer",
    status: "active",
    joinedAt: "2024-12-19",
  },
  {
    id: "24",
    name: "Xander Allen",
    email: "xander@example.com",
    role: "editor",
    status: "pending",
    joinedAt: "2025-01-03",
  },
  {
    id: "25",
    name: "Yara Young",
    email: "yara@example.com",
    role: "viewer",
    status: "active",
    joinedAt: "2025-01-17",
  },
]

const STATUS_BADGE: Record<User["status"], string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  inactive: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
}

const ROLE_BADGE: Record<User["role"], string> = {
  admin:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  editor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  viewer: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
}

const columns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
    cell: ({ row }) => {
      const role = row.getValue<User["role"]>("role")
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROLE_BADGE[role]}`}
        >
          {role}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.getValue<User["status"]>("status")
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_BADGE[status]}`}
        >
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "joinedAt",
    header: "Joined",
    enableSorting: true,
    cell: ({ row }) =>
      new Date(row.getValue<string>("joinedAt")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Open actions">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => console.log("edit", user.id)}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log("suspend", user.id)}>
              <UserX />
              Suspend
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => console.log("delete", user.id)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const filterFields: DataTableFilterField[] = [
  {
    id: "status",
    label: "Status",
    type: "select",
    placeholder: "Filter by status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
    ],
  },
  {
    id: "role",
    label: "Role",
    type: "multiple",
    placeholder: "Filter by role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
  },
]

export function Home() {
  const [searchParams] = useSearchParams()

  // Simulate server-side filtering + pagination on fake data
  const { filteredData, rowCount } = useMemo(() => {
    const search = (searchParams.get("search") ?? "").toLowerCase()
    const statusRaw = searchParams.get("status")
    const roleRaw = searchParams.get("role")
    const status = statusRaw ? statusRaw.split(",") : null
    const role = roleRaw ? roleRaw.split(",") : null
    const sortParam = searchParams.get("sort") as keyof User | null
    const order = searchParams.get("order") ?? "asc"
    const page = Math.max(1, Number(searchParams.get("page") ?? 1))
    const perPage = Number(searchParams.get("per_page") ?? 10)

    let filtered = FAKE_USERS.filter((u) => {
      if (search && !`${u.name} ${u.email}`.toLowerCase().includes(search))
        return false
      if (status && !status.includes(u.status)) return false
      if (role && !role.includes(u.role)) return false
      return true
    })

    if (sortParam) {
      filtered = [...filtered].sort((a, b) => {
        const av = a[sortParam] ?? ""
        const bv = b[sortParam] ?? ""
        const cmp = String(av).localeCompare(String(bv))
        return order === "desc" ? -cmp : cmp
      })
    }

    const start = (page - 1) * perPage
    return {
      filteredData: filtered.slice(start, start + perPage),
      rowCount: filtered.length,
    }
  }, [searchParams])

  const { table, ...tableState } = useDataTable({
    data: filteredData,
    columns,
    rowCount,
    defaultParams: {
      role: "admin",
    },
    columnPinning: {
      right: ["actions"],
    },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their roles.
          </p>
        </div>
      </div>
      <DataTable
        table={table}
        {...tableState}
        filterFields={filterFields}
        searchPlaceholder="Search by name or email..."
      />
    </div>
  )
}
