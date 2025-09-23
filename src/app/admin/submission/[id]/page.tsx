import { redirect } from "next/navigation"
import { requireAdminAuth } from "@/lib/auth"
import SubmissionDetailClient from "./submission-detail-client"

interface PageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    type?: string
  }>
}

export default async function SubmissionPage({ params, searchParams }: PageProps) {
  try {
    // Verify admin authentication and get session
    const session = await requireAdminAuth()

    // Await params and searchParams as required by Next.js 15
    const resolvedParams = await params
    const resolvedSearchParams = await searchParams

    const submissionId = resolvedParams.id
    const submissionType = resolvedSearchParams.type || "selling"

    console.log("Submission page accessed:", { submissionId, submissionType })

    // Validate submission type
    if (!["selling", "buying", "development"].includes(submissionType)) {
      console.log("Invalid submission type, redirecting to dashboard")
      redirect("/admin/dashboard")
    }

    return <SubmissionDetailClient submissionId={submissionId} submissionType={submissionType} session={session} />
  } catch (error) {
    console.error("Submission page error:", error)
    redirect("/admin/login")
  }
}
