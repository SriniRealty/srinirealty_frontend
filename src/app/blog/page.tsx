// File: app/blog/page.tsx

"use client";

import Link from "next/link";
import React from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  Tag,
  TrendingUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// SEO-Optimized Keywords
const seoKeywords = [
  "hyderabad real estate",
  "hyd real estate",
  "hyderabad india real estate",
  "india real estate hyderabad",
  "real estate hyderabad telangana",
  "apartments for sale in hyderabad",
  "flats in hyderabad for sale",
  "villas for sale hyderabad",
  "apartments for sale hyderabad india",
  "eenadu classifieds hyderabad real estate today",
  "house for sale in hyderabad",
  "home for sale hyderabad",
  "hyd house for sale",
  "house for sale hyderabad india",
  "hyd house sale",
  "commercial property for sale in hyderabad",
  "commercial space for sale in hyderabad",
  "commercial building for sale in hyderabad",
  "commercial property for sale hyderabad india",
  "commercial property for sale in hyderabad india",
  "independent house for sale in hyderabad",
  "independent houses for sale in hyd",
  "hyderabad housing",
  "luxurious apartments in hyderabad",
  "homes",
  "real estate",
  "properties",
  "buy house",
  "real estate business",
  "houses for sale",
  "real estate agent",
  "buy property",
  "real estate agents near me",
  "commercial property",
  "rera website",
  "home sale",
  "real estate near me",
  "realty near me",
  "farm land",
  "houses for sale near me",
  "sobha realty",
  "farm land for sale",
  "agriculture land for sale",
  "homes for sale",
  "land for sale",
  "realtors",
  "plots for sale in hyderabad",
  "land for sale in hyderabad",
  "buy plots in hyderabad",
  "apartments for sale hyderabad",
  "hyderabad flat sale",
  "house for sale hyderabad",
  "homes for sale hyderabad",
  "house sale in hyderabad india",
  "flats for sale in hyderabad",
  "apartment for sale in hyderabad",
  "apartments for sale in hyderabad india",
  "hyd flats for sale",
  "apartment flats for sale in hyderabad",
  "hyd apartments for sale",
  "buying flat in hyderabad",
  "apartments for sale in hyd",
  "apartments in hyd for sale",
  "flat for sale in hyderabad india",
  "hyd flat for sale",
  "house to buy in bangalore",
  "commercial real estate india",
  "bangalore house sale",
  "commercial property in india",
  "house for sale in hyderabad india",
  "chennai house for sale",
  "mumbai real estate",
  "house to buy in chennai",
  "mumbai realty",
  "real estate chennai",
  "Gachibowli",
  "Banjara Hills",
  "Jubilee Hills",
  "Hitech",
  "Manikonda",
  "Kondapur",
  "Financial District",
  "Kothaguda",
  "Miyapur",
  "Kukatpally",
  "Kompally",
  "Kollur",
  "Kokapet",
  "Tellapur",
  "Sagar Ring Road",
  "LB Nagar",
  "Uppal",
  "Hastinapuram",
  "Vanasthalipuram",
];

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title:
      "Hyderabad Real Estate Market Trends 2024: Complete Investment Guide for Property Buyers",
    excerpt:
      "Comprehensive analysis of Hyderabad property market including HITEC City, Gachibowli, and Jubilee Hills price trends, emerging micro-markets, and ROI projections for smart investors.",
    author: "Rajesh Kumar - Real Estate Expert",
    date: "2024-01-15",
    category: "Market Analysis",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    readTime: "12 min read",
    featured: true,
    tags: ["Market Trends", "Investment", "Hyderabad", "ROI"],
  },
  {
    id: 2,
    title:
      "RERA Compliance Guide 2024: Essential Documentation for Hyderabad Property Buyers",
    excerpt:
      "Complete guide to Real Estate Regulatory Authority requirements in Telangana, mandatory RERA registrations, legal protections, and documentation checklist for safe property transactions.",
    author: "Priya Sharma - Legal Advisor",
    date: "2024-01-12",
    category: "Legal & Compliance",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    readTime: "15 min read",
    featured: true,
    tags: ["RERA", "Legal", "Documentation", "Compliance"],
  },
  {
    id: 3,
    title:
      "Home Loan Interest Rates 2024: SBI vs HDFC vs ICICI Bank Comparison for Hyderabad Properties",
    excerpt:
      "Detailed comparison of home loan interest rates, processing fees, eligibility criteria, and special schemes from India's top banks for purchasing properties in Hyderabad and surrounding areas.",
    author: "Amit Patel - Financial Consultant",
    date: "2024-01-10",
    category: "Finance & Banking",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    readTime: "10 min read",
    featured: false,
    tags: ["Home Loans", "Banking", "Interest Rates", "Finance"],
  },
  {
    id: 4,
    title:
      "Best Locations in Hyderabad for Real Estate Investment: Micro-Market Analysis 2024",
    excerpt:
      "In-depth analysis of emerging and established micro-markets in Hyderabad including infrastructure development, connectivity, appreciation potential, and rental yields for informed investment decisions.",
    author: "Sunita Reddy - Market Analyst",
    date: "2024-01-08",
    category: "Location Analysis",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    readTime: "14 min read",
    featured: false,
    tags: ["Location", "Investment", "Micro-markets", "Analysis"],
  },
  {
    id: 5,
    title:
      "Vastu Shastra in Modern Home Design: Balancing Tradition with Contemporary Architecture",
    excerpt:
      "Expert guide on incorporating Vastu principles in modern home design, practical tips for plot selection, room placement, and architectural elements that enhance positive energy and well-being.",
    author: "Dr. Ramesh Gupta - Vastu Expert",
    date: "2024-01-05",
    category: "Design & Architecture",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    readTime: "11 min read",
    featured: false,
    tags: ["Vastu", "Design", "Architecture", "Traditional"],
  },
  {
    id: 6,
    title:
      "Real Estate Investment ROI Calculator: Maximizing Returns in Hyderabad Property Market",
    excerpt:
      "Comprehensive guide to calculating real estate ROI, understanding capital appreciation vs rental yields, tax implications, and strategic investment planning for long-term wealth creation in Hyderabad.",
    author: "Vikram Singh - Investment Advisor",
    date: "2024-01-03",
    category: "Investment Strategy",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    readTime: "16 min read",
    featured: false,
    tags: ["ROI", "Investment", "Calculator", "Returns"],
  },
];

const categories = [
  "All Categories",
  "Market Analysis",
  "Legal & Compliance",
  "Finance & Banking",
  "Location Analysis",
  "Design & Architecture",
  "Investment Strategy",
];

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
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

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
            Stay ahead in Hyderabad's dynamic real estate market with expert
            analysis, investment strategies, legal guidance, and market trends
            from industry professionals
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles, topics, or locations..."
              className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80 text-sm">Expert Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80 text-sm">Industry Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80 text-sm">Monthly Readers</div>
            </div>
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
                        src={post.image}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg?height=224&width=400&text=" +
                            encodeURIComponent(post.category);
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        ⭐ Featured
                      </div>
                      <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span>{post.author}</span>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform"
                          >
                            Read More <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Latest Articles */}

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
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "/placeholder.svg?height=256&width=400&text=" +
                              encodeURIComponent(post.category);
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-emerald-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </div>
                      </div>
                    </div>

                    <CardContent className="md:w-2/3 p-8">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-4 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span>{post.author}</span>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="ghost"
                            className="text-emerald-600 hover:text-emerald-700 p-0 group-hover:translate-x-1 transition-transform"
                          >
                            Read Full Article{" "}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
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
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
                Popular Tags
              </h3>
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

          {/* Newsletter Signup */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">
                Stay Updated
              </h3>
              <p className="text-white/90 mb-6 text-sm leading-relaxed">
                Get the latest Hyderabad real estate insights, market trends,
                and investment opportunities delivered to your inbox weekly.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:ring-white/50"
                />
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  Subscribe Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="block group"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "/placeholder.svg?height=64&width=64&text=Post";
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-tight">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
