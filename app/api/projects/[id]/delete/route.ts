import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Project from "@/models/Project"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Verificar si el usuario está autenticado
    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    await connectToDatabase()
    await Project.findByIdAndDelete(params.id)

    // Redirigir al admin después de eliminar
    redirect("/admin")
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Error deleting project" }, { status: 500 })
  }
}

