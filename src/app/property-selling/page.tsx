"use client"

import type React from "react"
import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  MapPin,
  Loader2,
  Home,
  IndianRupee,
  User,
  Phone,
  Hash,
  X,
  FileText,
  ImageIcon,
  File,
  Star,
  Camera,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"
import { numberToWords } from "@/utils/number-to-words"
import { hyderabadAreas } from "@/data/hyderabad-areas"
import { submitPropertySelling } from "@/app/actions/submit-property-selling"
import { generatePropertyId } from "@/utils/generate-property-id"
import { analyzeLayoutDocument } from "@/app/actions/analyze-layout-document"

function PropertySellingPage() {
  const searchParams = useSearchParams()
  const [isSriniUpload, setIsSriniUpload] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [layoutImage, setLayoutImage] = useState<File | null>(null)

  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [formData, setFormData] = useState({
    propertyType: "",
    size: "",
    facing: "",
    plotNumber: "",
    price: "",
    sellerType: "",
    sellerName: "",
    sellerPhone: "",
    location: "",
    mapLink: "",
    urgency: "",
    description: "",
  })

  const [propertyDocuments, setPropertyDocuments] = useState<File[]>([])
  const [layoutDocuments, setLayoutDocuments] = useState<File[]>([])
  const [assetDocuments, setAssetDocuments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewId, setPreviewId] = useState("")

  const propertyTypes = [
    "Open Plot",
    "Independent House",
    "Apartment Flat",
    "Villas",
    "Farm Land",
    "Office Space",
    "Other",
  ]

  const facingOptions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"]
  const urgencyOptions = ["1 day", "1 week", "2 weeks", "1 month", "2 months", "3 months", "6 months"]

  useEffect(() => {
    const sriniParam = searchParams.get("srini")
    if (sriniParam === "true") {
      setIsSriniUpload(true)
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          sellerName: "SRINI REALTY ADMIN",
          sellerPhone: "7478997899",
          sellerType: "SRINI REALTY",
        }))
      }, 0)
      toast.info("SRINI Property Upload Mode", {
        description: "Contact details have been pre-filled and locked",
        duration: 3000,
      })
    }
  }, [searchParams])

  useEffect(() => {
    if (formData.propertyType && formData.size && formData.facing && formData.plotNumber) {
      const id = generatePropertyId(formData.propertyType, formData.plotNumber, formData.facing, formData.size)
      setPreviewId(id)
    } else {
      setPreviewId("")
    }
  }, [formData.propertyType, formData.size, formData.facing, formData.plotNumber])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const getSizeUnit = () => {
    if (["Villas", "Apartment Flat", "Office Space"].includes(formData.propertyType)) {
      return "Sqft"
    } else if (["Open Plot", "Independent House"].includes(formData.propertyType)) {
      return "Sq Yards"
    } else if (formData.propertyType === "Farm Land") {
      return "Acres"
    }
    return "Sqft"
  }

  const convertPriceToWords = (price: any) => {
    if (!price) return ""
    const words = numberToWords(price)
    return words ? `${words} Only` : ""
  }

  const getFileIcon = (file: File) => {
    const fileType = file.type.toLowerCase()
    if (fileType.includes("image")) {
      return <ImageIcon className="h-4 w-4 text-blue-500" />
    } else if (fileType.includes("pdf")) {
      return <FileText className="h-4 w-4 text-red-500" />
    } else if (fileType.includes("doc")) {
      return <FileText className="h-4 w-4 text-blue-600" />
    }
    return <File className="h-4 w-4 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const compressFiles = async (files: File[], maxSizeMB = 1.5): Promise<File[]> => {
    const compressedFiles: File[] = []

    for (const file of files) {
      // Only compress images
      if (!file.type.startsWith("image/")) {
        compressedFiles.push(file)
        continue
      }

      const fileSizeMB = file.size / 1024 / 1024

      // If file is under the limit, keep it as is
      if (fileSizeMB <= maxSizeMB) {
        compressedFiles.push(file)
        continue
      }

      try {
        // Compress the image
        const compressed = await new Promise<File>((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            const img = new Image()
            img.src = e.target?.result as string
            img.onload = () => {
              const canvas = document.createElement("canvas")
              const ctx = canvas.getContext("2d")
              if (!ctx) {
                reject(new Error("Failed to get canvas context"))
                return
              }

              // Calculate new dimensions (reduce by 50% if over 1.5MB)
              let width = img.width
              let height = img.height
              const scaleFactor = Math.sqrt(maxSizeMB / fileSizeMB)
              width = Math.floor(width * scaleFactor)
              height = Math.floor(height * scaleFactor)

              canvas.width = width
              canvas.height = height
              ctx.drawImage(img, 0, 0, width, height)

              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    reject(new Error("Failed to compress image"))
                    return
                  }
                  const compressedFile = new (window as any).File([blob], file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  })
                  resolve(compressedFile)
                },
                "image/jpeg",
                0.85,
              )
            }
            img.onerror = () => reject(new Error("Failed to load image"))
          }
          reader.onerror = () => reject(new Error("Failed to read file"))
        })

        compressedFiles.push(compressed)
        console.log(
          `[v0] Compressed ${file.name} from ${fileSizeMB.toFixed(2)}MB to ${(compressed.size / 1024 / 1024).toFixed(2)}MB`,
        )
      } catch (error) {
        console.error(`[v0] Failed to compress ${file.name}:`, error)
        compressedFiles.push(file)
      }
    }

    return compressedFiles
  }

  const handleLayoutImageUpload = async (file: File | null) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, etc.)")
      return
    }

    let processedFile = file
    const fileSizeMB = file.size / 1024 / 1024

    if (fileSizeMB > 1.5) {
      toast.info("Compressing image...", { duration: 1000 })
      const compressed = await compressFiles([file], 1.5)
      processedFile = compressed[0]
      const savedMB = fileSizeMB - processedFile.size / 1024 / 1024
      toast.success(`Image compressed! Saved ${savedMB.toFixed(2)}MB`, { duration: 2000 })
    }

    if (processedFile.size > 10 * 1024 * 1024) {
      toast.error(`File exceeds 10MB limit (${(processedFile.size / 1024 / 1024).toFixed(2)}MB)`)
      return
    }

    setLayoutImage(processedFile)
    setLayoutDocuments([processedFile])
    setIsAnalyzing(true)

    try {
      toast.info("Analyzing layout document with AI...", { duration: 2000 })

      const reader = new FileReader()
      reader.readAsDataURL(processedFile)

      reader.onload = async () => {
        try {
          const base64 = reader.result as string
          const result = await analyzeLayoutDocument(base64, processedFile.name)

          if (result) {
            console.log("[v0] AI analysis result:", result)

            const facingMap: Record<string, string> = {
              N: "North",
              S: "South",
              E: "East",
              W: "West",
              NE: "North-East",
              NW: "North-West",
              SE: "South-East",
              SW: "South-West",
            }

            setFormData((prev) => ({
              ...prev,
              plotNumber: result.plot_no || prev.plotNumber,
              size: result.plot_size_sq_yd?.toString() || prev.size,
              facing: result.facing ? facingMap[result.facing] || result.facing : prev.facing,
              location: result.location || prev.location,
            }))

            if (result.needs_manual_input) {
              toast.warning("Layout analyzed! Please verify and fill remaining fields.", {
                description: `Confidence: ${(result.autofill_confidence * 100).toFixed(0)}%`,
                duration: 5000,
              })
            } else {
              toast.success("Layout analyzed successfully! Fields auto-filled.", {
                description: `Confidence: ${(result.autofill_confidence * 100).toFixed(0)}%`,
                duration: 5000,
              })
            }
          } else {
            toast.error("Failed to analyze layout. Please fill fields manually.")
          }
        } catch (err) {
          console.error("[v0] Layout analysis error:", err)
          toast.error("Failed to analyze layout. Please fill fields manually.")
        } finally {
          setIsAnalyzing(false)
        }
      }

      reader.onerror = () => {
        toast.error("Failed to read file. Please try again.")
        setIsAnalyzing(false)
      }
    } catch (error) {
      console.error("[v0] Layout analysis error:", error)
      toast.error("Failed to analyze layout. Please fill fields manually.")
      setIsAnalyzing(false)
    }
  }

  const removeFile = (index: number, type: "property" | "layout" | "asset") => {
    if (type === "property") {
      setPropertyDocuments((prev) => prev.filter((_, i) => i !== index))
      toast.success("File removed successfully")
    } else if (type === "layout") {
      setLayoutDocuments((prev) => prev.filter((_, i) => i !== index))
      setLayoutImage(null) // Also clear the layout image preview if it's removed
      toast.success("Layout image removed successfully")
    } else {
      setAssetDocuments((prev) => prev.filter((_, i) => i !== index))
      toast.success("Asset document removed successfully")
    }
  }

  const validateFiles = (files: File[], maxSizePerFile = 10, maxTotalSize = 50) => {
    const maxSizeBytes = maxSizePerFile * 1024 * 1024
    const maxTotalBytes = maxTotalSize * 1024 * 1024

    for (const file of files) {
      if (file.size > maxSizeBytes) {
        return {
          valid: false,
          message: `File "${file.name}" exceeds ${maxSizePerFile}MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
        }
      }
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0)
    if (totalSize > maxTotalBytes) {
      return {
        valid: false,
        message: `Total file size exceeds ${maxTotalSize}MB limit (${(totalSize / 1024 / 1024).toFixed(2)}MB)`,
      }
    }

    return { valid: true }
  }

  const handleFileUpload = async (files: FileList | null, type: "asset") => {
    if (!files) return

    const fileArray = Array.from(files)
    const maxSizePerFile = 10 * 1024 * 1024
    const maxTotalSize = 50 * 1024 * 1024

    try {
      toast.info("Processing files...", { duration: 2000 })
      const processedFiles = await compressFiles(fileArray, 1.5)

      // Check individual file sizes after compression
      for (const file of processedFiles) {
        if (file.size > maxSizePerFile) {
          toast.error(
            `File "${file.name}" exceeds 10MB limit even after compression (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
          )
          return
        }
      }

      // Calculate total size including existing files
      const existingAssetSize = assetDocuments.reduce((sum, file) => sum + file.size, 0)
      const existingLayoutSize = layoutDocuments.reduce((sum, file) => sum + file.size, 0)
      const newFilesSize = processedFiles.reduce((sum, file) => sum + file.size, 0)
      const totalSize = existingAssetSize + existingLayoutSize + newFilesSize

      if (totalSize > maxTotalSize) {
        const currentTotalMB = ((existingAssetSize + existingLayoutSize) / 1024 / 1024).toFixed(2)
        const newFilesMB = (newFilesSize / 1024 / 1024).toFixed(2)
        const totalMB = (totalSize / 1024 / 1024).toFixed(2)

        toast.error(
          `Total file size would exceed 50MB limit. Current: ${currentTotalMB}MB, New files: ${newFilesMB}MB, Total: ${totalMB}MB`,
        )
        return
      }

      setAssetDocuments((prev) => [...prev, ...processedFiles])

      const savedSpace = fileArray.reduce((sum, f) => sum + f.size, 0) - newFilesSize
      if (savedSpace > 0) {
        toast.success(
          `${processedFiles.length} file(s) added! Saved ${(savedSpace / 1024 / 1024).toFixed(2)}MB through compression.`,
        )
      } else {
        toast.success(`${processedFiles.length} file(s) added successfully!`)
      }
    } catch (error) {
      console.error("[v0] File processing error:", error)
      toast.error("Failed to process files. Please try again.")
    }
  }

  const handlePropertyDocsUpload = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    const validation = validateFiles(fileArray, 10, 50)

    if (!validation.valid) {
      toast.error(validation.message)
      return
    }

    setPropertyDocuments((prev) => [...prev, ...fileArray])
    toast.success(`${fileArray.length} file(s) added successfully!`)
  }

  const isFormValid = () => {
    return (
      formData.propertyType &&
      formData.size &&
      formData.facing &&
      formData.plotNumber &&
      formData.price &&
      formData.sellerType &&
      formData.sellerName &&
      formData.sellerPhone &&
      layoutImage
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      toast.error("Please fill all required fields and upload layout document")
      return
    }

    setIsSubmitting(true)

    try {
      const submitFormData = new FormData()
      submitFormData.append("propertyType", formData.propertyType)
      submitFormData.append("size", formData.size)
      submitFormData.append("facing", formData.facing)
      submitFormData.append("plotNumber", formData.plotNumber)
      submitFormData.append("price", formData.price)
      submitFormData.append("sellerType", formData.sellerType)
      submitFormData.append("sellerName", formData.sellerName)
      submitFormData.append("sellerPhone", formData.sellerPhone)
      submitFormData.append("location", formData.location)
      submitFormData.append("mapLink", formData.mapLink)
      submitFormData.append("urgency", formData.urgency)
      submitFormData.append("description", formData.description)

      if (isSriniUpload) {
        submitFormData.append("isSriniOwned", "true")
      }

      assetDocuments.forEach((file, index) => {
        submitFormData.append(`assetDocument_${index}`, file)
      })
      layoutDocuments.forEach((file, index) => {
        submitFormData.append(`layoutDocument_${index}`, file)
      })

      const result = await submitPropertySelling(submitFormData)

      if (result.success) {
        toast.success(result.message, {
          description: result.customId ? `Property ID: ${result.customId}` : undefined,
          duration: 5000,
        })

        setFormData({
          propertyType: "",
          size: "",
          facing: "",
          plotNumber: "",
          price: "",
          sellerType: isSriniUpload ? "SRINI REALTY" : "",
          sellerName: isSriniUpload ? "SRINI REALTY ADMIN" : "",
          sellerPhone: isSriniUpload ? "7478997899" : "",
          location: "",
          mapLink: "",
          urgency: "",
          description: "",
        })
        setAssetDocuments([])
        setLayoutDocuments([])
        setLayoutImage(null)
        setPreviewId("")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const FilePreview = ({ files, type }: { files: File[]; type: "asset" | "layout" | "property" }) => {
    if (files.length === 0) return null

    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Uploaded Files ({files.length})</h4>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index, type)}
                className="ml-2 h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })
      setStream(mediaStream)
      setIsCameraOpen(true)

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      }, 100)
    } catch (error) {
      console.error("Camera access error:", error)
      toast.error("Unable to access camera. Please check permissions.")
    }
  }

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsCameraOpen(false)
  }

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(
      async (blob) => {
        if (!blob) return

        let file = new (window as any).File([blob], `layout-${Date.now()}.jpg`, {
          type: "image/jpeg",
        })

        const fileSizeMB = file.size / 1024 / 1024
        if (fileSizeMB > 1.5) {
          toast.info("Compressing captured photo...", { duration: 1000 })
          const compressed = await compressFiles([file], 1.5)
          file = compressed[0]
          const savedMB = fileSizeMB - file.size / 1024 / 1024
          toast.success(`Photo compressed! Saved ${savedMB.toFixed(2)}MB`, { duration: 2000 })
        }

        closeCamera()
        await handleLayoutImageUpload(file)
      },
      "image/jpeg",
      0.95,
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 md:py-8">
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="h-16 w-16 animate-spin text-purple-600" />
                <Sparkles className="h-8 w-8 text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">AI is Reading Your Layout</h3>
                <p className="text-sm text-gray-600">Extracting property details...</p>
                <p className="text-xs text-gray-500 mt-2">This will only take a few seconds</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex-1 relative">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="bg-black/80 p-6 flex justify-center gap-4">
            <Button
              onClick={closeCamera}
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <X className="mr-2 h-5 w-5" />
              Cancel
            </Button>
            <Button onClick={capturePhoto} size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
              <Camera className="mr-2 h-5 w-5" />
              Capture Photo
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 mt-14 md:mt-12">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center mb-2 md:mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 md:p-4 rounded-full">
              <Home className="h-8 md:h-12 w-8 md:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
            {isSriniUpload ? "Upload SRINI Property" : "Sell Your Property"}
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            {isSriniUpload
              ? "Add a SRINI owned property to the marketplace"
              : "Upload layout document and let AI fill basic details instantly"}
          </p>
          {isSriniUpload && (
            <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-orange-300">
              <div className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <p className="text-sm font-semibold text-orange-800">SRINI Property Upload Mode Active</p>
              </div>
            </div>
          )}
          {previewId && (
            <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-300">
              <p className="text-sm text-gray-600">Your Property ID will be:</p>
              <p className="text-xl font-bold text-green-700">{previewId}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-lg md:text-2xl flex items-center">
                <Sparkles className="mr-2 md:mr-3 h-6 md:h-8 w-6 md:w-8" />
                Upload Layout Document (AI Auto-Fill) *
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm md:text-base text-gray-700 mb-2">
                  <strong>Upload your property layout</strong> and AI will automatically extract: Plot Number, Size,
                  Facing Direction, and Location
                </p>
                <p className="text-xs md:text-sm text-gray-600">You'll need to fill other details manually</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors bg-purple-50/50 cursor-pointer"
                  onClick={openCamera}
                >
                  <Camera className="mx-auto h-10 w-10 text-purple-500 mb-3" />
                  <span className="text-sm md:text-base text-purple-600 hover:text-purple-800 font-semibold block">
                    📷 Take Photo
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Use camera to capture layout</p>
                </div>

                <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors bg-purple-50/50">
                  <ImageIcon className="mx-auto h-10 w-10 text-purple-500 mb-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLayoutImageUpload(e.target.files?.[0] || null)}
                    className="hidden"
                    id="layout-gallery"
                    disabled={isAnalyzing}
                  />
                  <label htmlFor="layout-gallery" className="cursor-pointer">
                    <span className="text-sm md:text-base text-purple-600 hover:text-purple-800 font-semibold">
                      🖼️ Choose from Gallery
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Select from photos</p>
                  </label>
                </div>
              </div>

              {layoutImage && !isAnalyzing && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <ImageIcon className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">{layoutImage.name}</p>
                    <p className="text-xs text-green-600">Layout analyzed successfully!</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setLayoutImage(null)
                      setLayoutDocuments([])
                    }}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="text-lg md:text-2xl flex items-center">
                <Home className="mr-2 md:mr-3 h-6 md:h-8 w-6 md:w-8" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative z-20">
                  <Label
                    htmlFor="propertyType"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <Home className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Property Type *
                  </Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                      {propertyTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="hover:bg-blue-50 focus:bg-blue-100 text-gray-800"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative z-10">
                  <Label htmlFor="size" className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full">
                    Size ({getSizeUnit()}) * (AI Auto-filled)
                  </Label>
                  <Input
                    id="size"
                    type="number"
                    placeholder={`Enter size in ${getSizeUnit()}`}
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500"
                  />
                </div>

                <div className="relative z-10">
                  <Label
                    htmlFor="facing"
                    className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full"
                  >
                    Facing Direction * (AI Auto-filled)
                  </Label>
                  <Select
                    value={formData.facing}
                    onValueChange={(value) => setFormData({ ...formData, facing: value })}
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500">
                      <SelectValue placeholder="Select facing direction" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                      {facingOptions.map((direction) => (
                        <SelectItem
                          key={direction}
                          value={direction}
                          className="hover:bg-blue-50 focus:bg-blue-100 text-gray-800"
                        >
                          {direction}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="plotNumber"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <Hash className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Plot Number * (AI Auto-filled)
                  </Label>
                  <Input
                    id="plotNumber"
                    type="number"
                    placeholder="Enter plot number"
                    value={formData.plotNumber}
                    onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })}
                    className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label
                    htmlFor="price"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <IndianRupee className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Expected Price (₹) *
                  </Label>
                  <Input
                    id="price"
                    type="text"
                    placeholder="Enter price in rupees"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500"
                  />
                  {formData.price && (
                    <p className="text-xs md:text-sm text-green-600 mt-1 font-medium">
                      {convertPriceToWords(formData.price)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="text-lg md:text-2xl flex items-center">
                <User className="mr-2 md:mr-3 h-6 md:h-8 w-6 md:w-8" />
                Seller Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="relative z-10">
                <Label
                  htmlFor="sellerType"
                  className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full"
                >
                  You are *
                </Label>
                {isSriniUpload ? (
                  <div className="w-full h-10 md:h-12 px-3 py-2 text-sm md:text-lg bg-gray-100 border-2 border-gray-300 rounded-md flex items-center justify-between">
                    <span className="font-semibold text-gray-700">SRINI REALTY</span>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                      <span className="text-xs text-gray-500">Locked</span>
                    </div>
                  </div>
                ) : (
                  <Select
                    value={formData.sellerType}
                    onValueChange={(value) => setFormData({ ...formData, sellerType: value })}
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500">
                      <SelectValue placeholder="Select seller type" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                      <SelectItem value="Owner" className="hover:bg-purple-50 focus:bg-purple-100 text-gray-800">
                        Owner
                      </SelectItem>
                      <SelectItem value="Agent" className="hover:bg-purple-50 focus:bg-purple-100 text-gray-800">
                        Agent
                      </SelectItem>
                      <SelectItem
                        value="Agreement Holder"
                        className="hover:bg-purple-50 focus:bg-purple-100 text-gray-800"
                      >
                        Agreement Holder
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Label
                    htmlFor="sellerName"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <User className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Your Name *
                  </Label>
                  {isSriniUpload ? (
                    <div className="w-full h-10 md:h-12 px-3 py-2 text-sm md:text-lg bg-gray-100 border-2 border-gray-300 rounded-md flex items-center justify-between">
                      <span className="font-semibold text-gray-700">SRINI REALTY ADMIN</span>
                      <span className="text-xs text-gray-500">Locked</span>
                    </div>
                  ) : (
                    <Input
                      id="sellerName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.sellerName}
                      onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                      className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500"
                    />
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="sellerPhone"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Phone Number *
                  </Label>
                  {isSriniUpload ? (
                    <div className="w-full h-10 md:h-12 px-3 py-2 text-sm md:text-lg bg-gray-100 border-2 border-gray-300 rounded-md flex items-center justify-between">
                      <span className="font-semibold text-gray-700">7478997899</span>
                      <span className="text-xs text-gray-500">Locked</span>
                    </div>
                  ) : (
                    <Input
                      id="sellerPhone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.sellerPhone}
                      onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                      className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-purple-400 focus:border-purple-500"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="text-lg md:text-2xl">Additional Information (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative z-10">
                  <Label
                    htmlFor="location"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <MapPin className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Location (AI Auto-filled)
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg max-h-60 overflow-y-auto">
                      {hyderabadAreas.map((location) => (
                        <SelectItem
                          key={location}
                          value={location}
                          className="hover:bg-orange-50 focus:bg-orange-100 text-gray-800"
                        >
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative z-10">
                  <Label
                    htmlFor="urgency"
                    className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full"
                  >
                    How urgent is the sale?
                  </Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                      {urgencyOptions.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="hover:bg-orange-50 focus:bg-orange-100 text-gray-800"
                        >
                          Within {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mapLink" className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full">
                  <MapPin className="inline w-4 md:w-5 h-4 md:h-5 mr-2" />
                  Google Maps Link
                </Label>
                <Input
                  id="mapLink"
                  type="url"
                  placeholder="Paste Google Maps link here"
                  value={formData.mapLink}
                  onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
                  className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500"
                />
              </div>

              <div>
                <Label className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full">
                  Asset Layout Documents (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-orange-400 transition-colors">
                  <Upload className="mx-auto h-8 md:h-12 w-8 md:w-12 text-gray-400 mb-2 md:mb-4" />
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
                    onChange={(e) => handleFileUpload(e.target.files, "asset")}
                    className="hidden"
                    id="asset-docs"
                  />
                  <label htmlFor="asset-docs" className="cursor-pointer">
                    <span className="text-sm md:text-lg text-orange-600 hover:text-orange-800">
                      Upload Additional Documents
                    </span>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                      Floor plans, site layouts, etc. (Max 10MB each)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Upload single files or select multiple files at once</p>
                  </label>
                </div>
                <FilePreview files={assetDocuments} type="asset" />
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full"
                >
                  Property Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property... (e.g., amenities, nearby facilities, special features)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] md:min-h-[120px] text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Property Listing"
              )}
            </Button>
            {!isFormValid() && (
              <p className="text-red-500 mt-3 text-xs md:text-sm">
                Please fill all required fields and upload layout document
              </p>
            )}
            <p className="text-gray-600 mt-2 md:mt-4 text-xs md:text-sm">
              Our team will review your listing and contact you within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PropertySellingComponent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading Form...</h1>
            <p className="text-xl text-gray-600">Please wait a moment.</p>
          </div>
        </div>
      }
    >
      <PropertySellingPage />
    </Suspense>
  )
}
