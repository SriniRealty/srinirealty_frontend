"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Hammer,
  Building,
  MapPin,
  Loader2,
  User,
  Phone,
  X,
  FileText,
  ImageIcon,
  File,
} from "lucide-react";
import { toast } from "sonner";
import { hyderabadAreas } from "@/data/hyderabad-areas";
import { submitPropertyDevelopment } from "@/app/actions/submit-property-development";
import { compressFiles } from "@/utils/compress-image";

export default function DevelopPropertyPage() {
  const [formData, setFormData] = useState({
    propertyType: "",
    size: "",
    location: "",
    name: "",
    phone: "",
    description: "",
  });

  const [propertyDocuments, setPropertyDocuments] = useState<File[]>([]);
  const [layoutDocuments, setLayoutDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = [
    "Residential Villa",
    "Apartment Complex",
    "Independent House",
    "Commercial Building",
    "Mixed Use Development",
    "Gated Community",
    "Other",
  ];

  const getSizeOptions = () => {
    if (
      ["Residential Villa", "Independent House"].includes(formData.propertyType)
    ) {
      return [
        "1000-2000 Sqft",
        "2000-3000 Sqft",
        "3000-5000 Sqft",
        "5000-10000 Sqft",
        "10000+ Sqft",
      ];
    } else if (
      [
        "Apartment Complex",
        "Commercial Building",
        "Mixed Use Development",
      ].includes(formData.propertyType)
    ) {
      return [
        "5000-10000 Sqft",
        "10000-25000 Sqft",
        "25000-50000 Sqft",
        "50000-100000 Sqft",
        "100000+ Sqft",
      ];
    } else if (formData.propertyType === "Gated Community") {
      return [
        "1-2 Acres",
        "2-5 Acres",
        "5-10 Acres",
        "10-20 Acres",
        "20+ Acres",
      ];
    }
    return ["Please specify in description"];
  };

  const getFileIcon = (file: File) => {
    const fileType = file.type.toLowerCase();
    if (fileType.includes("image")) {
      return <ImageIcon className="h-4 w-4 text-blue-500" />;
    } else if (fileType.includes("pdf")) {
      return <FileText className="h-4 w-4 text-red-500" />;
    } else if (fileType.includes("doc")) {
      return <FileText className="h-4 w-4 text-blue-600" />;
    }
    return <File className="h-4 w-4 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const removeFile = (index: number, type: "property" | "layout") => {
    if (type === "property") {
      setPropertyDocuments((prev) => prev.filter((_, i) => i !== index));
      toast.success("File removed successfully");
    } else {
      setLayoutDocuments((prev) => prev.filter((_, i) => i !== index));
      toast.success("File removed successfully");
    }
  };

  const validateFiles = (
    files: File[],
    maxSizePerFile = 10,
    maxTotalSize = 50
  ) => {
    const maxSizeBytes = maxSizePerFile * 1024 * 1024;
    const maxTotalBytes = maxTotalSize * 1024 * 1024;

    // Check individual file sizes
    for (const file of files) {
      if (file.size > maxSizeBytes) {
        return {
          valid: false,
          message: `File "${file.name}" exceeds ${maxSizePerFile}MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
        };
      }
    }

    // Check total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > maxTotalBytes) {
      return {
        valid: false,
        message: `Total file size exceeds ${maxTotalSize}MB limit (${(totalSize / 1024 / 1024).toFixed(2)}MB)`,
      };
    }

    return { valid: true };
  };

  // Updated file upload handler with 3MB compression threshold
  const handleFileUpload = async (
    files: FileList | null,
    type: "property" | "layout"
  ) => {
    if (!files) return;

    const fileArray = Array.from(files);

    // Validate files with 10MB per file and 50MB total limit
    const validation = validateFiles(fileArray, 10, 50);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    try {
      // Show processing toast for images
      const hasImages = fileArray.some((file) =>
        file.type.startsWith("image/")
      );
      if (hasImages) {
        toast.info("Processing files...", { duration: 2000 });
      }

      // Compress images over 3MB, keep others as-is
      const processedFiles = await compressFiles(fileArray, 3);

      // Check if any files are still over 10MB after processing
      const oversizedFiles = processedFiles.filter(
        (file) => file.size > 10 * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        toast.error(
          `${oversizedFiles.length} file(s) still exceed 10MB after compression. Please use smaller files.`
        );
        return;
      }

      // Calculate how much space was saved
      const originalSize = fileArray.reduce((sum, f) => sum + f.size, 0);
      const processedSize = processedFiles.reduce((sum, f) => sum + f.size, 0);
      const savedSpace = originalSize - processedSize;

      // Add files to the appropriate list
      if (type === "property") {
        setPropertyDocuments((prev) => [...prev, ...processedFiles]);
      } else if (type === "layout") {
        setLayoutDocuments((prev) => [...prev, ...processedFiles]);
      }

      // Show success message with compression info if applicable
      if (savedSpace > 100 * 1024) {
        // Show if saved more than 100KB
        toast.success(
          `${processedFiles.length} file(s) added! Saved ${(savedSpace / 1024 / 1024).toFixed(2)}MB through compression.`,
          { duration: 4000 }
        );
      } else {
        toast.success(`${processedFiles.length} file(s) added successfully!`);
      }
    } catch (error) {
      console.error("File processing error:", error);
      toast.error("Failed to process files. Please try again.");
    }
  };
  const isFormValid = () => {
    return (
      formData.propertyType &&
      formData.name &&
      formData.phone &&
      (propertyDocuments.length > 0 || layoutDocuments.length > 0)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error(
        "Please fill all required fields and upload at least one document"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const submitFormData = new FormData();
      submitFormData.append("propertyType", formData.propertyType);
      submitFormData.append("size", formData.size);
      submitFormData.append("location", formData.location);
      submitFormData.append("name", formData.name);
      submitFormData.append("phone", formData.phone);
      submitFormData.append("description", formData.description);

      // Add files
      propertyDocuments.forEach((file, index) => {
        submitFormData.append(`propertyDocument_${index}`, file);
      });
      layoutDocuments.forEach((file, index) => {
        submitFormData.append(`layoutDocument_${index}`, file);
      });

      const result = await submitPropertyDevelopment(submitFormData);

      if (result.success) {
        toast.success(result.message);
        // Reset form completely
        setFormData({
          propertyType: "",
          size: "",
          location: "",
          name: "",
          phone: "",
          description: "",
        });
        setPropertyDocuments([]);
        setLayoutDocuments([]);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FilePreview = ({
    files,
    type,
  }: {
    files: File[];
    type: "property" | "layout";
  }) => {
    if (files.length === 0) return null;

    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-gray-700">
          Uploaded Files ({files.length})
        </h4>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4 mt-14 md:mt-12">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center mb-2 md:mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-purple-500 p-3 md:p-4 rounded-full">
              <Hammer className="h-8 md:h-12 w-8 md:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
            Develop Your Property
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            Partner with Srini Realty to develop your property into a premium
            project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Card: Property Information */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="text-lg md:text-2xl flex items-center">
                <Building className="mr-2 md:mr-3 h-6 md:h-8 w-6 md:w-8" />
                Property Development Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-8">
              {/* Property Information */}
              <div className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="relative z-20">
                    <Label
                      htmlFor="propertyType"
                      className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                    >
                      <Building className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                      Development Type *
                    </Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          propertyType: value,
                          size: "",
                        })
                      }
                    >
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500">
                        <SelectValue placeholder="Select development type" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                        {propertyTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="hover:bg-orange-50 focus:bg-orange-100 text-gray-800"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative z-10">
                    <Label
                      htmlFor="size"
                      className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full"
                    >
                      Project Size
                    </Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) =>
                        setFormData({ ...formData, size: value })
                      }
                      disabled={!formData.propertyType}
                    >
                      <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500 disabled:opacity-50">
                        <SelectValue
                          placeholder={
                            formData.propertyType
                              ? "Select project size"
                              : "Select development type first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                        {getSizeOptions().map((size) => (
                          <SelectItem
                            key={size}
                            value={size}
                            className="hover:bg-orange-50 focus:bg-orange-100 text-gray-800"
                          >
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="relative z-10">
                  <Label
                    htmlFor="location"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <MapPin className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Property Location
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500">
                      <SelectValue placeholder="Select property location" />
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
                      <SelectItem
                        value="Other Location"
                        className="hover:bg-orange-50 focus:bg-orange-100 text-gray-800"
                      >
                        Other Location
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card: Documents + Contact + Description + Submit */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="text-lg md:text-2xl flex items-center">
                <Building className="mr-2 md:mr-3 h-6 md:h-8 w-6 md:w-8" />
                Documents & Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Document Upload */}
              <div className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Label className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full">
                      Property Documents *
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-orange-400 transition-colors">
                      <Upload className="mx-auto h-8 md:h-12 w-8 md:w-12 text-gray-400 mb-2 md:mb-4" />
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(e.target.files, "property")
                        }
                        className="hidden"
                        id="property-docs"
                      />
                      <label htmlFor="property-docs" className="cursor-pointer">
                        <span className="text-sm md:text-lg text-orange-600 hover:text-orange-800">
                          Upload Property Documents
                        </span>
                        <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                          Title deeds, survey documents, etc. (Max 10MB each)
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Select multiple files or upload one by one
                        </p>
                      </label>
                    </div>
                    <FilePreview files={propertyDocuments} type="property" />
                  </div>

                  <div>
                    <Label className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full">
                      Asset Layout Documents
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-purple-400 transition-colors">
                      <Upload className="mx-auto h-8 md:h-12 w-8 md:w-12 text-gray-400 mb-2 md:mb-4" />
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
                        onChange={(e) =>
                          handleFileUpload(e.target.files, "layout")
                        }
                        className="hidden"
                        id="layout-docs"
                      />
                      <label htmlFor="layout-docs" className="cursor-pointer">
                        <span className="text-sm md:text-lg text-purple-600 hover:text-purple-800">
                          Upload Layout Plans
                        </span>
                        <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                          Architectural plans, site layouts, etc. (Max 10MB
                          each)
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Upload single files or select multiple files
                        </p>
                      </label>
                    </div>
                    <FilePreview files={layoutDocuments} type="layout" />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 border-b pb-2">
                  Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                    >
                      <User className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                    >
                      <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <Label
                  htmlFor="description"
                  className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full"
                >
                  Project Vision & Requirements (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your vision for this development project... What type of development are you looking for? Any specific requirements or preferences?"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[100px] md:min-h-[120px] text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-orange-400 focus:border-orange-500"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4 md:pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Development Request"
                  )}
                </Button>
                {!isFormValid() && (
                  <p className="text-red-500 mt-3 text-xs md:text-sm">
                    Please fill all required fields and upload at least one
                    document
                  </p>
                )}
                <p className="text-gray-600 mt-2 md:mt-4 text-xs md:text-sm">
                  Our development team will review your request and contact you
                  within 48 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
