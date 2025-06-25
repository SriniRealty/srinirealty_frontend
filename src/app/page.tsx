"use client";

import HeroCarousel from "@/components/hero-carousel";
import WhyChooseUs from "@/components/why-choose-us";
import Testimonials from "@/components/testimonials";
import CoreValues from "@/components/core-values";
import { Button } from "@/components/ui/button";
import { Award, Building } from "lucide-react";
import BlogPreview from "@/components/blog-preview";
import { useState } from "react";
import EnquiryForm from "@/components/enquiry-form";
import LocationDialog from "@/components/location-dialog";

export default function HomePage() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <div className="pt-16">
      <HeroCarousel />

      {/* GROW TOGETHER Section - Redesigned */}
      <section className="relative py-24 bg-white">
        {/* Professional Header with Real Estate Imagery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Professional Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
                  <span className="text-blue-600 font-semibold text-sm">
                    15+ Years of Excellence
                  </span>
                </div>

                <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Growing Together
                  <span className="block text-blue-600">With Families</span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Since 2008, we've been committed to building more than just
                  properties – we build communities, relationships, and dreams.
                  Our journey of growth is intertwined with the families we
                  serve.
                </p>
              </div>

              {/* Professional Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹50+ Cr
                  </div>
                  <div className="text-sm text-gray-600">
                    Properties Delivered
                  </div>
                </div>
                <div className="border-l-4 border-emerald-600 pl-4">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">
                    Customer Satisfaction
                  </div>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <div className="text-2xl font-bold text-gray-900">5000+</div>
                  <div className="text-sm text-gray-600">Happy Families</div>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Customer Support</div>
                </div>
              </div>

              {/* Professional CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold"
                  onClick={() => {
                    setIsLocationOpen(true);
                  }}
                >
                  Schedule Consultation
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 font-semibold"
                >
                  Download Brochure
                </Button>
              </div>
            </div>

            {/* Right Side - Real Estate Visual */}
            <div className="relative">
              {/* Main Property Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/villa_1.avif"
                  alt="Modern residential complex in Hyderabad"
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "/placeholder.svg?height=400&width=600&text=Modern+Residential+Complex";
                  }}
                />

                {/* Overlay Info Card */}
                <div className="absolute bottom-16 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        Premium Residences
                      </div>
                      <div className="text-sm text-gray-600">
                        Gachibowli, Hyderabad
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">
                        ₹2Cr - 2.2Cr
                      </div>
                      <div className="text-xs text-gray-500">
                        Starting Price
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Cards */}
              <div className="absolute -top-2 -right-2 bg-white rounded-xl shadow-lg p-4 border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      RERA Certified
                    </div>
                    <div className="text-xs text-gray-600">All Projects</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-2 bg-white rounded-xl shadow-lg p-4 border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      50+ Projects
                    </div>
                    <div className="text-xs text-gray-600">
                      Successfully Delivered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <CoreValues />

      {/* Replace the duplicate form with EnquiryForm component */}
      <EnquiryForm
        title="Ready to Find Your Dream Property?"
        subtitle="Quick Enquiry Form"
        description="Get in touch with our property experts and let us help you find the perfect home that matches your needs and budget in Hyderabad. Let's grow together towards your property goals."
      />

      <WhyChooseUs />
      <Testimonials />
      <BlogPreview />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-6">
            Start Your Property Journey Today - Let's Grow Together
          </h2>
          <p className="text-gray-800 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have found their perfect
            property with Srini Realty in Hyderabad. Together, we'll build your
            future.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => setIsLocationOpen(true)}
              className="bg-gradient-to-r from-cta to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Schedule Site Visit
            </Button>
            <Button
              variant="outline"
              className="border-2 border-cta text-cta hover:bg-cta hover:text-white px-10 py-4 text-lg font-semibold rounded-xl"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
      <LocationDialog
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
}
