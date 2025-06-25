"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EnquiryForm from "@/components/enquiry-form";
import LocationDialog from "@/components/location-dialog";

export default function ContactPage() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <div className="pt-16">
      {/* Hero Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-cta via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-32 w-5 h-5 bg-white rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-40 right-10 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-12 w-12 text-white mr-4" />
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Contact Us
            </h1>
          </div>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            Get in touch with our real estate experts in Hyderabad. We're here
            to help you find your perfect property and grow together towards
            your real estate goals.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80 text-sm">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2 Hrs</div>
              <div className="text-white/80 text-sm">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80 text-sm">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-4">
              Get In Touch With Us
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Multiple ways to reach our expert team for all your real estate
              needs in Hyderabad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white group">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-gray-800 mb-4 text-lg">
                  Call Us
                </h3>
                <p className="text-gray-600 mb-2">+91 74 7899 7899</p>
                <Button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white group">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-gray-800 mb-4 text-lg">
                  Email Us
                </h3>
                <p className="text-gray-600 mb-2">info@srinirealty.in</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white group">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-gray-800 mb-4 text-lg">
                  Visit Us
                </h3>
                <p className="text-gray-600 mb-2">
                  PE/14, 8-7-91/16, Phase 4, Hasthinapuram South, Hastinapuram,
                  Hyderabad, Telangana 500070
                </p>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white group">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-gray-800 mb-4 text-lg">
                  Office Hours
                </h3>
                <p className="text-gray-600 mb-2">
                  Mon - Sun: 9:00 AM - 7:00 PM
                </p>
                <Button
                  onClick={() => setIsLocationOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Visit
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Real Estate Image - Full Size */}
            <Card className="border-0 shadow-2xl bg-white overflow-hidden">
              <div className="h-screen">
                <img
                  src="/images/contact_image.avif"
                  alt="Luxury Real Estate Properties in Hyderabad - Srini Realty"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "/placeholder.svg?height=800&width=800&text=Real+Estate+Properties";
                  }}
                />
              </div>
            </Card>

            {/* Interactive Map & Contact Details */}
            <Card className="border-0 shadow-2xl bg-white">
              <CardContent className="p-0">
                {/* Google Maps Embed */}
                <div className="w-full h-72 rounded-t-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6168939507!2d78.38447!3d17.4239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzI2LjAiTiA3OMKwMjMnMDQuMSJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Srini Realty Office Location"
                  />
                </div>

                {/* Contact Details Below Map */}
                <div className="p-8">
                  <h2 className="font-heading text-2xl font-bold bg-gradient-to-r from-cta to-purple-600 bg-clip-text text-transparent mb-6 text-center">
                    Visit Our Office
                  </h2>

                  {/* Address */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cta to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-lg mb-2">
                          Our Address
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          PE/14, 8-7-91/16, Phase 4, Hasthinapuram South,
                          Hastinapuram, Hyderabad, Telangana 500070
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Open in Maps Button */}
                  <Button
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=PE%2F14%2C+8-7-91%2F16%2C+Phase+4%2C+Hasthinapuram+South%2C+Hastinapuram%2C+Hyderabad%2C+Telangana+500070",
                        "_blank"
                      )
                    }
                    className="w-full bg-gradient-to-r from-cta to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Open in Google Maps & Get Directions
                  </Button>

                  {/* Contact Numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Call */}
                    <Button
                      onClick={() => window.open("tel:+917478997899", "_self")}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      +91 74 7899 7899
                    </Button>

                    {/* WhatsApp */}
                    <Button
                      onClick={() =>
                        window.open(
                          "https://wa.me/917478997899?text=Hi, I would like to visit your office and discuss properties",
                          "_blank"
                        )
                      }
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      +91 74 7899 7899
                    </Button>
                  </div>

                  {/* Office Hours */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-orange-600" />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Office Hours
                        </h4>
                        <p className="text-gray-700 text-sm">
                          Monday - Sunday: 9:00 AM - 7:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use the EnquiryForm component */}
      <EnquiryForm
        title="Get Expert Property Consultation"
        subtitle="Contact Us Enquiry Form"
        description="Connect with our real estate experts for personalized property recommendations and professional guidance. We're here to help you find your perfect property in Hyderabad."
      />

      <LocationDialog
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
}
