"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Home,
  MapPin,
  IndianRupee,
  Loader2,
  User,
  Phone,
  ArrowUp,
} from "lucide-react";
import { toast } from "sonner";
import { hyderabadAreas } from "@/data/hyderabad-areas";
import { submitPropertyBuying } from "@/app/actions/submit-property-buying";

export default function PropertyBuyingPage() {
  const [formData, setFormData] = useState({
    propertyType: "",
    size: "",
    location: "",
    budget: "",
    name: "",
    phone: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = [
    "Open Plot",
    "Independent House",
    "Apartment Flat",
    "Villas",
    "Farm Land",
    "Office Space",
    "Any Type",
  ];

  const getSizeOptions = () => {
    if (
      ["Villas", "Apartment Flat", "Office Space"].includes(
        formData.propertyType
      )
    ) {
      return [
        "500-1000 Sqft",
        "1000-1500 Sqft",
        "1500-2000 Sqft",
        "2000-3000 Sqft",
        "3000-5000 Sqft",
        "5000+ Sqft",
      ];
    } else if (
      ["Open Plot", "Independent House"].includes(formData.propertyType)
    ) {
      return [
        "100-200 Sq Yards",
        "200-300 Sq Yards",
        "300-500 Sq Yards",
        "500-1000 Sq Yards",
        "1000+ Sq Yards",
      ];
    } else if (formData.propertyType === "Farm Land") {
      return [
        "1-2 Acres",
        "2-5 Acres",
        "5-10 Acres",
        "10-20 Acres",
        "20+ Acres",
      ];
    }
    return ["Any Size"];
  };

  const budgetOptions = [
    "Below ₹20 Lakhs",
    "₹20–50 Lakhs",
    "₹50 L – ₹1 Cr",
    "₹1–2 Cr",
    "₹2–5 Cr",
    "₹5 Cr+",
  ];

  const isFormValid = () => {
    return (
      formData.propertyType &&
      formData.budget &&
      formData.name &&
      formData.phone
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill all required fields marked with *");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const submitFormData = new FormData();
      submitFormData.append("propertyType", formData.propertyType);
      submitFormData.append("size", formData.size);
      submitFormData.append("location", formData.location);
      submitFormData.append("budget", formData.budget);
      submitFormData.append("name", formData.name);
      submitFormData.append("phone", formData.phone);
      submitFormData.append("description", formData.description);

      const result = await submitPropertyBuying(submitFormData);

      if (result.success) {
        toast.success(result.message);
        // Reset form completely
        setFormData({
          propertyType: "",
          size: "",
          location: "",
          budget: "",
          name: "",
          phone: "",
          description: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-4 md:py-8">
      <div className="max-w-3xl mx-auto px-4 mt-14 md:mt-12">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center mb-2 md:mb-4">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 md:p-4 rounded-full">
              <Search className="h-8 md:h-12 w-8 md:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            Tell us what you're looking for and we'll help you find the perfect
            property
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-lg md:text-2xl flex items-center">
              <Home className="mr-2 md:mr-3 h-6 md:h-8 w-6 md:w-8" />
              Property Buying Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative z-20">
                  <Label
                    htmlFor="propertyType"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <Home className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Property Type *
                  </Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        propertyType: value,
                        size: "",
                      })
                    }
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-green-400 focus:border-green-500">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                      {propertyTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="hover:bg-green-50 focus:bg-green-100 text-gray-800"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative z-10">
                  <Label
                    htmlFor="size"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <ArrowUp className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Size Preference
                  </Label>
                  <Select
                    value={formData.size}
                    onValueChange={(value) =>
                      setFormData({ ...formData, size: value })
                    }
                    disabled={!formData.propertyType}
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-green-400 focus:border-green-500 disabled:opacity-50">
                      <SelectValue
                        placeholder={
                          formData.propertyType
                            ? "Select size range"
                            : "Select property type first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                      {getSizeOptions().map((size) => (
                        <SelectItem
                          key={size}
                          value={size}
                          className="hover:bg-green-50 focus:bg-green-100 text-gray-800"
                        >
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative z-10">
                  <Label
                    htmlFor="location"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <MapPin className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Preferred Location
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      setFormData({ ...formData, location: value })
                    }
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-green-400 focus:border-green-500">
                      <SelectValue placeholder="Select preferred area" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg max-h-60 overflow-y-auto">
                      {hyderabadAreas.map((location) => (
                        <SelectItem
                          key={location}
                          value={location}
                          className="hover:bg-green-50 focus:bg-green-100 text-gray-800"
                        >
                          {location}
                        </SelectItem>
                      ))}
                      <SelectItem
                        value="Any Location"
                        className="hover:bg-green-50 focus:bg-green-100 text-gray-800"
                      >
                        Any Location
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative z-10">
                  <Label
                    htmlFor="budget"
                    className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                  >
                    <IndianRupee className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                    Budget Range *
                  </Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      setFormData({ ...formData, budget: value })
                    }
                  >
                    <SelectTrigger className="w-full h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-green-400 focus:border-green-500">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-white border-2 border-gray-200 shadow-lg">
                      {budgetOptions.map((budget) => (
                        <SelectItem
                          key={budget}
                          value={budget}
                          className="hover:bg-green-50 focus:bg-green-100 text-gray-800"
                        >
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4 md:pt-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                    >
                      <User className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-green-400 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-base md:text-lg font-semibold text-gray-700 flex items-center mb-2 w-full"
                    >
                      <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-10 md:h-12 text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-green-400 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-base md:text-lg font-semibold text-gray-700 block mb-2 w-full"
                >
                  Additional Requirements (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us more about what you're looking for... (e.g., number of bedrooms, parking, amenities, etc.)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[100px] md:min-h-[120px] text-sm md:text-lg bg-white border-2 border-gray-300 hover:border-green-400 focus:border-green-500"
                />
              </div>

              <div className="text-center pt-4 md:pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Find My Property"
                  )}
                </Button>
                {!isFormValid() && (
                  <p className="text-red-500 mt-3 text-xs md:text-sm">
                    Please fill all required fields marked with *
                  </p>
                )}
                <p className="text-gray-600 mt-2 md:mt-4 text-xs md:text-sm">
                  We'll contact you within 24 hours with matching properties
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
