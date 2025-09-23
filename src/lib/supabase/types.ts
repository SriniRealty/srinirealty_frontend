export type FormType = "property_selling" | "property_buying" | "property_development"

export interface PropertySellingSubmission {
  id: string
  property_type: string
  size: number | null
  facing: string
  plot_number: number | null
  custom_id: string | null
  price: string
  seller_type: string
  seller_name: string
  seller_phone: string
  location: string | null
  map_link: string | null
  urgency: string | null
  description: string | null
  document_urls: string[] | null
  image_urls: string[] | null
  processing_status: string
  raw_data: any
  created_at: string
  updated_at: string
}

export interface PropertyBuyingSubmission {
  id: string
  property_type: string
  size_preference: string | null
  location: string | null
  budget_range: string
  full_name: string
  phone: string
  additional_requirements: string | null
  plot_number: number | null
  custom_id: string | null
  document_urls: string[] | null
  image_urls: string[] | null
  processing_status: string
  raw_data: any
  created_at: string
  updated_at: string
}

export interface PropertyDevelopmentSubmission {
  id: string
  development_type: string
  project_size: string | null
  location: string | null
  full_name: string
  phone: string
  project_description: string | null
  plot_number: number | null
  custom_id: string | null
  document_urls: string[] | null
  image_urls: string[] | null
  processing_status: string
  raw_data: any
  created_at: string
  updated_at: string
}

export interface ProcessedSubmission {
  id: string
  original_submission_id: string
  submission_type: string
  cleaned_data: any
  ai_analysis: string | null
  confidence_score: number
  processing_status: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
  password_hash: string
  role: string
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalSubmissions: number
  sellingSubmissions: number
  buyingSubmissions: number
  developmentSubmissions: number
  pendingSubmissions: number
  completedSubmissions: number
  failedSubmissions: number
  todaySubmissions: number
}

export type StorageBucket = "property-documents" | "property-images"

export interface FileUploadResult {
  success: boolean
  url?: string
  error?: string
}

export interface FormSubmissionData {
  [key: string]: string | number | boolean | null | undefined
}
