import { connectToDatabase } from "@/lib/mongoose"
import Project from "@/models/Project"
import { ProjectCard } from "@/components/project-card"

async function getProjects() {
  await connectToDatabase()
  const projects = await Project.find({ published: true }).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(projects))
}
export const metadata = {
  title: "My Projects",
};

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 ">
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

      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-4xl font-bold mb-8">Mis Proyectos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {projects.map((project: any) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              slug={project.slug}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

