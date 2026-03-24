import { LoaderCircle, type LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

export function Loading({ className, ...props }: LucideProps) {
  return (
    <LoaderCircle className={cn("size-4 animate-spin", className)} {...props} />
  )
}
