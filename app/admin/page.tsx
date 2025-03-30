import Link from "next/link"
import { connectToDatabase } from "@/lib/mongoose"
import Project from "@/models/Project"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Plus } from "lucide-react"

async function getProjects() {
  await connectToDatabase()
  const projects = await Project.find({}).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(projects))
}

export default async function AdminPage() {
  const projects = await getProjects()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Link href="/admin/new">
          <Button className="bg-neutral-800 hover:bg-neutral-700">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-700 p-8 text-center">
          <h3 className="mb-2 text-lg font-medium">No hay proyectos</h3>
          <p className="mb-4 text-neutral-400">Comienza creando tu primer proyecto</p>
          <Link href="/admin/new">
            <Button className="bg-neutral-800 hover:bg-neutral-700">
              <Plus className="mr-2 h-4 w-4" />
              Crear proyecto
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-neutral-800">
          <table className="w-full">
            <thead className="bg-neutral-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-300">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-300">Slug</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-300">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-300">Fecha</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {projects.map((project: any) => (
                <tr key={project._id} className="hover:bg-neutral-900/50">
                  <td className="px-4 py-3 text-sm">{project.title}</td>
                  <td className="px-4 py-3 text-sm text-neutral-400">{project.slug}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        project.published ? "bg-green-900/20 text-green-400" : "bg-yellow-900/20 text-yellow-400"
                      }`}
                    >
                      {project.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/work/${project.slug}`} target="_blank">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/edit/${project._id}`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={`/api/projects/${project._id}/delete`} method="POST">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

