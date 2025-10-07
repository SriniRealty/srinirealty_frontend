"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Tag, Eye, ThumbsUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const blogPost = {
  id: 1,
  title: "Hyderabad Real Estate Market Trends 2024: Complete Investment Guide for Property Buyers",
  content: `
    <p>Hyderabad's real estate market continues to show remarkable resilience and growth potential in 2024...</p>
    <h2>Current Market Overview</h2>
    <p>The Hyderabad real estate market has witnessed a steady appreciation...</p>
  `,
  author: "Rajesh Kumar - Real Estate Expert",
  authorBio: "Rajesh Kumar is a certified real estate analyst with over 15 years of experience...",
  authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  date: "2024-01-15",
  category: "Market Analysis",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  readTime: "12 min read",
  tags: ["Market Trends", "Investment", "Hyderabad", "ROI", "Real Estate", "Property"],
  views: 2847,
  likes: 156,
  comments: 23,
}

export default function BlogPostPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-white py-4 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-800">Market Analysis</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-blue-600 text-white mb-4">{blogPost.category}</Badge>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">{blogPost.title}</h1>
            </div>
          </div>

          <div className="p-8 border-b">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <img
                    src={blogPost.authorImage || "/placeholder.svg"}
                    alt={blogPost.author}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{blogPost.author}</div>
                    <div className="text-sm text-gray-600">Real Estate Expert</div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(blogPost.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {blogPost.readTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {blogPost.views.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {blogPost.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {blogPost.comments}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center mb-4">
                <Tag className="h-5 w-5 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
