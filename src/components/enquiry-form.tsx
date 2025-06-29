"use client";

import type React from "react";

import { useState } from "react";
import {
  Phone,
  User,
  Home,
  IndianRupee,
  MessageSquare,
  Send,
  X,
  Mail,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendEnquiry } from "@/app/actions/send-enquiry";

interface EnquiryFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  propertyTitle?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

const propertyTypes = [
  "Villas",
  "Apartments",
  "Independent Houses",
  "Open Flats",
  "Commercial Spaces",
  "Farm Lands",
  "Plots/Sites",
];

const priceRanges = [
  "20L - 50L",
  "50L - 1Cr",
  "1Cr - 2Cr",
  "2Cr - 3Cr",
  "3Cr - 5Cr",
  "5Cr - 7Cr",
  "7Cr - 10Cr",
  "Above 10Cr",
];

export default function EnquiryForm({
  isOpen = true,
  onClose,
  propertyTitle,
  title = "Get Expert Property Consultation",
  subtitle = "Property Enquiry Form",
  description = "Get personalized property recommendations from our experts",
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: propertyTitle || "",
    priceRange: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await sendEnquiry(formData);
      if (result.success) {
        setSubmitStatus("success");
        alert(`${result.message}`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          propertyType: "",
          priceRange: "",
          message: "",
        });
        if (onClose) setTimeout(() => onClose(), 2000);
      } else {
        setSubmitStatus("error");
        if (
          result.mailtoLink &&
          confirm("Service is down. Open email client?")
        ) {
          window.location.href = result.mailtoLink;
        }
        alert(`${result.message}\nCall: +91 74 7899 7899`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          propertyType: "",
          priceRange: "",
          message: "",
        });
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setSubmitStatus("error");
      alert("Failed to send enquiry. Please call +91 74 7899 7899");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectBaseClasses =
    "w-full pl-12 pr-4 h-12 text-lg border-2 border-gray-300 focus:border-cta rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cta/20";

  return (
    <section className="py-20 bg-gradient-to-br from-cta via-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-white/90 text-xl mb-8 leading-relaxed">
              {description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 mr-4 text-highlight" />
                <span className="text-lg">+91 74 7899 7899</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 mr-4 text-highlight" />
                <span className="text-lg">info@srinirealty.in</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-12 w-12 mr-4 text-highlight" />
                <span className="text-lg">
                  PE/14, 8-7-91/16, Phase 4, Hasthinapuram South,Hastinapuram,
                  Hyderabad, Telangana 500070
                </span>
              </div>
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-cta to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center">
                {submitStatus === "success" ? "✅ Success!" : subtitle}
              </CardTitle>
              <p className="text-center text-white/90 text-sm">
                {submitStatus === "success"
                  ? "Your enquiry has been sent successfully"
                  : "Get personalized property recommendations"}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12 border-2 border-gray-300 focus:border-cta"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12 border-2 border-gray-300 focus:border-cta"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="pl-10 h-12 border-2 border-gray-300 focus:border-cta"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="propertyType"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Type of Property *
                  </label>
                  <div className="relative">
                    <div>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, propertyType: value })
                        }
                      >
                        <SelectTrigger className="w-full h-12 text-base sm:text-sm border-2 border-gray-300 focus:border-cta rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cta/20">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black border border-gray-300 shadow-lg rounded-md">
                          {propertyTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer hover:bg-gray-100 rounded-md"
                            >
                              <Home className="h-4 w-4 text-gray-500" />
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="priceRange"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Budget Range *
                  </label>
                  <div className="relative">
                    <div>
                      <Select
                        value={formData.priceRange}
                        onValueChange={(value) =>
                          setFormData({ ...formData, priceRange: value })
                        }
                      >
                        <SelectTrigger className="w-full h-12 text-base sm:text-sm border-2 border-gray-300 focus:border-cta rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cta/20">
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-black border border-gray-300 shadow-lg rounded-md">
                          {priceRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              ₹{range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Additional Requirements (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="pl-10 pt-3 border-2 border-gray-300 focus:border-cta resize-none"
                      placeholder="Tell us about your specific requirements, preferred location, amenities, etc..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cta to-blue-700 hover:from-blue-700 hover:to-cta text-xs sm:text-sm md:text-lg font-semibold text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-3 w-3 mr-1 sm:h-5 sm:w-5 sm:mr-2" />
                  {isSubmitting
                    ? "Sending Enquiry..."
                    : "Send Enquiry & Get Expert Consultation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
