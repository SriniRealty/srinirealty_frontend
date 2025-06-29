import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const recentBlogPosts = [
  {
    id: 1,
    title:
      "Hyderabad Real Estate Market Trends 2024: Complete Investment Guide for Property Buyers",
    excerpt:
      "Comprehensive analysis of Hyderabad property market including HITEC City, Gachibowli, and Jubilee Hills price trends, emerging micro-markets, and ROI projections.",
    author: "Rajesh Kumar - Real Estate Expert",
    date: "2024-01-15",
    category: "Market Analysis",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    readTime: "12 min read",
  },
  {
    id: 2,
    title:
      "RERA Compliance Guide 2024: Essential Documentation for Hyderabad Property Buyers",
    excerpt:
      "Complete guide to Real Estate Regulatory Authority requirements in Telangana, mandatory RERA registrations, and legal protections for property transactions.",
    author: "Priya Sharma - Legal Advisor",
    date: "2024-01-12",
    category: "Legal & Compliance",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    readTime: "15 min read",
  },
  {
    id: 3,
    title:
      "Home Loan Interest Rates 2024: SBI vs HDFC vs ICICI Bank Comparison for Hyderabad Properties",
    excerpt:
      "Detailed comparison of home loan interest rates, processing fees, and eligibility criteria from India's top banks for purchasing properties in Hyderabad.",
    author: "Amit Patel - Financial Consultant",
    date: "2024-01-10",
    category: "Finance & Banking",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    readTime: "10 min read",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Expert Hyderabad Real Estate Insights
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Stay informed with data-driven market analysis, investment
            strategies, and practical guides from Hyderabad real estate industry
            experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentBlogPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "/placeholder.svg?height=192&width=400&text=" +
                      encodeURIComponent(post.category);
                  }}
                />
                <div className="absolute top-4 left-4 bg-cta/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-sm text-secondary mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-primary mb-3 group-hover:text-cta transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-secondary mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-secondary">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button
                      variant="ghost"
                      className="text-cta hover:text-blue-700 p-0 group-hover:translate-x-1 transition-transform"
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button className="bg-cta hover:bg-cta-hover text-white px-8 py-3 text-xs md:text-lg">
              View All Hyderabad Real Estate Articles
              <ArrowRight className="h-3 w-3 ml-1 md:h-5 md:w-5 md:ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
