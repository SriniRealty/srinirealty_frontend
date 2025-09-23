"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  FileText,
  MapPin,
  Calendar,
  ExternalLink,
  Loader2,
  RefreshCw,
  X,
  LogOut,
  AlertCircle,
  Database,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface AdminSession {
  userId: string
  username: string
  role: string
}

interface DashboardClientProps {
  session: AdminSession
}

interface Submission {
  id: string
  created_at: string
  processing_status: string
  document_urls?: string[]
  image_urls?: string[]
  stage?: string
  [key: string]: any
}

interface SubmissionCounts {
  selling: number
  buying: number
  development: number
}

// Loading Component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4">
    <div className="relative">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-600 opacity-20"></div>
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">Loading Dashboard</h3>
      <p className="text-gray-600">Fetching your submissions...</p>
    </div>
  </div>
)

// Empty State Component
const EmptyState = ({
  activeTab,
  hasFilters,
  onClearFilters,
}: {
  activeTab: string
  hasFilters: boolean
  onClearFilters: () => void
}) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-6">
    <div className="relative">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
        {hasFilters ? <Search className="h-12 w-12 text-gray-400" /> : <Database className="h-12 w-12 text-gray-400" />}
      </div>
      {!hasFilters && (
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FileText className="h-4 w-4 text-blue-600" />
        </div>
      )}
    </div>

    <div className="text-center space-y-3 max-w-md">
      <h3 className="text-xl font-semibold text-gray-900">
        {hasFilters ? "No matching submissions" : `No ${activeTab} submissions yet`}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {hasFilters
          ? "We couldn't find any submissions matching your current filters. Try adjusting your search criteria or clearing the filters."
          : `You haven't received any ${activeTab} submissions yet. When customers submit ${activeTab} forms, they'll appear here.`}
      </p>
    </div>

    {hasFilters && (
      <Button
        onClick={onClearFilters}
        variant="outline"
        className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
      >
        <X className="h-4 w-4 mr-2" />
        Clear all filters
      </Button>
    )}
  </div>
)

// Error State Component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-6">
    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
    </div>

    <div className="text-center space-y-3 max-w-md">
      <h3 className="text-xl font-semibold text-gray-900">Something went wrong</h3>
      <p className="text-gray-600 leading-relaxed">
        We encountered an error while loading your submissions. Please try again or contact support if the problem
        persists.
      </p>
    </div>

    <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700 text-white">
      <RefreshCw className="h-4 w-4 mr-2" />
      Try again
    </Button>
  </div>
)

export default function DashboardClient({ session }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("selling")
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [loggingOut, setLoggingOut] = useState(false)
  const [countsLoading, setCountsLoading] = useState(true)

  const [counts, setCounts] = useState<SubmissionCounts>({
    selling: 0,
    buying: 0,
    development: 0,
  })
  const router = useRouter()

  // Fetch all counts when component mounts
  useEffect(() => {
    fetchAllCounts()
    fetchSubmissions()
  }, [])

  // Fetch submissions when active tab changes
  useEffect(() => {
    fetchSubmissions()
  }, [activeTab])

  const fetchAllCounts = async () => {
    try {
      setCountsLoading(true)
      console.log("Fetching all submission counts...")

      // Fetch counts for all three types simultaneously
      const [sellingResponse, buyingResponse, developmentResponse] = await Promise.all([
        fetch("/api/admin/selling-submissions"),
        fetch("/api/admin/buying-submissions"),
        fetch("/api/admin/development-submissions"),
      ])

      const [sellingData, buyingData, developmentData] = await Promise.all([
        sellingResponse.ok ? sellingResponse.json() : [],
        buyingResponse.ok ? buyingResponse.json() : [],
        developmentResponse.ok ? developmentResponse.json() : [],
      ])

      const newCounts = {
        selling: Array.isArray(sellingData) ? sellingData.length : 0,
        buying: Array.isArray(buyingData) ? buyingData.length : 0,
        development: Array.isArray(developmentData) ? developmentData.length : 0,
      }

      console.log("Fetched counts:", newCounts)
      setCounts(newCounts)
    } catch (error) {
      console.error("Error fetching counts:", error)
      toast.error("Failed to load submission counts")
    } finally {
      setCountsLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      setError(null)

      let endpoint = ""
      switch (activeTab) {
        case "selling":
          endpoint = "/api/admin/selling-submissions"
          break
        case "buying":
          endpoint = "/api/admin/buying-submissions"
          break
        case "development":
          endpoint = "/api/admin/development-submissions"
          break
        default:
          endpoint = "/api/admin/selling-submissions"
      }

      console.log(`Fetching submissions from: ${endpoint}`)
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error("Failed to fetch submissions")

      const data = await response.json()
      console.log(`Fetched ${data.length} ${activeTab} submissions`)
      setSubmissions(data)
    } catch (error) {
      console.error("Error fetching submissions:", error)
      setError(error instanceof Error ? error.message : "Failed to load submissions")
      toast.error("Failed to load submissions")
    } finally {
      setLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      searchTerm === "" ||
      (submission.seller_name || submission.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (submission.seller_phone || submission.phone || "").includes(searchTerm) ||
      (submission.location || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStage =
      stageFilter === "all" || (submission.stage || "called").toLowerCase() === stageFilter.toLowerCase()

    return matchesSearch && matchesStage
  })

  const handleSubmissionClick = (submission: Submission) => {
    router.push(`/admin/submission/${submission.id}?type=${activeTab}`)
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true)

      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        toast.success("Logged out successfully")
        router.push("/admin/login")
        router.refresh()
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to logout")
    } finally {
      setLoggingOut(false)
    }
  }

  const handleRefresh = async () => {
    await Promise.all([fetchAllCounts(), fetchSubmissions()])
    toast.success("Dashboard refreshed")
  }

  const getSubmissionTitle = (submission: Submission) => {
    switch (activeTab) {
      case "selling":
        return `${submission.property_type || "Property"} - ${submission.size || "N/A"} sq ft - ₹${submission.price || "N/A"}`
      case "buying":
        return `Looking for ${submission.property_type || "Property"} - Budget: ${submission.budget_range || "N/A"}`
      case "development":
        return `${submission.development_type || "Development"} - ${submission.project_size || "Size not specified"}`
      default:
        return "Property Submission"
    }
  }

  const getContactInfo = (submission: Submission) => {
    return {
      name: submission.seller_name || submission.full_name || "Unknown",
      phone: submission.seller_phone || submission.phone || "",
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getFileCount = (submission: Submission) => {
    const docCount = submission.document_urls?.length || 0
    const imgCount = submission.image_urls?.length || 0
    return docCount + imgCount
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStageFilter("all")
  }

  const getStageColor = (stage: string) => {
    switch (stage?.toLowerCase()) {
      case "called":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "first meeting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "second meeting":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "deal started":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "deal closed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const hasActiveFilters = searchTerm !== "" || stageFilter !== "all"

  // Show error state
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-lg">Welcome back, {session.role}</p>
            </div>
            <Button
              onClick={handleLogout}
              disabled={loggingOut}
              variant="outline"
              size="sm"
              className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800 shadow-sm"
            >
              {loggingOut ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <LogOut className="h-4 w-4 mr-2" />}
              {loggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
          <ErrorState onRetry={handleRefresh} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Welcome back, {session.role}</p>
          </div>
          <div className="flex justify-between items-center mb-8 gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              disabled={loading || countsLoading}
              className="bg-blue-500 text-white hover:bg-blue-600 border-gray-200 shadow-sm gap-4"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading || countsLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              disabled={loggingOut}
              variant="outline"
              size="sm"
              className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800 shadow-sm"
            >
              {loggingOut ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <LogOut className="h-4 w-4 mr-2" />}
              {loggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border border-gray-200 h-12">
            <TabsTrigger
              value="selling"
              className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white text-base cursor-pointer h-10"
            >
              Selling ({countsLoading ? <Loader2 className="h-3 w-3 ml-1 animate-spin" /> : counts.selling})
            </TabsTrigger>
            <TabsTrigger
              value="buying"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-base cursor-pointer h-10"
            >
              Buying ({countsLoading ? <Loader2 className="h-3 w-3 ml-1 animate-spin" /> : counts.buying})
            </TabsTrigger>
            <TabsTrigger
              value="development"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-base cursor-pointer h-10"
            >
              Development ({countsLoading ? <Loader2 className="h-3 w-3 ml-1 animate-spin" /> : counts.development})
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, phone, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-200 shadow-sm"
                />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200 shadow-sm">
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="called">Called</SelectItem>
                  <SelectItem value="first meeting">First Meeting</SelectItem>
                  <SelectItem value="second meeting">Second Meeting</SelectItem>
                  <SelectItem value="deal started">Deal Started</SelectItem>
                  <SelectItem value="deal closed">Deal Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="bg-white hover:bg-gray-50 border-gray-200 shadow-sm"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Content */}
          <TabsContent value={activeTab} className="space-y-4">
            {loading ? (
              <LoadingState />
            ) : filteredSubmissions.length === 0 ? (
              <EmptyState activeTab={activeTab} hasFilters={hasActiveFilters} onClearFilters={clearFilters} />
            ) : (
              <div className="space-y-3">
                {filteredSubmissions.map((submission) => {
                  const contact = getContactInfo(submission)
                  const fileCount = getFileCount(submission)

                  return (
                    <Card
                      key={submission.id}
                      className="cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-200 bg-white border-gray-200 shadow-sm"
                      onClick={() => handleSubmissionClick(submission)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg">{contact.name}</h3>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-600 font-medium">{contact.phone}</span>
                              <span className="text-gray-400">•</span>
                              <Badge
                                className={`text-xs font-medium border ${getStageColor(submission.stage || "called")}`}
                              >
                                {submission.stage || "Called"}
                              </Badge>
                            </div>
                            <p className="text-gray-700 mb-3 font-medium">{getSubmissionTitle(submission)}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(submission.created_at)}
                              </div>
                              {fileCount > 0 && (
                                <div className="flex items-center gap-1">
                                  <FileText className="h-4 w-4" />
                                  {fileCount} files
                                </div>
                              )}
                              {submission.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {submission.location}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSubmissionClick(submission)
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
