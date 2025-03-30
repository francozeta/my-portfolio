import { connectToDatabase } from "@/lib/mongoose"
import Project from "@/models/Project"
import ProjectForm from "@/components/admin/project-form"
import { notFound } from "next/navigation"

interface EditProjectPageProps {
  params: {
    id: string
  }
}

async function getProject(id: string) {
  await connectToDatabase()
  const project = await Project.findById(id)
  if (!project) return null
  return JSON.parse(JSON.stringify(project))
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Editar proyecto</h1>
      <ProjectForm project={project} />
    </div>
  )
}

