"use client";
import { useState } from "react";
import { Award, Users, Building, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LocationDialog from "@/components/location-dialog";
import MiniContact from "@/components/mini-contact";

const stats = [
  {
    icon: Building,
    number: "50+",
    label: "Projects Completed",
    description: "Successful developments across Hyderabad",
  },
  {
    icon: Users,
    number: "5000+",
    label: "Happy Families",
    description: "Satisfied homeowners and investors",
  },
  {
    icon: Calendar,
    number: "14+",
    label: "Years Experience",
    description: "Trusted expertise since 2010",
  },
  {
    icon: Award,
    number: "25+",
    label: "Awards Won",
    description: "Industry recognition and excellence",
  },
];

const milestones = [
  {
    year: "2010",
    title: "Foundation",
    description:
      "Srini Realty Private Limited established with a vision to transform Hyderabad's real estate landscape",
  },
  {
    year: "2020",
    title: "Big Project Apartment Group",
    description:
      "Launched our flagship apartment complex project, setting new standards for modern living in Hyderabad",
  },
  {
    year: "2022",
    title: "Group Houses",
    description:
      "Expanded into premium group housing projects, creating integrated residential communities",
  },
  {
    year: "2024",
    title: "Luxury Villas",
    description:
      "Introduced luxury villa projects with world-class amenities and sustainable design features",
  },
];

export default function AboutPage() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  return (
    <div className="pt-16">
      {/* Hero Section with GROW TOGETHER - Redesigned */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
            About Srini Realty
          </h1>

          {/* Stylish GROW TOGETHER Design */}
          <div className="relative inline-block mb-8">
            <div className="text-7xl md:text-9xl font-black text-white/10 absolute inset-0 transform translate-x-2 translate-y-2">
              GROW TOGETHER
            </div>
            <div className="relative">
              <span className="font-heading text-5xl md:text-7xl font-black text-white tracking-wider">
                GROW
              </span>
              <br />
              <span className="font-heading text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent tracking-wider">
                TOGETHER
              </span>
            </div>
          </div>

          <p className="text-white/90 text-xl max-w-4xl mx-auto leading-relaxed">
            Building dreams, creating communities, and delivering excellence in
            real estate for over 14 years in Hyderabad. We believe in growing
            together with our customers, partners, and communities to create
            lasting value and prosperity.
          </p>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-4">
              Growing Together Since 2010
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Our journey of growth and success with our valued customers across
              Hyderabad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="group border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cta to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-700">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-8">
                Our Story of Growing Together
              </h2>
              <div className="space-y-6 text-gray-800 leading-relaxed">
                <p className="text-lg">
                  Founded in 2010, Srini Realty Private Limited began with a
                  vision to create exceptional living spaces that combine
                  quality, comfort, and affordability. What started as a family
                  business has grown into one of Hyderabad's trusted real estate
                  developers.
                </p>
                <p className="text-lg">
                  We have successfully delivered 50+ projects across residential
                  villas, apartments, group houses, and commercial spaces. Our
                  commitment to quality has earned the trust of over 5,000
                  families who have grown with us.
                </p>
                <p className="text-lg">
                  Today, we continue to innovate in the real estate industry,
                  keeping our customers' dreams at the heart of everything we
                  do. Our "Growing Together" philosophy means your success is
                  our success.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cta/20 to-purple-600/20 rounded-3xl transform rotate-3"></div>
              <img
                src="/images/Ih_3.avif"
                alt="Srini Realty Office - Growing Together"
                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - New Addition */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-4">
              Our Growth Journey
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Key milestones in our journey of growing together with Hyderabad's
              real estate market
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cta to-purple-600 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-700">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-cta to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with GROW TOGETHER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-4">
              Our Mission & Vision - Growing Together
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Guided by our core principle of growing together with our
              stakeholders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cta to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold bg-gradient-to-r from-cta to-blue-600 bg-clip-text text-transparent mb-6">
                  Our Mission
                </h3>
                <p className="text-gray-800 leading-relaxed text-lg">
                  To create exceptional real estate experiences by delivering
                  quality homes and commercial spaces that exceed customer
                  expectations while maintaining the highest standards of
                  construction and service. We grow together with our customers,
                  ensuring their dreams become reality through trust,
                  innovation, and harmony.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                  Our Vision
                </h3>
                <p className="text-gray-800 leading-relaxed text-lg">
                  To be the most trusted and preferred real estate developer in
                  South India, known for innovation, quality, and
                  customer-centric approach in creating sustainable communities.
                  We envision a future where we grow together with our
                  stakeholders to build prosperous, harmonious neighborhoods.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <MiniContact />
    </div>
  );
}
