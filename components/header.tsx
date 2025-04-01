"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Layout } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  // Función para verificar si una ruta está activa (incluyendo subrutas)
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(path)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="flex items-center rounded-full bg-neutral-950/40 border border-neutral-700 gap-0.5 p-1 backdrop-blur-sm">
        <Link
          href="/"
          className={cn(
            "flex items-center justify-center rounded-full px-4 py-2 text-neutral-300 transition-colors border",
            isActive("/")
              ? "bg-neutral-900/50 text-white border-neutral-50/20"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
        >
          <Home size={16} />
        </Link>

        <div className="mx-2 h-7 w-px bg-neutral-700" />

        <Link
          href="/about"
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-2 text-neutral-300 transition-colors border",
            isActive("/about")
              ? "bg-neutral-900/50 text-white border-neutral-50/20"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
        >
          <User size={16} />
          <span className="text-xs font-medium">About</span>
        </Link>

        <Link
          href="/work"
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-2 text-neutral-300 transition-colors border",
            isActive("/work")
              ? "bg-neutral-900/50 text-white border-neutral-50/20"
              : "hover:bg-neutral-800/50 hover:text-white border-transparent hover:border-neutral-50/20",
          )}
        >
          <Layout size={16} />
          <span className="text-xs font-medium">Work</span>
        </Link>
      </nav>
    </header>
  )
}

