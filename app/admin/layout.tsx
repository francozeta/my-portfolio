import type React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { TopNavbar } from "@/components/admin/top-navbar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return redirect("/admin/login")
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <TopNavbar user={session.user} />
        <main className="container mx-auto p-6">{children}</main>
      </div>
    )
  } catch (error) {
    console.error("Error en admin layout:", error)
    return redirect("/admin/login")
  }
}

