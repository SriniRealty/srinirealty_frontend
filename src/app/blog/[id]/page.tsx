"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Tag,
  Eye,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock blog post data - in real app, this would come from API/database
const blogPost = {
  id: 1,
  title:
    "Hyderabad Real Estate Market Trends 2024: Complete Investment Guide for Property Buyers",
  content: `
    <p>Hyderabad's real estate market continues to show remarkable resilience and growth potential in 2024, making it one of India's most attractive property investment destinations. This comprehensive analysis covers the latest market trends, emerging micro-markets, and strategic investment opportunities across the city.</p>

    <h2>Current Market Overview</h2>
    <p>The Hyderabad real estate market has witnessed a steady appreciation of 8-12% year-over-year across prime locations including HITEC City, Gachibowli, and Jubilee Hills. The city's robust IT sector growth, infrastructure development, and government initiatives have created a favorable environment for both residential and commercial property investments.</p>

    <h3>Key Growth Drivers</h3>
    <ul>
      <li><strong>IT Sector Expansion:</strong> Major tech companies continue to expand their operations in Hyderabad, driving demand for both residential and commercial properties.</li>
      <li><strong>Infrastructure Development:</strong> The Outer Ring Road (ORR), Metro Rail expansion, and upcoming airport connectivity projects are enhancing property values.</li>
      <li><strong>Government Initiatives:</strong> Telangana government's pro-business policies and urban development projects are attracting investments.</li>
      <li><strong>Affordable Housing:</strong> PMAY schemes and developer initiatives are making homeownership accessible to middle-income families.</li>
    </ul>

    <h2>Prime Investment Locations</h2>
    
    <h3>HITEC City & Madhapur</h3>
    <p>The established IT hub continues to command premium prices with average property rates ranging from ₹8,000-15,000 per sq ft for apartments and ₹12,000-25,000 per sq ft for villas. The area offers excellent rental yields of 3-4% annually.</p>

    <h3>Gachibowli & Kondapur</h3>
    <p>These emerging IT corridors offer better value propositions with property rates between ₹6,000-12,000 per sq ft. The upcoming Metro connectivity and commercial developments make these areas attractive for long-term investments.</p>

    <h3>Kokapet & Narsingi</h3>
    <p>The new Financial District has created significant appreciation potential in these areas. Property rates have increased by 15-20% in the past year, with future growth expected due to ongoing infrastructure projects.</p>

    <h2>Investment Strategies for 2024</h2>
    
    <h3>Buy and Hold Strategy</h3>
    <p>Focus on established areas with proven track records. HITEC City, Banjara Hills, and Jubilee Hills offer stable appreciation and rental income potential.</p>

    <h3>Emerging Area Investment</h3>
    <p>Consider upcoming locations like Tellapur, Kollur, and areas along the ORR for higher appreciation potential over 5-7 years.</p>

    <h3>Commercial Real Estate</h3>
    <p>Office spaces in IT corridors and retail properties in high-footfall areas offer attractive rental yields of 6-8% annually.</p>

    <h2>Market Predictions for 2024-2025</h2>
    <p>Based on current trends and development pipeline, we expect:</p>
    <ul>
      <li>Overall market appreciation of 10-15% in prime locations</li>
      <li>Increased demand for 2-3 BHK apartments in IT corridors</li>
      <li>Growing interest in villa projects in peripheral areas</li>
      <li>Commercial real estate to outperform residential in terms of returns</li>
    </ul>

    <h2>Key Considerations for Investors</h2>
    
    <h3>Legal Due Diligence</h3>
    <p>Ensure RERA registration, clear titles, and proper approvals before investing. Telangana RERA has made property transactions more transparent and secure.</p>

    <h3>Financing Options</h3>
    <p>Home loan interest rates are currently favorable at 8.5-9.5%. Consider pre-approved loans for better negotiation power.</p>

    <h3>Exit Strategy</h3>
    <p>Plan your investment horizon - short-term (2-3 years) for emerging areas, long-term (5-10 years) for established locations.</p>

    <h2>Conclusion</h2>
    <p>Hyderabad's real estate market offers diverse opportunities for investors across different budget ranges and risk appetites. The city's strong fundamentals, continued IT growth, and infrastructure development make it an attractive destination for property investments in 2024 and beyond.</p>

    <p>For personalized investment advice and property recommendations, consult with experienced real estate professionals who understand local market dynamics and can guide you toward the best opportunities based on your specific requirements and budget.</p>
  `,
  author: "Rajesh Kumar - Real Estate Expert",
  authorBio:
    "Rajesh Kumar is a certified real estate analyst with over 15 years of experience in the Hyderabad property market. He specializes in investment advisory and market research.",
  authorImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  date: "2024-01-15",
  category: "Market Analysis",
  image:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  readTime: "12 min read",
  tags: [
    "Market Trends",
    "Investment",
    "Hyderabad",
    "ROI",
    "Real Estate",
    "Property",
  ],
  views: 2847,
  likes: 156,
  comments: 23,
};

const relatedPosts = [
  {
    id: 2,
    title:
      "RERA Compliance Guide 2024: Essential Documentation for Hyderabad Property Buyers",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop",
    date: "2024-01-12",
    readTime: "15 min read",
  },
  {
    id: 3,
    title:
      "Home Loan Interest Rates 2024: SBI vs HDFC vs ICICI Bank Comparison",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
    date: "2024-01-10",
    readTime: "10 min read",
  },
  {
    id: 4,
    title:
      "Best Locations in Hyderabad for Real Estate Investment: Micro-Market Analysis",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
    date: "2024-01-08",
    readTime: "14 min read",
  },
];

export default function BlogPostPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-800">Market Analysis</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "/placeholder.svg?height=384&width=800&text=Blog+Post+Image";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-blue-600 text-white mb-4">
                {blogPost.category}
              </Badge>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                {blogPost.title}
              </h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-8 border-b">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <img
                    src={blogPost.authorImage || "/placeholder.svg"}
                    alt={blogPost.author}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "/placeholder.svg?height=48&width=48&text=Author";
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {blogPost.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      Real Estate Expert
                    </div>
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

          {/* Article Content */}
          <div className="p-8">
            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center mb-4">
                <Tag className="h-5 w-5 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <img
                src={blogPost.authorImage || "/placeholder.svg"}
                alt={blogPost.author}
                className="w-20 h-20 rounded-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "/placeholder.svg?height=80&width=80&text=Author";
                }}
              />
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                  About the Author
                </h3>
                <h4 className="font-medium text-blue-600 mb-3">
                  {blogPost.author}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {blogPost.authorBio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                  <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "/placeholder.svg?height=160&width=300&text=Related+Post";
                      }}
                    />
                    <div className="p-6">
                      <h4 className="font-heading font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-tight">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
