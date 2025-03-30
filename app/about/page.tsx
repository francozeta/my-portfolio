"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  // Datos de perfil (en un proyecto real, estos datos podrían venir de una API o CMS)
  const profile = {
    name: "Franco Zeta",
    title: "Software Developer & Systems Engineer & Designer",
    bio: [
      "I'm a passionate software developer and systems engineer with a keen eye for design. With over 5 years of experience in the tech industry, I've worked on a variety of projects ranging from web applications to complex system architectures.",
      "My approach combines technical expertise with creative problem-solving. I believe in building solutions that are not only functional but also intuitive and aesthetically pleasing.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring.",
    ],
    experience: [
      {
        company: "Tech Innovations Inc.",
        position: "Senior Software Developer",
        period: "2021 - Present",
        description:
          "Leading development of scalable web applications using Next.js and TypeScript. Implementing CI/CD pipelines and mentoring junior developers.",
      },
      {
        company: "Digital Solutions Ltd.",
        position: "Systems Engineer",
        period: "2018 - 2021",
        description:
          "Designed and maintained cloud infrastructure on AWS. Implemented microservices architecture and containerization strategies.",
      },
      {
        company: "Creative Web Studio",
        position: "Frontend Developer",
        period: "2016 - 2018",
        description:
          "Developed responsive user interfaces using React. Collaborated with designers to implement pixel-perfect designs.",
      },
    ],
    education: [
      {
        institution: "Tech University",
        degree: "Master's in Computer Science",
        year: "2016",
      },
      {
        institution: "Design Academy",
        degree: "Bachelor's in Digital Design",
        year: "2014",
      },
    ],
    skills: {
      technical: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "Kubernetes",
        "GraphQL",
        "REST API",
        "MongoDB",
        "PostgreSQL",
        "Redis",
      ],
      design: ["UI/UX Design", "Figma", "Adobe XD", "Responsive Design", "Design Systems", "Tailwind CSS", "SASS/SCSS"],
      soft: [
        "Problem Solving",
        "Team Leadership",
        "Project Management",
        "Technical Writing",
        "Mentoring",
        "Communication",
      ],
    },
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Spanish", level: "Native" },
      { name: "French", level: "Intermediate" },
    ],
    social: [
      { platform: "GitHub", url: "https://github.com/francozeta", icon: Github },
      { platform: "LinkedIn", url: "https://linkedin.com/in/francozeta", icon: Linkedin },
      { platform: "Twitter", url: "https://twitter.com/francozeta", icon: Twitter },
      { platform: "Email", url: "mailto:franco@example.com", icon: Mail },
    ],
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-neutral-700">
            <Image
              src="https://avatars.githubusercontent.com/u/124936792?v=4"
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{profile.name}</h1>
          <p className="text-lg text-gray-400 mb-6">{profile.title}</p>

          <div className="flex space-x-3">
            {profile.social.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="sr-only">{item.platform}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h2 variants={item} className="text-2xl font-bold mb-6 border-b border-neutral-800 pb-2">
              About Me
            </motion.h2>
            <div className="space-y-4">
              {profile.bio.map((paragraph, index) => (
                <motion.p key={index} variants={item} className="text-gray-300">
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.h2 variants={item} className="text-2xl font-bold mt-12 mb-6 border-b border-neutral-800 pb-2">
              Experience
            </motion.h2>
            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <motion.div key={index} variants={item} className="relative pl-6 border-l border-neutral-700">
                  <div className="absolute w-3 h-3 bg-neutral-700 rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <p className="text-gray-400 mb-1">
                    {exp.company} | {exp.period}
                  </p>
                  <p className="text-gray-300">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.h2 variants={item} className="text-2xl font-bold mt-12 mb-6 border-b border-neutral-800 pb-2">
              Education
            </motion.h2>
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <motion.div key={index} variants={item} className="relative pl-6 border-l border-neutral-700">
                  <div className="absolute w-3 h-3 bg-neutral-700 rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-gray-400">
                    {edu.institution} | {edu.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h2 variants={item} className="text-2xl font-bold mb-6 border-b border-neutral-800 pb-2">
              Skills & Expertise
            </motion.h2>

            <motion.div variants={item} className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.technical.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-900/50 border border-neutral-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Design Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.design.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-900/50 border border-neutral-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.soft.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-900/50 border border-neutral-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="space-y-2">
                {profile.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-400 text-sm">{lang.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-12">
              <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700">
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

