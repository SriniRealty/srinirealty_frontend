"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
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
} from "lucide-react"
import { toast } from "sonner"
import { numberToWords } from "@/utils/number-to-words"
import { hyderabadAreas } from "@/data/hyderabad-areas"
import { submitPropertySelling } from "@/app/actions/submit-property-selling"
import { generatePropertyId } from "@/utils/generate-property-id"
import { compressFiles } from "@/utils/compress-image"

function PropertySelling() {
  const searchParams = useSearchParams()
  const [isSriniUpload, setIsSriniUpload] = useState(false)

  const [formData, setFormData] = useState({
    propertyType: "",
    size: "",
    sizeUnit: "",
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

  // Check for SRINI upload parameters on mount
  useEffect(() => {
    const sriniParam = searchParams.get("srini")
    if (sriniParam === "true") {
      setIsSriniUpload(true)
      // Use setTimeout to ensure the state updates properly
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

  // Generate preview ID when relevant fields change
  useEffect(() => {
    if (formData.propertyType && formData.size && formData.facing && formData.plotNumber) {
      const id = generatePropertyId(formData.propertyType, formData.plotNumber, formData.facing, formData.size)
      setPreviewId(id)
    } else {
      setPreviewId("")
    }
  }, [formData.propertyType, formData.size, formData.facing, formData.plotNumber])

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

  const removeFile = (index: number, type: "property" | "layout") => {
    if (type === "property") {
      setPropertyDocuments((prev) => prev.filter((_, i) => i !== index))
      toast.success("File removed successfully")
    } else {
      setLayoutDocuments((prev) => prev.filter((_, i) => i !== index))
      toast.success("File removed successfully")
    }
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
      propertyDocuments.length > 0
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      toast.error("Please fill all required fields and upload property documents")
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData object
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

      // Add SRINI flag if it's a SRINI upload
      if (isSriniUpload) {
        submitFormData.append("isSriniOwned", "true")
      }

      // Add files
      propertyDocuments.forEach((file, index) => {
        submitFormData.append(`propertyDocument_${index}`, file)
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
        // Reset form completely
        setFormData({
          propertyType: "",
          size: "",
          sizeUnit: "",
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
        setPropertyDocuments([])
        setLayoutDocuments([])
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

  const handleFileUpload = async (files: FileList | null, type: "property" | "layout") => {
  if (!files) return

  const fileArray = Array.from(files)
  const maxSizePerFile = 10 * 1024 * 1024 // 5MB for Supabase free tier
  const maxTotalSize = 50 * 1024 * 1024 // 25MB total

  try {
    // Compress images automatically
    toast.info("Processing files...", { duration: 2000 })
    const processedFiles = await compressFiles(fileArray, 3)

    // Check individual file sizes after compression
    for (const file of processedFiles) {
      if (file.size > maxSizePerFile) {
        toast.error(
          `File "${file.name}" exceeds 5MB limit even after compression (${(file.size / 1024 / 1024).toFixed(2)}MB). Please use a smaller file.`
        )
        return
      }
    }

    // Calculate total size including existing files
    const existingPropertySize = propertyDocuments.reduce((sum, file) => sum + file.size, 0)
    const existingLayoutSize = layoutDocuments.reduce((sum, file) => sum + file.size, 0)
    const newFilesSize = processedFiles.reduce((sum, file) => sum + file.size, 0)
    const totalSize = existingPropertySize + existingLayoutSize + newFilesSize

    // Check if total size exceeds limit
    if (totalSize > maxTotalSize) {
      const currentTotalMB = ((existingPropertySize + existingLayoutSize) / 1024 / 1024).toFixed(2)
      const newFilesMB = (newFilesSize / 1024 / 1024).toFixed(2)
      const totalMB = (totalSize / 1024 / 1024).toFixed(2)

      toast.error(
        `Total file size would exceed 25MB limit. Current: ${currentTotalMB}MB, New files: ${newFilesMB}MB, Total: ${totalMB}MB`
      )
      return
    }

    // Add files if validation passes
    if (type === "property") {
      setPropertyDocuments((prev) => [...prev, ...processedFiles])
    } else if (type === "layout") {
      setLayoutDocuments((prev) => [...prev, ...processedFiles])
    }

    const savedSpace = fileArray.reduce((sum, f) => sum + f.size, 0) - newFilesSize
    if (savedSpace > 0) {
      toast.success(
        `${processedFiles.length} file(s) added! Saved ${(savedSpace / 1024 / 1024).toFixed(2)}MB through compression.`
      )
    } else {
      toast.success(`${processedFiles.length} file(s) added successfully!`)
    }
  } catch (error) {
    console.error("File processing error:", error)
    toast.error("Failed to process files. Please try again.")
  }
}

  const FilePreview = ({ files, type }: { files: File[]; type: "property" | "layout" }) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-4 md:py-8">
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
              : "List your property with us and reach thousands of potential buyers"}
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
          {/* Property Details Section */}
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
                    Size ({getSizeUnit()}) *
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
                    Facing Direction *
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
                    Plot Number *
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

              <div>
                <Label className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full">
                  Upload Property Documents *
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-8 md:h-12 w-8 md:w-12 text-gray-400 mb-2 md:mb-4" />
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e.target.files, "property")}
                    className="hidden"
                    id="property-docs"
                  />
                  <label htmlFor="property-docs" className="cursor-pointer">
                    <span className="text-sm md:text-lg text-blue-600 hover:text-blue-800">Choose files to upload</span>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                      PDF, DOC, JPG, PNG files accepted (Max 10MB each)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      You can select multiple files at once or upload them one by one
                    </p>
                  </label>
                </div>
                <FilePreview files={propertyDocuments} type="property" />
              </div>
            </CardContent>
          </Card>

          {/* Seller Details Section */}
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

          {/* Additional Information Section */}
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
                    Location
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
                    onChange={(e) => handleFileUpload(e.target.files, "layout")}
                    className="hidden"
                    id="layout-docs"
                  />
                  <label htmlFor="layout-docs" className="cursor-pointer">
                    <span className="text-sm md:text-lg text-orange-600 hover:text-orange-800">
                      Upload Layout Documents
                    </span>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                      Floor plans, site layouts, etc. (Max 10MB each)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Upload single files or select multiple files at once</p>
                  </label>
                </div>
                <FilePreview files={layoutDocuments} type="layout" />
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
                Please fill all required fields (including plot number) and upload property documents
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Loading Properties…
            </h1>
            <p className="text-xl text-gray-600">Please wait a moment.</p>
          </div>
        </div>
      }
    >
      <PropertySelling />
    </Suspense>
  )
}
