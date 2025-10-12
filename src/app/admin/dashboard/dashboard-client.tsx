"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  ShoppingCart,
  Hammer,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  LogOut,
  MapPin,
  Phone,
  Calendar,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { toast } from "sonner"

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
  srini_owned?: boolean
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

interface Stats {
  total: number
  selling: number
  buying: number
  development: number
  processed: number
  pending: number
}

type Section = "selling" | "buying" | "development"

interface DashboardClientProps {
  session: any
}

// Separate component for search params logic
function DashboardFilters({ onFilterChange }: { onFilterChange: (filter: string | null) => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filter
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onFilterChange(null)}>All Properties</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("srini")}>SRINI Properties</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("others")}>Other Properties</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>("selling")
  const [stats, setStats] = useState<Stats>({
    total: 0,
    selling: 0,
    buying: 0,
    development: 0,
    processed: 0,
    pending: 0,
  })
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState<string | null>(null)
  const [sriniFilter, setSriniFilter] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [activeSection, stageFilter, sriniFilter])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [statsRes, submissionsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch(`/api/admin/${activeSection}-submissions`),
      ])

      if (statsRes.ok && submissionsRes.ok) {
        const statsData = await statsRes.json()
        let submissionsData = await submissionsRes.json()

        const mappedStats = {
          total: statsData.totalSubmissions || 0,
          selling: statsData.sellingSubmissions || 0,
          buying: statsData.buyingSubmissions || 0,
          development: statsData.developmentSubmissions || 0,
          processed: statsData.completedSubmissions || 0,
          pending: statsData.pendingSubmissions || 0,
        }

        // Apply SRINI filter
        if (sriniFilter === "srini") {
          submissionsData = submissionsData.filter((sub: any) => sub.srini_owned === true)
        } else if (sriniFilter === "others") {
          submissionsData = submissionsData.filter((sub: any) => !sub.srini_owned)
        }

        // Apply stage filter
        if (stageFilter) {
          submissionsData = submissionsData.filter((sub: any) => sub.stage === stageFilter)
        }

        setStats(mappedStats)
        setSubmissions(submissionsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" })
      if (res.ok) {
        toast.success("Logged out successfully")
        router.push("/admin/login")
      }
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStageColor = (stage?: string) => {
    switch (stage) {
      case "called":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "first_meeting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "second_meeting":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "deal_started":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "deal_closed":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatStageLabel = (stage?: string) => {
    switch (stage) {
      case "called":
        return "Called"
      case "first_meeting":
        return "First Meeting"
      case "second_meeting":
        return "Second Meeting"
      case "deal_started":
        return "Deal Started"
      case "deal_closed":
        return "Deal Closed"
      default:
        return stage || "N/A"
    }
  }

  const filteredSubmissions = submissions.filter((sub) => {
    const searchLower = searchQuery.toLowerCase()
    const name = sub.seller_name || sub.full_name || ""
    const phone = sub.seller_phone || sub.phone || ""
    const location = sub.location || ""

    return (
      name.toLowerCase().includes(searchLower) ||
      phone.includes(searchLower) ||
      location.toLowerCase().includes(searchLower)
    )
  })

  const renderSubmissionCard = (submission: any) => {
    const name = submission.seller_name || submission.full_name || "N/A"
    const phone = submission.seller_phone || submission.phone || "N/A"
    const isSrini = submission.srini_owned === true

    return (
      <Card
        key={submission.id}
        className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 cursor-pointer"
        onClick={() => router.push(`/admin/submission/${submission.id}?type=${activeSection}`)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {name}
                </h3>
                {isSrini && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-0.5">
                          SRINI
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>SRINI Owned Property</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{phone}</span>
                </div>
                {submission.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{submission.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {getStatusIcon(submission.processing_status)}
              {submission.stage && (
                <Badge variant="outline" className={`text-xs ${getStageColor(submission.stage)}`}>
                  {formatStageLabel(submission.stage)}
                </Badge>
              )}
            </div>
          </div>

          {activeSection === "selling" && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 font-medium">{submission.property_type}</span>
              </div>
              <div>
                <span className="text-gray-500">Size:</span>
                <span className="ml-2 font-medium">{submission.size} sq.yd</span>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-2 font-medium text-green-600">₹{submission.price}</span>
              </div>
              <div>
                <span className="text-gray-500">Facing:</span>
                <span className="ml-2 font-medium">{submission.facing}</span>
              </div>
            </div>
          )}

          {activeSection === "buying" && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 font-medium">{submission.property_type}</span>
              </div>
              <div>
                <span className="text-gray-500">Budget:</span>
                <span className="ml-2 font-medium text-green-600">{submission.budget_range}</span>
              </div>
            </div>
          )}

          {activeSection === "development" && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 font-medium">{submission.development_type}</span>
              </div>
              <div>
                <span className="text-gray-500">Size:</span>
                <span className="ml-2 font-medium">{submission.project_size}</span>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(submission.created_at).toLocaleDateString()}</span>
            </div>
            <span className="text-blue-600 font-medium group-hover:underline">View Details →</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {session?.user?.username}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/upload-property">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  <Building2 className="h-4 w-4 mr-2" />
                  Upload Property
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total</p>
                  <p className="text-3xl font-bold mt-2">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Selling</p>
                  <p className="text-3xl font-bold mt-2">{stats.selling}</p>
                </div>
                <Building2 className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Buying</p>
                  <p className="text-3xl font-bold mt-2">{stats.buying}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Development</p>
                  <p className="text-3xl font-bold mt-2">{stats.development}</p>
                </div>
                <Hammer className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Processed</p>
                  <p className="text-3xl font-bold mt-2">{stats.processed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">Pending</p>
                  <p className="text-3xl font-bold mt-2">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>Manage all property submissions</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Stage: {stageFilter ? formatStageLabel(stageFilter) : "All"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setStageFilter(null)}>All Stages</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStageFilter("called")}>Called</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStageFilter("first_meeting")}>First Meeting</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStageFilter("second_meeting")}>Second Meeting</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStageFilter("deal_started")}>Deal Started</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStageFilter("deal_closed")}>Deal Closed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Suspense fallback={<div className="h-10 w-32 bg-gray-100 animate-pulse rounded-lg" />}>
                  <DashboardFilters onFilterChange={setSriniFilter} />
                </Suspense>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as Section)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="selling" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <Building2 className="h-4 w-4 mr-2" />
                  Selling ({stats.selling})
                </TabsTrigger>
                <TabsTrigger
                  value="buying"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buying ({stats.buying})
                </TabsTrigger>
                <TabsTrigger
                  value="development"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  <Hammer className="h-4 w-4 mr-2" />
                  Development ({stats.development})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="selling">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No submissions found</p>
                  </div>
                ) : (
                  <div className="space-y-4">{filteredSubmissions.map(renderSubmissionCard)}</div>
                )}
              </TabsContent>

              <TabsContent value="buying">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No buying requests found</p>
                  </div>
                ) : (
                  <div className="space-y-4">{filteredSubmissions.map(renderSubmissionCard)}</div>
                )}
              </TabsContent>

              <TabsContent value="development">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12">
                    <Hammer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No development requests found</p>
                  </div>
                ) : (
                  <div className="space-y-4">{filteredSubmissions.map(renderSubmissionCard)}</div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
