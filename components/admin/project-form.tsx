"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, X, Loader2, Check, ChevronDown, Github, ExternalLink } from "lucide-react"
import { uploadImage } from "@/lib/supabase/storage/client"
import { TECH_TAGS } from "@/lib/constants"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectFormProps {
  project?: {
    _id?: string
    title: string
    slug: string
    description: string
    content: string
    imageUrl: string
    tags: string[]
    urlRepo?: string
    urlDemo?: string
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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [content, setContent] = useState(project?.content || "")
  const [previewContent, setPreviewContent] = useState("")
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

  const handleTagToggle = (tagId: string) => {
    if (tags.includes(tagId)) {
      setTags(tags.filter((id) => id !== tagId))
    } else {
      setTags([...tags, tagId])
    }
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
        content: content,
        tags,
        urlRepo: formData.get("urlRepo"),
        urlDemo: formData.get("urlDemo"),
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

  // Generar vista previa del markdown
  useEffect(() => {
    const previewTimer = setTimeout(() => {
      setPreviewContent(content)
    }, 500)

    return () => clearTimeout(previewTimer)
  }, [content])

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
            <Label htmlFor="urlRepo">URL del Repositorio</Label>
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-neutral-400" />
              <Input
                id="urlRepo"
                name="urlRepo"
                defaultValue={project?.urlRepo || ""}
                placeholder="https://github.com/username/repo"
                className="border-neutral-700 bg-neutral-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urlDemo">URL de Demo</Label>
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-5 w-5 text-neutral-400" />
              <Input
                id="urlDemo"
                name="urlDemo"
                defaultValue={project?.urlDemo || ""}
                placeholder="https://demo-site.com"
                className="border-neutral-700 bg-neutral-900"
              />
            </div>
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
            <Label>Tecnologías</Label>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
                >
                  <span>Seleccionar tecnologías</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[300px] w-[300px] overflow-auto border-neutral-700 bg-neutral-900">
                {TECH_TAGS.map((tag) => {
                  const isSelected = tags.includes(tag.id)
                  return (
                    <DropdownMenuItem
                      key={tag.id}
                      className={`flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-neutral-800 ${
                        isSelected ? "bg-neutral-800" : ""
                      }`}
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      <div className="flex items-center gap-2">
                        <tag.icon className="h-5 w-5" />
                        <span>{tag.name}</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tagId) => {
                const tag = TECH_TAGS.find((t) => t.id === tagId)
                if (!tag) return null

                return (
                  <div key={tagId} className="flex items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-sm">
                    <tag.icon className="h-4 w-4 mr-1" />
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => handleTagToggle(tagId)}
                      className="ml-1 rounded-full p-1 hover:bg-neutral-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )
              })}
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

      <div className="space-y-2">
        <Label>Contenido detallado (Markdown)</Label>
        <div className="rounded-lg border border-neutral-700 overflow-hidden">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="bg-neutral-900 border-b border-neutral-700 w-full justify-start rounded-none">
              <TabsTrigger value="edit" className="data-[state=active]:bg-neutral-800">
                Editar
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-neutral-800">
                Vista previa
              </TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="p-0 m-0">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-0 rounded-none min-h-[400px] bg-neutral-900 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="# Título
                
## Subtítulo

Este es un proyecto que...

### Características

- Característica 1
- Característica 2

### Instalación

```bash
npm install
npm run dev
```"
              />
            </TabsContent>
            <TabsContent value="preview" className="p-4 m-0 min-h-[400px] bg-neutral-900 border-t border-neutral-700">
              {previewContent ? (
                <div className="prose prose-invert max-w-none">
                  {previewContent
                    .split("\n")
                    .map((paragraph, index) => (paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />))}
                </div>
              ) : (
                <div className="text-neutral-500 italic">La vista previa aparecerá aquí...</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-neutral-800 hover:bg-neutral-700" disabled={isLoading}>
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

