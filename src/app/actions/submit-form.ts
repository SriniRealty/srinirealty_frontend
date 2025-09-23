// "use server"

// import { createClient } from "@/lib/supabase/server"
// import { revalidatePath } from "next/cache"
// import {processWithOpenAI}  from "@/lib/openai-processor"
// import { uploadFile } from "@/lib/file-upload"

// // Property type mapping to match database enum values
// const PROPERTY_TYPE_MAPPING: Record<string, string> = {
//   Villa: "villa",
//   Apartment: "apartment",
//   "Independent House": "independent_house",
//   "Open Flat": "open_flat",
//   "Commercial Space": "commercial",
//   "Farm Land": "farm_land",
//   villa: "villa",
//   apartment: "apartment",
//   "independent-house": "independent_house",
//   "open-flat": "open_flat",
//   commercial: "commercial",
//   "farm-land": "farm_land",
// }

// // Facing direction mapping
// const FACING_MAPPING: Record<string, string> = {
//   North: "north",
//   South: "south",
//   East: "east",
//   West: "west",
//   "North-East": "north_east",
//   "North-West": "north_west",
//   "South-East": "south_east",
//   "South-West": "south_west",
//   north: "north",
//   south: "south",
//   east: "east",
//   west: "west",
//   "north-east": "north_east",
//   "north-west": "north_west",
//   "south-east": "south_east",
//   "south-west": "south_west",
// }

// // Define return types
// type SubmissionResult =
//   | {
//       success: true
//       message: string
//       submissionId: string
//       fileErrors: string[]
//     }
//   | {
//       success: false
//       message: string
//       fileErrors: string[]
//     }

// export async function submitForm(formData: FormData): Promise<SubmissionResult> {
//   const formType = formData.get("formType") as string

//   switch (formType) {
//     case "selling":
//       return await submitPropertySellingForm(formData)
//     case "buying":
//       return await submitPropertyBuyingForm(formData)
//     case "development":
//       return await submitPropertyDevelopmentForm(formData)
//     default:
//       return {
//         success: false,
//         message: "Invalid form type",
//         fileErrors: [],
//       }
//   }
// }

// export async function submitPropertySellingForm(formData: FormData): Promise<SubmissionResult> {
//   try {
//     const supabase = await createClient()

//     // Extract and normalize form data
//     const rawPropertyType = formData.get("propertyType") as string
//     const rawFacing = formData.get("facing") as string

//     const data = {
//       property_type: PROPERTY_TYPE_MAPPING[rawPropertyType] || rawPropertyType?.toLowerCase(),
//       property_size: formData.get("propertySize") ? Number.parseInt(formData.get("propertySize") as string) : null,
//       facing: rawFacing ? FACING_MAPPING[rawFacing] || rawFacing.toLowerCase() : null,
//       expected_price: formData.get("expectedPrice") ? Number.parseInt(formData.get("expectedPrice") as string) : null,
//       location: (formData.get("currentLocation") as string) || (formData.get("location") as string),
//       full_name: formData.get("fullName") as string,
//       phone: (formData.get("phoneNumber") as string) || (formData.get("phone") as string),
//       email: formData.get("email") as string,
//       ownership_type: (formData.get("ownershipType") as string) || "owner",
//       urgency: (formData.get("urgencyLevel") as string) || (formData.get("urgency") as string),
//       maps_link: formData.get("mapsLink") as string,
//       description: formData.get("description") as string,
//       additional_notes: (formData.get("additionalComments") as string) || (formData.get("additionalNotes") as string),
//       processing_status: "pending" as const,
//     }

//     // Handle file uploads
//     const files = formData.getAll("files") as File[]
//     const documents = formData.getAll("documents") as File[]
//     const audioFile = formData.get("audioRecording") as File | null
//     const videoFile = formData.get("videoRecording") as File | null
//     const audioVideo = formData.get("audioVideo") as File | null

//     const fileUrls: string[] = []
//     const documentUrls: string[] = []
//     const imageUrls: string[] = []
//     const audioUrls: string[] = []
//     const videoUrls: string[] = []
//     const fileErrors: string[] = []

//     // Upload regular files
//     if (files && files.length > 0) {
//       for (const file of files) {
//         if (file && file.size > 0) {
//           try {
//             const url = await uploadFile(file, "property-documents")
//             if (url) fileUrls.push(url)
//           } catch (error) {
//             fileErrors.push(`Failed to upload ${file.name}`)
//           }
//         }
//       }
//     }

//     // Upload documents
//     if (documents && documents.length > 0) {
//       for (const file of documents) {
//         if (file && file.size > 0) {
//           try {
//             const url = await uploadFile(file, "property-documents")
//             if (url) documentUrls.push(url)
//           } catch (error) {
//             fileErrors.push(`Failed to upload ${file.name}`)
//           }
//         }
//       }
//     }

//     // Upload audio file
//     // if (audioFile && audioFile.size > 0) {
//     //   try {
//     //     const url = await uploadFile(audioFile, "audio-recordings")
//     //     if (url) audioUrls.push(url)
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload audio recording`)
//     //   }
//     // }

//     // // Upload video file
//     // if (videoFile && videoFile.size > 0) {
//     //   try {
//     //     const url = await uploadFile(videoFile, "video-recordings")
//     //     if (url) videoUrls.push(url)
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload video recording`)
//     //   }
//     // }

//     // // Upload audio/video file
//     // if (audioVideo && audioVideo.size > 0) {
//     //   try {
//     //     const url = await uploadFile(audioVideo, "audio-recordings")
//     //     if (url) {
//     //       if (audioVideo.type.startsWith("audio/")) {
//     //         audioUrls.push(url)
//     //       } else {
//     //         videoUrls.push(url)
//     //       }
//     //     }
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload recording`)
//     //   }
//     // }

//     // Combine all file URLs
//     const allDocumentUrls = [...fileUrls, ...documentUrls]

//     // Add file URLs to data
//     const finalData = {
//       ...data,
//       document_urls: allDocumentUrls,
//       image_urls: imageUrls,
//       audio_urls: audioUrls,
//       video_urls: videoUrls,
//       raw_data: Object.fromEntries(formData.entries()),
//     }

//     // Insert into database
//     const { data: insertedData, error } = await supabase
//       .from("property_selling_submissions")
//       .insert([finalData])
//       .select()
//       .single()

//     if (error) {
//       console.error("Database error:", error)
//       throw new Error(`Database error: ${error.message}`)
//     }

//     // Process with OpenAI in background (don't wait for it)
//     processWithOpenAI(insertedData, "selling").catch(console.error)

//     revalidatePath("/admin/dashboard")

//     return {
//       success: true,
//       message: "Property listing submitted successfully!",
//       submissionId: insertedData.id,
//       fileErrors,
//     }
//   } catch (error) {
//     console.error("Form submission error:", error)
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
//       fileErrors: [],
//     }
//   }
// }

// export async function submitPropertyBuyingForm(formData: FormData): Promise<SubmissionResult> {
//   try {
//     const supabase = await createClient()

//     // Extract and normalize form data
//     const rawPropertyType = formData.get("propertyType") as string
//     const rawFacing = (formData.get("preferredFacing") as string) || (formData.get("facing") as string)

//     const data = {
//       property_type: PROPERTY_TYPE_MAPPING[rawPropertyType] || rawPropertyType?.toLowerCase(),
//       budget_range: formData.get("budgetRange") as string,
//       specific_budget: formData.get("maxBudget")
//         ? Number.parseInt(formData.get("maxBudget") as string)
//         : formData.get("specificBudget")
//           ? Number.parseInt(formData.get("specificBudget") as string)
//           : null,
//       preferred_location: (formData.get("preferredAreas") as string) || (formData.get("preferredLocation") as string),
//       min_size: formData.get("minArea")
//         ? Number.parseInt(formData.get("minArea") as string)
//         : formData.get("minSize")
//           ? Number.parseInt(formData.get("minSize") as string)
//           : null,
//       max_size: formData.get("maxArea")
//         ? Number.parseInt(formData.get("maxArea") as string)
//         : formData.get("maxSize")
//           ? Number.parseInt(formData.get("maxSize") as string)
//           : null,
//       facing: rawFacing ? FACING_MAPPING[rawFacing] || rawFacing.toLowerCase() : null,
//       special_requirements:
//         (formData.get("additionalRequirements") as string) || (formData.get("specialRequirements") as string),
//       full_name: (formData.get("buyerName") as string) || (formData.get("fullName") as string),
//       phone:
//         (formData.get("buyerPhone") as string) ||
//         (formData.get("phoneNumber") as string) ||
//         (formData.get("phone") as string),
//       email: (formData.get("buyerEmail") as string) || (formData.get("email") as string),
//       urgency: (formData.get("timeline") as string) || (formData.get("urgency") as string),
//       maps_link: formData.get("mapsLink") as string,
//       description: formData.get("description") as string,
//       additional_notes: formData.get("additionalNotes") as string,
//       processing_status: "pending" as const,
//     }

//     // Handle file uploads (same logic as selling form)
//     const files = formData.getAll("files") as File[]
//     const documents = formData.getAll("documents") as File[]
//     const audioFile = formData.get("audioRecording") as File | null
//     const videoFile = formData.get("videoRecording") as File | null
//     const audioVideo = formData.get("audioVideo") as File | null

//     const fileUrls: string[] = []
//     const documentUrls: string[] = []
//     const imageUrls: string[] = []
//     const audioUrls: string[] = []
//     const videoUrls: string[] = []
//     const fileErrors: string[] = []

//     // Upload files
//     if (files && files.length > 0) {
//       for (const file of files) {
//         if (file && file.size > 0) {
//           try {
//             const url = await uploadFile(file, "property-documents")
//             if (url) fileUrls.push(url)
//           } catch (error) {
//             fileErrors.push(`Failed to upload ${file.name}`)
//           }
//         }
//       }
//     }

//     if (documents && documents.length > 0) {
//       for (const file of documents) {
//         if (file && file.size > 0) {
//           try {
//             const url = await uploadFile(file, "property-documents")
//             if (url) documentUrls.push(url)
//           } catch (error) {
//             fileErrors.push(`Failed to upload ${file.name}`)
//           }
//         }
//       }
//     }

//     // if (audioFile && audioFile.size > 0) {
//     //   try {
//     //     const url = await uploadFile(audioFile, "audio-recordings")
//     //     if (url) audioUrls.push(url)
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload audio recording`)
//     //   }
//     // }

//     // if (videoFile && videoFile.size > 0) {
//     //   try {
//     //     const url = await uploadFile(videoFile, "video-recordings")
//     //     if (url) videoUrls.push(url)
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload video recording`)
//     //   }
//     // }

//     // if (audioVideo && audioVideo.size > 0) {
//     //   try {
//     //     const url = await uploadFile(audioVideo, "audio-recordings")
//     //     if (url) {
//     //       if (audioVideo.type.startsWith("audio/")) {
//     //         audioUrls.push(url)
//     //       } else {
//     //         videoUrls.push(url)
//     //       }
//     //     }
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload recording`)
//     //   }
//     // }

//     const allDocumentUrls = [...fileUrls, ...documentUrls]

//     const finalData = {
//       ...data,
//       document_urls: allDocumentUrls,
//       image_urls: imageUrls,
//       audio_urls: audioUrls,
//       video_urls: videoUrls,
//       raw_data: Object.fromEntries(formData.entries()),
//     }

//     // Insert into database
//     const { data: insertedData, error } = await supabase
//       .from("property_buying_submissions")
//       .insert([finalData])
//       .select()
//       .single()

//     if (error) {
//       console.error("Database error:", error)
//       throw new Error(`Database error: ${error.message}`)
//     }

//     // Process with OpenAI in background
//     processWithOpenAI(insertedData, "buying").catch(console.error)

//     revalidatePath("/admin/dashboard")

//     return {
//       success: true,
//       message: "Property search request submitted successfully!",
//       submissionId: insertedData.id,
//       fileErrors,
//     }
//   } catch (error) {
//     console.error("Form submission error:", error)
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
//       fileErrors: [],
//     }
//   }
// }

// export async function submitPropertyDevelopmentForm(formData: FormData): Promise<SubmissionResult> {
//   try {
//     const supabase = await createClient()

//     const data = {
//       development_type: (formData.get("developmentType") as string) || (formData.get("projectType") as string),
//       project_stage: formData.get("projectStage") as string,
//       land_area: formData.get("totalArea")
//         ? Number.parseInt(formData.get("totalArea") as string)
//         : formData.get("landArea")
//           ? Number.parseInt(formData.get("landArea") as string)
//           : null,
//       location: (formData.get("area") as string) || (formData.get("location") as string),
//       investment_budget: formData.get("totalInvestment")
//         ? Number.parseInt(formData.get("totalInvestment") as string)
//         : formData.get("investmentBudget")
//           ? Number.parseInt(formData.get("investmentBudget") as string)
//           : null,
//       expected_timeline: formData.get("projectTimeline")
//         ? Number.parseInt(formData.get("projectTimeline") as string)
//         : formData.get("expectedTimeline")
//           ? Number.parseInt(formData.get("expectedTimeline") as string)
//           : null,
//       project_description: (formData.get("projectDescription") as string) || (formData.get("description") as string),
//       partnership_requirements: formData.get("partnershipRequirements") as string,
//       full_name: (formData.get("developerName") as string) || (formData.get("fullName") as string),
//       phone:
//         (formData.get("developerPhone") as string) ||
//         (formData.get("phoneNumber") as string) ||
//         (formData.get("phone") as string),
//       email: (formData.get("developerEmail") as string) || (formData.get("email") as string),
//       ownership_type: (formData.get("ownershipType") as string) || "developer",
//       urgency: formData.get("urgency") as string,
//       maps_link: formData.get("mapsLink") as string,
//       description: (formData.get("additionalDetails") as string) || (formData.get("description") as string),
//       additional_notes: formData.get("additionalNotes") as string,
//       processing_status: "pending" as const,
//     }

//     // Handle file uploads (same logic as other forms)
//     const files = formData.getAll("files") as File[]
//     const documents = formData.getAll("documents") as File[]
//     const audioFile = formData.get("audioRecording") as File | null
//     const videoFile = formData.get("videoRecording") as File | null
//     const audioVideo = formData.get("audioVideo") as File | null

//     const fileUrls: string[] = []
//     const documentUrls: string[] = []
//     const imageUrls: string[] = []
//     const audioUrls: string[] = []
//     const videoUrls: string[] = []
//     const fileErrors: string[] = []

//     // Upload files
//     if (files && files.length > 0) {
//       for (const file of files) {
//         if (file && file.size > 0) {
//           try {
//             const url = await uploadFile(file, "property-documents")
//             if (url) fileUrls.push(url)
//           } catch (error) {
//             fileErrors.push(`Failed to upload ${file.name}`)
//           }
//         }
//       }
//     }

//     if (documents && documents.length > 0) {
//       for (const file of documents) {
//         if (file && file.size > 0) {
//           try {
//             const url = await uploadFile(file, "property-documents")
//             if (url) documentUrls.push(url)
//           } catch (error) {
//             fileErrors.push(`Failed to upload ${file.name}`)
//           }
//         }
//       }
//     }

//     // if (audioFile && audioFile.size > 0) {
//     //   try {
//     //     const url = await uploadFile(audioFile, "audio-recordings")
//     //     if (url) audioUrls.push(url)
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload audio recording`)
//     //   }
//     // }

//     // if (videoFile && videoFile.size > 0) {
//     //   try {
//     //     const url = await uploadFile(videoFile, "video-recordings")
//     //     if (url) videoUrls.push(url)
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload video recording`)
//     //   }
//     // }

//     // if (audioVideo && audioVideo.size > 0) {
//     //   try {
//     //     const url = await uploadFile(audioVideo, "audio-recordings")
//     //     if (url) {
//     //       if (audioVideo.type.startsWith("audio/")) {
//     //         audioUrls.push(url)
//     //       } else {
//     //         videoUrls.push(url)
//     //       }
//     //     }
//     //   } catch (error) {
//     //     fileErrors.push(`Failed to upload recording`)
//     //   }
//     // }

//     const allDocumentUrls = [...fileUrls, ...documentUrls]

//     const finalData = {
//       ...data,
//       document_urls: allDocumentUrls,
//       image_urls: imageUrls,
//       audio_urls: audioUrls,
//       video_urls: videoUrls,
//       raw_data: Object.fromEntries(formData.entries()),
//     }

//     // Insert into database
//     const { data: insertedData, error } = await supabase
//       .from("property_development_submissions")
//       .insert([finalData])
//       .select()
//       .single()

//     if (error) {
//       console.error("Database error:", error)
//       throw new Error(`Database error: ${error.message}`)
//     }

//     // Process with OpenAI in background
//     processWithOpenAI(insertedData, "development").catch(console.error)

//     revalidatePath("/admin/dashboard")

//     return {
//       success: true,
//       message: "Development project submitted successfully!",
//       submissionId: insertedData.id,
//       fileErrors,
//     }
//   } catch (error) {
//     console.error("Form submission error:", error)
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
//       fileErrors: [],
//     }
//   }
// }
