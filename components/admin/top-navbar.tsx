"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FolderOpen, Plus, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function TopNavbar({ user }: { user: any }) {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-10 border-b border-neutral-800 bg-black">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="text-xl font-bold">
            Admin Panel
          </Link>

          <nav className="flex items-center space-x-1">
            <Link
              href="/admin"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                pathname === "/admin" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <FolderOpen size={16} />
              <span>Proyectos</span>
            </Link>
            <Link
              href="/admin/new"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                pathname === "/admin/new" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Plus size={16} />
              <span>Nuevo Proyecto</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-neutral-400">{user?.email}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1 rounded-md p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <LogOut size={16} />
            <span className="sr-only">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  )
}

