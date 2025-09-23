import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
  fileName?: string
}

export async function uploadFile(file: File, bucket = "property-documents", folder = "uploads"): Promise<UploadResult> {
  try {
    // Check file size (8MB limit per file - reduced from 10MB to leave room for other form data)
    const maxSize = 10 * 1024 * 1024 // 8MB in bytes
    if (file.size > maxSize) {
      return {
        success: false,
        error: `File size exceeds 8MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
      }
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg", 
      "image/png",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Invalid file type. Only images, PDFs, and Word documents are allowed.",
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const fileName = `${timestamp}-${randomString}.${fileExtension}`
    const filePath = `${folder}/${fileName}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Upload error:", error)
      return {
        success: false,
        error: `Upload failed: ${error.message}`,
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return {
      success: true,
      url: urlData.publicUrl,
      fileName: fileName,
    }
  } catch (error) {
    console.error("File upload error:", error)
    return {
      success: false,
      error: "Upload failed due to an unexpected error",
    }
  }
}

export async function uploadMultipleFiles(
  files: File[],
  bucket = "property-documents",
  folder = "uploads",
): Promise<UploadResult[]> {
  // Check total size (don't exceed 8MB total to leave room for form data)
  const totalSize = files.reduce((sum, file) => sum + file.size, 0)
  const maxTotalSize = 10 * 1024 * 1024 // 8MB total

  if (totalSize > maxTotalSize) {
    return files.map(() => ({
      success: false,
      error: `Total file size exceeds 8MB limit. Current total: ${(totalSize / 1024 / 1024).toFixed(2)}MB`,
    }))
  }

  const uploadPromises = files.map((file) => uploadFile(file, bucket, folder))
  return Promise.all(uploadPromises)
}

export async function deleteFile(url: string, bucket: "property-documents" | "property-images"): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = url.split("/")
    const fileName = urlParts[urlParts.length - 1]
    const filePath = `uploads/${fileName}`

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      console.error("Delete error:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("File delete error:", error)
    return false
  }
}