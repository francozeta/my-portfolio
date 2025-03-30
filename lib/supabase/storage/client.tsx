import { createSupabaseClient } from "../create-client"
import { v4 as uuidv4 } from "uuid"
import imageCompression from "browser-image-compression"

function getStorage() {
  const { storage } = createSupabaseClient()
  return storage
}

type UploadProps = {
  file: File
  bucket: string
  folder?: string
}

export const uploadImage = async ({ file, bucket, folder }: UploadProps) => {
  const fileName = file.name
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1)
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`

  let compressedFile = file
  try {
    // Comprimir la imagen si es posible
    compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
    })
  } catch (error) {
    console.error("Error comprimiendo imagen:", error)
    // Continuar con el archivo original si falla la compresión
  }

  const storage = getStorage()

  const { data, error } = await storage.from(bucket).upload(path, compressedFile)

  if (error) {
    console.error("Error subiendo imagen:", error)
    return { imageUrl: "", error: "Error al subir la imagen" }
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data?.path}`

  return { imageUrl, error: "" }
}

export const deleteImage = async (imageUrl: string) => {
  if (!imageUrl || !imageUrl.includes("/storage/v1/object/public/")) {
    return { data: null, error: "URL de imagen inválida" }
  }

  const bucketAndPathString = imageUrl.split("/storage/v1/object/public/")[1]
  const firstSlashIndex = bucketAndPathString.indexOf("/")

  const bucket = bucketAndPathString.slice(0, firstSlashIndex)
  const path = bucketAndPathString.slice(firstSlashIndex + 1)

  const storage = getStorage()

  const { data, error } = await storage.from(bucket).remove([path])

  return { data, error }
}

