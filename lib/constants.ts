import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiDjango,
  SiLaravel,
  SiDocker,
  SiGit,
  SiFirebase,
} from "react-icons/si"

export const TECH_TAGS = [
  {
    id: "react",
    name: "React",
    icon: SiReact,
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: SiJavascript,
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: SiMongodb,
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: SiNodedotjs,
  },
  {
    id: "express",
    name: "Express",
    icon: SiExpress,
  },
  {
    id: "php",
    name: "PHP",
    icon: SiPhp,
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: SiVuedotjs,
  },
  {
    id: "angular",
    name: "Angular",
    icon: SiAngular,
  },
  {
    id: "python",
    name: "Python",
    icon: SiPython,
  },
  {
    id: "django",
    name: "Django",
    icon: SiDjango,
  },
  {
    id: "laravel",
    name: "Laravel",
    icon: SiLaravel,
  },
  {
    id: "docker",
    name: "Docker",
    icon: SiDocker,
  },
  {
    id: "git",
    name: "Git",
    icon: SiGit,
  },
  {
    id: "firebase",
    name: "Firebase",
    icon: SiFirebase,
  },
]

export const getTagById = (id: string) => {
  return TECH_TAGS.find((tag) => tag.id === id)
}

export const getTagsByIds = (ids: string[]) => {
  return ids.map((id) => getTagById(id)).filter(Boolean)
}

