"use client"

import type React from "react"
import { useState } from "react"
import { Phone, User, Home, MessageSquare, Send, Mail, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitQuickEnquiry } from "@/app/actions/submit-quick-enquiry"

interface EnquiryFormProps {
  isOpen?: boolean
  onClose?: () => void
  propertyTitle?: string
  title?: string
  subtitle?: string
  description?: string
  formType?: "quick_enquiry" | "contact_us"
}

const propertyTypes = [
  "Villas",
  "Apartments",
  "Independent Houses",
  "Open Flats",
  "Commercial Spaces",
  "Farm Lands",
  "Plots/Sites",
]

const priceRanges = [
  "20L - 50L",
  "50L - 1Cr",
  "1Cr - 2Cr",
  "2Cr - 3Cr",
  "3Cr - 5Cr",
  "5Cr - 7Cr",
  "7Cr - 10Cr",
  "Above 10Cr",
]

export default function EnquiryForm({
  isOpen = true,
  onClose,
  propertyTitle,
  title = "Get Expert Property Consultation",
  subtitle = "Property Enquiry Form",
  description = "Get personalized property recommendations from our experts",
  formType = "quick_enquiry",
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: propertyTitle || "",
    priceRange: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Create FormData object
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("phone", formData.phone)
      formDataObj.append("email", formData.email)
      formDataObj.append("propertyType", formData.propertyType)
      formDataObj.append("priceRange", formData.priceRange)
      formDataObj.append("message", formData.message)
      formDataObj.append("formType", formType)

      // Submit to server action
      const result = await submitQuickEnquiry(formDataObj)

      if (result.success) {
        setSubmitStatus("success")
        alert(`✅ ${result.message}`)

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          propertyType: "",
          priceRange: "",
          message: "",
        })

        // Close modal after delay if callback provided
        if (onClose) {
          setTimeout(() => onClose(), 2000)
        }
      } else {
        setSubmitStatus("error")
        alert(`⚠️ ${result.message}\n\nFor immediate assistance, call: +91 74 7899 7899`)
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error)
      setSubmitStatus("error")
      alert("❌ Failed to send enquiry. Please try again or call us directly at +91 74 7899 7899")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Success Message Component
  const SuccessMessage = () => (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-green-600 mb-2">Enquiry Sent Successfully!</h3>
      <p className="text-gray-700 mb-4">📧 Your enquiry has been sent to our team</p>
      <p className="text-gray-600 mb-6">Our property expert will contact you within 2 hours.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="tel:+917478997899"
          className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <Phone className="h-5 w-5 mr-2" />
          Call Now: +91 74 7899 7899
        </a>
        <a
          href="https://wa.me/917478997899?text=Hi, I just submitted an enquiry on your website"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          WhatsApp Chat
        </a>
      </div>
    </div>
  )

  return (
    <section className="py-20 bg-gradient-to-br from-cta via-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-white/90 text-xl mb-8 leading-relaxed">{description}</p>
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
                <MapPin className="h-6 w-6 mr-4 text-highlight flex-shrink-0" />
                <span className="text-lg">
                  PE/14, 8-7-91/16, Phase 4, Hasthinapuram South, Hastinapuram, Hyderabad, Telangana 500070
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
              {submitStatus === "success" ? (
                <SuccessMessage />
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name - REQUIRED */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
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

                    {/* Phone - REQUIRED */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
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
                          pattern="[6-9][0-9]{9}"
                          className="pl-10 h-12 border-2 border-gray-300 focus:border-cta"
                          placeholder="+91 98765 43210"
                          title="Please enter a valid 10-digit Indian phone number"
                        />
                      </div>
                    </div>

                    {/* Email - OPTIONAL */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                        Email Address <span className="text-gray-500 text-xs">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 h-12 border-2 border-gray-300 focus:border-cta"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Property Type - OPTIONAL */}
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-800 mb-2">
                        Type of Property <span className="text-gray-500 text-xs">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                        >
                          <SelectTrigger className="w-full h-12 text-base border-2 border-gray-300 focus:border-cta rounded-lg bg-white">
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

                    {/* Budget Range - OPTIONAL */}
                    <div>
                      <label htmlFor="priceRange" className="block text-sm font-semibold text-gray-800 mb-2">
                        Budget Range <span className="text-gray-500 text-xs">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Select
                          value={formData.priceRange}
                          onValueChange={(value) => setFormData({ ...formData, priceRange: value })}
                        >
                          <SelectTrigger className="w-full h-12 text-base border-2 border-gray-300 focus:border-cta rounded-lg bg-white">
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

                    {/* Message - OPTIONAL */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                        Additional Requirements <span className="text-gray-500 text-xs">(Optional)</span>
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
                      className="w-full bg-gradient-to-r from-cta to-blue-700 hover:from-blue-700 hover:to-cta text-sm md:text-lg font-semibold text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending Enquiry..." : "Send Enquiry & Get Expert Consultation"}
                    </Button>
                  </form>

                  {/* Contact Info */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-3">Need immediate assistance?</p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="tel:+917478997899"
                          className="flex items-center justify-center text-cta hover:text-blue-700 font-medium transition-colors text-sm"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </a>
                        <a
                          href="https://wa.me/917478997899?text=Hi, I am interested in your properties"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium transition-colors text-sm"
                        >
                          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
