"use client"

import type React from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Globe, ChevronRight, Check } from "lucide-react"
import { getTagById } from "@/lib/constants"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  slug: string
  urlRepo?: string
  urlDemo?: string
  featured?: boolean
  completed?: boolean
}

export function ProjectCard({
  title,
  description,
  tags = [],
  imageUrl,
  slug,
  urlRepo,
  urlDemo,
  featured,
  completed = false,
}: ProjectCardProps) {
  const router = useRouter()
  // Solo tomamos el primer tag para mostrar (para un diseño más minimalista)
  const primaryTag = tags.length > 0 ? getTagById(tags[0]) : null

  const handleCardClick = () => {
    router.push(`/work/${slug}`)
  }

  const handleExternalLinkClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.stopPropagation() // Prevent card navigation
    window.open(url, "_blank")
  }

  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      <Card className="overflow-hidden border-neutral-800 bg-black hover:bg-neutral-900/90 transition-all duration-300 p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
          />
        </div>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-white">{title}</h3>
            {completed && (
              <Badge
                variant="outline"
                className="bg-transparent border-neutral-700 text-neutral-400 text-xs px-2 py-0.5 h-6 flex items-center gap-1"
              >
                <Check className="h-3 w-3" /> Completed
              </Badge>
            )}
            {featured && !completed && (
              <Badge className="bg-neutral-800 hover:bg-neutral-700 text-xs px-2 py-0.5 h-6">Featured</Badge>
            )}
          </div>

          <p className="text-xs text-neutral-400 line-clamp-1">{description}</p>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {primaryTag && (
                <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-1 rounded-full">
                  <primaryTag.icon className="h-3 w-3 text-neutral-400" />
                  <span className="text-xs text-neutral-400">{primaryTag.name}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {urlRepo && (
                <button
                  onClick={(e) => handleExternalLinkClick(e, urlRepo)}
                  className="text-neutral-500 hover:text-white transition-colors"
                  aria-label="View GitHub repository"
                >
                  <Github className="h-4 w-4" />
                </button>
              )}
              {urlDemo && (
                <button
                  onClick={(e) => handleExternalLinkClick(e, urlDemo)}
                  className="text-neutral-500 hover:text-white transition-colors"
                  aria-label="View live demo"
                >
                  <Globe className="h-4 w-4" />
                </button>
              )}
              <span className="text-xs text-neutral-500 flex items-center group-hover:text-white transition-colors">
                View details
                <ChevronRight className="h-3 w-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

