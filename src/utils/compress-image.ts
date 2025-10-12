// lib/compress-image.ts

/**
 * Compresses image files (JPG, JPEG, PNG, WebP) to meet size requirements
 * @param file - The file to compress
 * @param maxSizeMB - Maximum file size in MB (default: 3)
 * @returns Compressed file or original if not an image/already small enough
 */
export async function compressImage(file: File, maxSizeMB: number = 3): Promise<File> {
  const targetSize = maxSizeMB * 1024 * 1024
  
  // List of supported image types for compression
  const supportedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  // If file is already small enough, return as is
  if (file.size <= targetSize) {
    console.log(`File ${file.name} is under ${maxSizeMB}MB (${(file.size / 1024 / 1024).toFixed(2)}MB), skipping compression`)
    return file
  }
  
  // Only compress supported image types
  if (!supportedImageTypes.includes(file.type.toLowerCase())) {
    // For non-image files (PDF, DOC, DWG, etc.), return original
    console.log(`File ${file.name} is not an image, skipping compression`)
    return file
  }

  console.log(`Compressing ${file.name} from ${(file.size / 1024 / 1024).toFixed(2)}MB...`)

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        // Calculate scale factor based on file size
        // Larger files need more aggressive dimension reduction
        const sizeMB = file.size / (1024 * 1024)
        let maxDimension = 1920
        
        if (sizeMB > 8) {
          maxDimension = 1280 // Very large files
        } else if (sizeMB > 5) {
          maxDimension = 1600 // Large files
        } else if (sizeMB > 3) {
          maxDimension = 1920 // Files just over 3MB threshold
        }
        
        // Scale down dimensions if needed
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width
            width = maxDimension
          } else {
            width = (width * maxDimension) / height
            height = maxDimension
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }
        
        // Use better image smoothing
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)
        
        // Start with quality 0.85 and reduce if needed
        let quality = 0.85
        const minQuality = 0.3
        
        const tryCompress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'))
                return
              }
              
              // If still too large and quality can be reduced, try again
              if (blob.size > targetSize && quality > minQuality) {
                quality -= 0.1
                tryCompress()
                return
              }
              
              // Determine output format
              const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
              
              const compressedFile = new File([blob], file.name, {
                type: outputType,
                lastModified: Date.now(),
              })
              
              console.log(`Compressed ${file.name}: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB (${((1 - compressedFile.size / file.size) * 100).toFixed(1)}% reduction)`)
              resolve(compressedFile)
            },
            file.type === 'image/png' ? 'image/png' : 'image/jpeg',
            quality
          )
        }
        
        tryCompress()
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
  })
}

/**
 * Process multiple files - compress images over 3MB, return others as-is
 * @param files - Array of files to process
 * @param maxSizeMB - Maximum size for compressed images (default: 3)
 * @returns Promise resolving to array of processed files
 */
export async function compressFiles(files: File[], maxSizeMB: number = 3): Promise<File[]> {
  const processingPromises = files.map(async (file) => {
    try {
      // Only attempt compression on images
      if (file.type.startsWith('image/')) {
        return await compressImage(file, maxSizeMB)
      }
      // Return non-image files as-is (PDF, DOC, DOCX, DWG, etc.)
      console.log(`File ${file.name} is not an image, uploading as-is`)
      return file
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error)
      // If compression fails, return original file
      return file
    }
  })
  
  return Promise.all(processingPromises)
}