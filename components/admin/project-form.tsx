"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, X, Loader2 } from "lucide-react"
import { uploadImage } from "@/lib/supabase/storage/client"

interface ProjectFormProps {
  project?: {
    _id?: string
    title: string
    slug: string
    description: string
    content: string
    imageUrl: string
    tags: string[]
    featured: boolean
    published: boolean
  }
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(project?.imageUrl || null)
  const [tags, setTags] = useState<string[]>(project?.tags || [])
  const [currentTag, setCurrentTag] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const projectData: any = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        content: formData.get("content"),
        tags,
        featured: formData.get("featured") === "on",
        published: formData.get("published") === "on",
      }

      // Si hay una nueva imagen, súbela a Supabase
      if (imageFile) {
        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "portfolio",
          folder: "projects",
        })

        if (error) {
          throw new Error(error)
        }

        projectData.imageUrl = imageUrl
      } else if (project?.imageUrl) {
        projectData.imageUrl = project.imageUrl
      } else {
        // URL de placeholder por defecto
        projectData.imageUrl = "/placeholder.svg?height=400&width=600"
      }

      // Enviar los datos al endpoint correspondiente (crear o actualizar)
      const endpoint = project?._id ? `/api/projects/${project._id}` : "/api/projects"

      const response = await fetch(endpoint, {
        method: project?._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        throw new Error("Error al guardar el proyecto")
      }

      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      alert("Ocurrió un error al guardar el proyecto")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              defaultValue={project?.title || ""}
              required
              className="border-neutral-700 bg-neutral-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={project?.slug || ""}
              required
              className="border-neutral-700 bg-neutral-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción corta</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description || ""}
              required
              className="border-neutral-700 bg-neutral-900"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenido detallado</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={project?.content || ""}
              required
              className="border-neutral-700 bg-neutral-900"
              rows={8}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Imagen</Label>
            <div
              className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="relative h-full w-full">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      setImagePreview(null)
                      setImageFile(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mb-2 h-10 w-10 text-neutral-500" />
                  <p className="text-sm text-neutral-400">Haz clic para subir una imagen</p>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="border-neutral-700 bg-neutral-900"
                placeholder="Añadir tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                className="border-neutral-700 bg-neutral-900"
              >
                Añadir
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 rounded-full p-1 hover:bg-neutral-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="cursor-pointer">
                Destacado
              </Label>
              <Switch id="featured" name="featured" defaultChecked={project?.featured || false} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="published" className="cursor-pointer">
                Publicado
              </Label>
              <Switch id="published" name="published" defaultChecked={project?.published || false} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
          className="border-neutral-700 bg-neutral-900"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-neutral-800 hover:bg-neutral-700">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar proyecto"
          )}
        </Button>
      </div>
    </form>
  )
}

