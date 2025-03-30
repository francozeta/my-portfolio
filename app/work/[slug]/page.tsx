import { connectToDatabase } from "@/lib/mongoose"
import Project from "@/models/Project"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

async function getProject(slug: string) {
  await connectToDatabase()
  const project = await Project.findOne({ slug, published: true })
  if (!project) return null
  return JSON.parse(JSON.stringify(project))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    }
  }

  return {
    title: `${project.title} | Franco Zeta`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Gradient background - estático y centrado */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(200, 200, 200, 0.15), transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(200, 200, 200, 0.1), transparent 70%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <Link href="/work">
          <Button variant="ghost" className="mb-6 -ml-2 text-neutral-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a proyectos
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-neutral-900 border border-neutral-700 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-neutral-300 mb-6">{project.description}</p>

          <div className="whitespace-pre-line text-neutral-400">{project.content}</div>
        </div>
      </div>
    </div>
  )
}

