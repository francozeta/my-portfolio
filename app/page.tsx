import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <section id="about-section" className="min-h-screen py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  I'm a passionate software developer and systems engineer with a keen eye for design. My work focuses
                  on creating elegant, efficient solutions that solve real-world problems.
                </p>
                <p>
                  With expertise in full-stack development, I enjoy building applications that are not only functional
                  but also aesthetically pleasing and intuitive to use.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or refining my design skills.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline" className="group border-neutral-700 text-white hover:bg-neutral-800">
                    View full profile
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-medium mb-4">Skills & Expertise</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Languages & Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-neutral-900/50 border border-neutral-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Design & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "Tailwind CSS", "UI/UX", "Responsive Design", "Git"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-neutral-900/50 border border-neutral-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Systems & DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Docker", "CI/CD", "Linux", "Networking"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-neutral-900/50 border border-neutral-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold">Featured Work</h2>
            <Button variant="link" className="text-gray-400 hover:text-white group">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="E-commerce Platform"
              description="A modern e-commerce solution with real-time inventory and payment processing"
              tags={["Next.js", "Stripe", "MongoDB"]}
              imageUrl="/placeholder.svg?height=200&width=400"
            />
            <ProjectCard
              title="Analytics Dashboard"
              description="Interactive dashboard for visualizing complex data sets with customizable views"
              tags={["React", "D3.js", "Firebase"]}
              imageUrl="/placeholder.svg?height=200&width=400"
            />
            <ProjectCard
              title="Mobile App"
              description="Cross-platform mobile application for task management with offline capabilities"
              tags={["React Native", "Redux", "GraphQL"]}
              imageUrl="/placeholder.svg?height=200&width=400"
            />
          </div>
        </div>
      </section>
  
    </div>
  );
}
