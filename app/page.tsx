import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Metadata } from "next";
import Link from "next/link";
import { FaAws } from "react-icons/fa";
import { SiDocker, SiFigma, SiGit, SiJavascript, SiLinux, SiNextdotjs, SiNodedotjs, SiPython, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { connectToDatabase } from "@/lib/mongoose";
import Project from "@/models/Project";

export const metadata = {
  title: "Home | Franco's Portfolio",
  description: "Showcasing Franco's skills, expertise, and featured projects.",
};

// Function to fetch featured projects
async function getFeaturedProjects() {
  await connectToDatabase();
  const projects = await Project.find({ featured: true, published: true }).limit(3);
  return JSON.parse(JSON.stringify(projects));
}

export default async function Home() {
  // Fetch featured projects
  const featuredProjects = await getFeaturedProjects();

  const skills = {
    languages: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Python", icon: SiPython },
    ],
    design: [
      { name: "Figma", icon: SiFigma },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "UI/UX", icon: SiReact },
      { name: "Responsive Design", icon: SiReact },
      { name: "Git", icon: SiGit },
    ],
    devops: [
      { name: "AWS", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "CI/CD", icon: SiGit },
      { name: "Linux", icon: SiLinux },
    ],
  }
  return (
    <div className="min-h-screen">
      <Hero />
      <section id="about-section" className="min-h-screen py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-neutral-400">
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

              <div className="mt-8 p-0">
                <Link href="/about" className="flex items-center text-neutral-200 hover:text-white group transition-colors">
                  View full profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-medium mb-4">Skills & Expertise</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Languages & Frameworks</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {skills.languages.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-[5px] bg-neutral-900/50 border border-neutral-700 rounded-full"
                      >
                        <skill.icon className="w-4 h-4 text-neutral-400" />
                        <span className="text-xs">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Design & Tools</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {skills.design.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-[5px] bg-neutral-900/50 border border-neutral-700 rounded-full"
                      >
                        <skill.icon className="w-4 h-4 text-neutral-400" />
                        <span className="text-xs">{skill.name}</span>
                      </div>
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

      <section className="py-24 px-4 bg-gradient-to-b">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold">Featured Work</h2>
            <Link href="/work">
              <Button variant="link" className="text-gray-400 hover:text-white group">
                View all projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  imageUrl={project.imageUrl}
                  slug={project.slug}
                  urlRepo={project.urlRepo}
                  urlDemo={project.urlDemo}
                  featured={project.featured}
                  completed={project.completed}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-400">
              <p>No featured projects available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
