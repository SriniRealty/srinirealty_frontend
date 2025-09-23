import { requireAdminAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardClient from "./dashboard-client"

interface BaseSubmission {
  id: string
  full_name?: string
  seller_name?: string
  phone?: string
  seller_phone?: string
  processing_status: string
  created_at: string
  document_urls?: string[]
  image_urls?: string[]
  location?: string
  stage?: string
}

interface PropertySellingSubmission extends BaseSubmission {
  property_type: string
  size: number
  facing: string
  price: string
  seller_type: string
  seller_name: string
  seller_phone: string
  location: string
  map_link: string
  urgency: string
  description: string
  custom_id: string
}

interface PropertyBuyingSubmission extends BaseSubmission {
  property_type: string
  size_preference: string
  location: string
  budget_range: string
  additional_requirements: string
  full_name: string
  phone: string
}

interface PropertyDevelopmentSubmission extends BaseSubmission {
  development_type: string
  project_size: string
  location: string
  project_description: string
  full_name: string
  phone: string
}

type Section = "selling" | "buying" | "development"

export default async function AdminDashboard() {
  let session
  try {
    session = await requireAdminAuth()
  } catch (error) {
    redirect("/admin/login")
  }

  return <DashboardClient session={session} />
}
