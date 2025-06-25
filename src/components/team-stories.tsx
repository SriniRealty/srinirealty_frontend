import { Award, Building, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    image: "/images/founder-rajesh.png",
    story:
      "With over 20 years in real estate, Rajesh founded Srini Realty with a vision to make quality homes accessible to everyone. His journey began as a civil engineer, and his passion for creating beautiful spaces led him to establish one of Hyderabad's most trusted real estate companies.",
    icon: Building,
    color: "from-cta to-blue-700",
    achievements: [
      "20+ Years Experience",
      "50+ Projects Delivered",
      "5000+ Happy Families",
    ],
  },
  {
    name: "Priya Patel",
    role: "Head of Construction",
    image: "/images/priya-construction.png",
    story:
      "Priya brings 15 years of construction expertise to Srini Realty. As a structural engineer, she ensures every project meets the highest quality standards. Her attention to detail and commitment to sustainable building practices have earned her recognition in the industry.",
    icon: Award,
    color: "from-emerald-600 to-teal-600",
    achievements: [
      "15+ Years in Construction",
      "Zero Structural Issues",
      "Green Building Certified",
    ],
  },
  {
    name: "Amit Kumar",
    role: "Sales & Marketing Head",
    image: "/images/amit-sales.png",
    story:
      "Amit's innovative marketing strategies and customer-first approach have helped thousands find their dream homes. With an MBA in Marketing and 12 years in real estate sales, he understands what customers truly need and delivers exceptional service.",
    icon: TrendingUp,
    color: "from-purple-600 to-pink-600",
    achievements: [
      "12+ Years in Sales",
      "₹500+ Cr Sales Volume",
      "95% Customer Satisfaction",
    ],
  },
];

export default function TeamStories() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-6">
            Meet Our Leadership Team
          </h2>
          <p className="text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
            The passionate individuals behind Srini Realty who bring decades of
            experience and unwavering commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg"
            >
              <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                    />
                    <div
                      className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <member.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                    {member.name}
                  </h3>
                  <p
                    className={`text-lg font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
                  >
                    {member.role}
                  </p>
                </div>

                <p className="text-secondary leading-relaxed mb-6 text-center">
                  {member.story}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary text-center mb-4">
                    Key Achievements
                  </h4>
                  {member.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-cta to-purple-500 rounded-full mr-3"></div>
                      <span className="text-secondary text-sm">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
