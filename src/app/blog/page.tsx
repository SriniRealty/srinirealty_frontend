"use client"

import Link from "next/link"
import { Calendar, ArrowRight, Tag, TrendingUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Suspense } from "react"

const blogPosts = [
  {
    id: 1,
    title: "Hyderabad Real Estate Market Trends 2024: Complete Investment Guide for Property Buyers",
    excerpt:
      "Comprehensive analysis of Hyderabad property market including HITEC City, Gachibowli, and Jubilee Hills price trends, emerging micro-markets, and ROI projections for smart investors.",
    author: "Rajesh Kumar - Real Estate Expert",
    date: "2024-01-15",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    readTime: "12 min read",
    featured: true,
    tags: ["Market Trends", "Investment", "Hyderabad", "ROI"],
  },
  {
    id: 2,
    title: "RERA Compliance Guide 2024: Essential Documentation for Hyderabad Property Buyers",
    excerpt:
      "Complete guide to Real Estate Regulatory Authority requirements in Telangana, mandatory RERA registrations, legal protections, and documentation checklist for safe property transactions.",
    author: "Priya Sharma - Legal Advisor",
    date: "2024-01-12",
    category: "Legal & Compliance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    readTime: "15 min read",
    featured: true,
    tags: ["RERA", "Legal", "Documentation", "Compliance"],
  },
  {
    id: 3,
    title: "Home Loan Interest Rates 2024: SBI vs HDFC vs ICICI Bank Comparison for Hyderabad Properties",
    excerpt:
      "Detailed comparison of home loan interest rates, processing fees, eligibility criteria, and special schemes from India's top banks for purchasing properties in Hyderabad and surrounding areas.",
    author: "Amit Patel - Financial Consultant",
    date: "2024-01-10",
    category: "Finance & Banking",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    readTime: "10 min read",
    featured: false,
    tags: ["Home Loans", "Banking", "Interest Rates", "Finance"],
  },
  {
    id: 4,
    title: "Best Locations in Hyderabad for Real Estate Investment: Micro-Market Analysis 2024",
    excerpt:
      "In-depth analysis of emerging and established micro-markets in Hyderabad including infrastructure development, connectivity, appreciation potential, and rental yields for informed investment decisions.",
    author: "Sunita Reddy - Market Analyst",
    date: "2024-01-08",
    category: "Location Analysis",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    readTime: "14 min read",
    featured: false,
    tags: ["Location", "Investment", "Micro-markets", "Analysis"],
  },
  {
    id: 5,
    title: "Vastu Shastra in Modern Home Design: Balancing Tradition with Contemporary Architecture",
    excerpt:
      "Expert guide on incorporating Vastu principles in modern home design, practical tips for plot selection, room placement, and architectural elements that enhance positive energy and well-being.",
    author: "Dr. Ramesh Gupta - Vastu Expert",
    date: "2024-01-05",
    category: "Design & Architecture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    readTime: "11 min read",
    featured: false,
    tags: ["Vastu", "Design", "Architecture", "Traditional"],
  },
  {
    id: 6,
    title: "Real Estate Investment ROI Calculator: Maximizing Returns in Hyderabad Property Market",
    excerpt:
      "Comprehensive guide to calculating real estate ROI, understanding capital appreciation vs rental yields, tax implications, and strategic investment planning for long-term wealth creation in Hyderabad.",
    author: "Vikram Singh - Investment Advisor",
    date: "2024-01-03",
    category: "Investment Strategy",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    readTime: "16 min read",
    featured: false,
    tags: ["ROI", "Investment", "Calculator", "Returns"],
  },
]

const categories = [
  "All Categories",
  "Market Analysis",
  "Legal & Compliance",
  "Finance & Banking",
  "Location Analysis",
  "Design & Architecture",
  "Investment Strategy",
]

const popularTags = [
  "Market Trends",
  "Investment",
  "Hyderabad",
  "RERA",
  "Home Loans",
  "ROI",
  "Legal",
  "Vastu",
  "Location",
  "Banking",
]

function BlogContent() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="h-12 w-12 text-white mr-4" />
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Real Estate Insights
            </h1>
          </div>
          <p className="text-white/90 text-lg md:text-xl max-w-4xl mx-auto drop-shadow-md leading-relaxed mb-8">
            Stay ahead in Hyderabad's dynamic real estate market with expert analysis, investment strategies, legal
            guidance, and market trends from industry professionals
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles, topics, or locations..."
              className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-16">
          {/* Featured Articles */}
          {featuredPosts.length > 0 && (
            <section>
              <div className="flex items-center mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
                <h2 className="font-heading text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Featured Articles
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white"
                  >
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        ⭐ Featured
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform"
                        >
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Regular Posts */}
          <section>
            <div className="flex items-center mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full mr-4"></div>
              <h2 className="font-heading text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Latest Articles
              </h2>
            </div>

            <div className="space-y-8">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-64 md:h-full">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <CardContent className="md:w-2/3 p-8">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-4 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          className="text-emerald-600 hover:text-emerald-700 p-0 group-hover:translate-x-1 transition-transform"
                        >
                          Read Full Article <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Categories */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-blue-600" />
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}