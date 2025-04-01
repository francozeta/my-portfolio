import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { getTagsByIds } from "@/lib/constants"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  slug: string
}

export function ProjectCard({ title, description, tags, imageUrl, slug }: ProjectCardProps) {
  const projectTags = getTagsByIds(tags)

  return (
    <Link href={`/work/${slug}`}>
      <Card className="group overflow-hidden border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-colors">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium">{title}</h3>
            <div className="p-1 rounded-full bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {projectTags.map((tag) => (
              <span
                key={tag?.id}
                className="flex items-center gap-1 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded-full text-xs"
              >
                <tag.icon className="h-3 w-3" />
                {tag?.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

