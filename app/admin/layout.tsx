import type React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link"
import { LogOut, Plus, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const session = await getServerSession(authOptions)

    // Si no hay sesión, redirigir al login
    if (!session) {
      return redirect("/admin/login")
    }

    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 border-r border-neutral-800 p-4">
            <div className="mb-8">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-sm text-neutral-400">Gestión de proyectos</p>
            </div>

            <nav className="space-y-1">
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-neutral-300 hover:bg-neutral-800"
              >
                <FolderOpen size={18} />
                <span>Proyectos</span>
              </Link>
              <Link
                href="/admin/new"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-neutral-300 hover:bg-neutral-800"
              >
                <Plus size={18} />
                <span>Nuevo Proyecto</span>
              </Link>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error en admin layout:", error)
    return redirect("/admin/login")
  }
}

