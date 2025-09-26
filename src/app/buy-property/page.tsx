"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, Phone, MessageCircle, Calendar, Filter, X, AlertCircle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Property {
  id: string
  property_type: string
  size: string
  facing: string
  location: string
  price_range?: string
  owner_name?: string
  created_at: string
}

// Property type to image mapping using your exact image files
const getPropertyImage = (propertyType: string, index: number) => {
  const typeImages: { [key: string]: string[] } = {
    Villa: ["/images/villa_1.avif", "/images/villa_2.avif", "/images/villa_3.avif"],
    "Independent House": ["/images/Ih_1.avif", "/images/Ih_2.avif", "/images/Ih_3.avif"],
    Commercial: ["/images/cs_1.jpg", "/images/cs_2.jpg", "/images/cs_3.jpg"],
    Farm: ["/images/fl_1.avif", "/images/fl_2.avif"],
    "Apartment Flat": ["/images/App_1.avif", "/images/App_2.avif", "/images/App_3.avif", "/images/App_4.avif"],
    "Open Plot": ["/images/op_1.jpg", "/images/op_2.jpg", "/images/op_3.jpg", "/images/op_4.jpg"],
    "Office Space": ["/images/cs_1.jpg", "/images/cs_2.jpg", "/images/cs_3.jpg"],
  }

  const images = typeImages[propertyType] || ["/images/villa_1.avif"]
  return images[index % images.length]
}

const PropertySkeleton = () => (
  <div className="relative bg-gray-200 rounded-2xl overflow-hidden animate-pulse h-96 w-full">
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
)

export default function BuyPropertyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)
  const [isFromForm, setIsFromForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<{
    locationMatched: boolean
    typeMatched: boolean
    requestedLocation: string
    requestedType: string
  }>({
    locationMatched: false,
    typeMatched: false,
    requestedLocation: "",
    requestedType: "",
  })

  useEffect(() => {
    // Check if user came from the property buying form
    const locationParam = searchParams.get("location")
    const typeParam = searchParams.get("type")
    const fromForm = searchParams.get("from") === "form"

    if (fromForm && (locationParam || typeParam)) {
      setIsFromForm(true)
      setShowFilters(true) // Auto-show filters when coming from form

      // Store requested filters for comparison
      setFilterStatus((prev) => ({
        ...prev,
        requestedLocation: locationParam || "",
        requestedType: typeParam || "",
      }))
    }

    fetchProperties()
  }, [searchParams])

  useEffect(() => {
    if (properties.length > 0 && isFromForm) {
      checkFilterMatches()
    }
    filterProperties()
  }, [properties, selectedPropertyType, selectedLocation, isFromForm])

  const checkFilterMatches = () => {
    const locationParam = searchParams.get("location")
    const typeParam = searchParams.get("type")

    if (!locationParam && !typeParam) return

    // Check location match (mandatory)
    let locationMatched = false
    if (locationParam) {
      locationMatched = properties.some(
        (property) => property.location && property.location.toLowerCase().includes(locationParam.toLowerCase()),
      )
    }

    // Check property type match (optional)
    let typeMatched = false
    if (typeParam) {
      typeMatched = properties.some(
        (property) => property.property_type && property.property_type.toLowerCase().includes(typeParam.toLowerCase()),
      )
    }

    setFilterStatus({
      locationMatched,
      typeMatched,
      requestedLocation: locationParam || "",
      requestedType: typeParam || "",
    })

    // Apply filters based on matches
    if (locationMatched) {
      setSelectedLocation(locationParam || "")

      // Only apply type filter if both location and type match
      if (typeParam && typeMatched) {
        setSelectedPropertyType(typeParam)
      }
    }
    // If location doesn't match, don't apply any filters (show all properties)
  }

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/admin/buy-property")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch properties")
      }

      setProperties(data.properties)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const filterProperties = () => {
    let filtered = properties

    if (selectedPropertyType) {
      filtered = filtered.filter((property) => property.property_type === selectedPropertyType)
    }

    if (selectedLocation) {
      filtered = filtered.filter((property) => {
        // Add null/undefined check for location
        if (!property.location) return false
        return property.location.toLowerCase().includes(selectedLocation.toLowerCase())
      })
    }

    setFilteredProperties(filtered)
  }

  const getPropertyTypeCounts = () => {
    const counts: { [key: string]: number } = {}
    properties.forEach((property) => {
      if (property.property_type) {
        counts[property.property_type] = (counts[property.property_type] || 0) + 1
      }
    })
    return counts
  }

  const getLocationCounts = () => {
    const counts: { [key: string]: number } = {}
    properties.forEach((property) => {
      // Add null/undefined check for location
      if (property.location) {
        counts[property.location] = (counts[property.location] || 0) + 1
      }
    })
    return counts
  }

  const clearFilters = () => {
    setSelectedPropertyType("")
    setSelectedLocation("")
    setIsFromForm(false)
    setFilterStatus({
      locationMatched: false,
      typeMatched: false,
      requestedLocation: "",
      requestedType: "",
    })

    // Clear URL parameters by navigating to the clean URL
    router.replace("/buy-property", { scroll: false })
  }

  const updateURLWithFilters = (newPropertyType?: string, newLocation?: string) => {
    const params = new URLSearchParams()

    if (newLocation) {
      params.set("location", newLocation)
    }

    if (newPropertyType) {
      params.set("type", newPropertyType)
    }

    const queryString = params.toString()
    const newURL = queryString ? `/buy-property?${queryString}` : "/buy-property"

    router.replace(newURL, { scroll: false })
  }

  const handlePropertyTypeChange = (type: string) => {
    const newType = selectedPropertyType === type ? "" : type
    setSelectedPropertyType(newType)
    updateURLWithFilters(newType, selectedLocation)
  }

  const handleLocationChange = (location: string) => {
    const newLocation = selectedLocation === location ? "" : location
    setSelectedLocation(newLocation)
    updateURLWithFilters(selectedPropertyType, newLocation)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const handleCall = () => {
    window.open("tel:+917478997899", "_self")
  }

  const handleWhatsApp = (property: Property) => {
    const message = `Hi Srini Realty! I'm interested in the ${property.property_type} property in ${property.location || "your area"}. Size: ${property.size}, Facing: ${property.facing}. Please provide more details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/917478997899?text=${encodedMessage}`, "_blank")
  }

  const getStatusMessage = () => {
    if (!isFromForm) return null

    const { locationMatched, typeMatched, requestedLocation, requestedType } = filterStatus

    if (requestedLocation && locationMatched) {
      if (requestedType && typeMatched) {
        return {
          type: "success",
          message: `Perfect match! Found ${requestedType} properties in ${requestedLocation}`,
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        }
      } else if (requestedType && !typeMatched) {
        return {
          type: "partial",
          message: `Found properties in ${requestedLocation}, but no ${requestedType} available. Showing all property types in this location.`,
          icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
        }
      } else {
        return {
          type: "success",
          message: `Great! Found properties in ${requestedLocation}`,
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        }
      }
    } else if (requestedLocation && !locationMatched) {
      return {
        type: "none",
        message: `Sorry, we couldn't find properties in ${requestedLocation}. See all available properties instead.`,
        icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      }
    }

    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Properties</h1>
            <p className="text-xl text-gray-600">Loading amazing properties for you...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
            <p className="text-xl text-red-600 mb-8">{error}</p>
            <button
              onClick={fetchProperties}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const propertyTypeCounts = getPropertyTypeCounts()
  const locationCounts = getLocationCounts()
  const statusMessage = getStatusMessage()

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-500 mb-6">Buy Your Dream Property</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Discover premium properties available for purchase. Each property is carefully selected and verified by
              our expert team at Srini Realty.
            </p>

            {/* Show status message if user came from form */}
            {statusMessage && (
              <div
                className={`rounded-lg p-4 mb-6 max-w-4xl mx-auto flex items-center justify-center space-x-3 ${
                  statusMessage.type === "success"
                    ? "bg-green-100 border border-green-300"
                    : statusMessage.type === "partial"
                      ? "bg-orange-100 border border-orange-300"
                      : "bg-red-100 border border-red-300"
                }`}
              >
                {statusMessage.icon}
                <p
                  className={`font-medium ${
                    statusMessage.type === "success"
                      ? "text-green-800"
                      : statusMessage.type === "partial"
                        ? "text-orange-800"
                        : "text-red-800"
                  }`}
                >
                  {statusMessage.message}
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-6 py-3 text-lg bg-gray-300 text-purple-600 shadow-md">
                {filteredProperties.length} Properties Available
              </Badge>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="px-6 py-3 text-lg bg-white shadow-md"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex flex-wrap gap-6">
                {/* Property Type Filter */}
                <div className="flex-1 min-w-64">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(propertyTypeCounts).map(([type, count]) => (
                      <button
                        key={type}
                        onClick={() => handlePropertyTypeChange(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedPropertyType === type
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {type} ({count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="flex-1 min-w-64">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(locationCounts).map(([location, count]) => (
                      <button
                        key={location}
                        onClick={() => handleLocationChange(location)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedLocation === location
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {location} ({count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedPropertyType || selectedLocation) && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Active Filters Display */}
          {(selectedPropertyType || selectedLocation) && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {selectedPropertyType && (
                  <Badge variant="secondary" className="px-4 py-2 bg-blue-100 text-blue-800">
                    Type: {selectedPropertyType}
                    <button
                      onClick={() => handlePropertyTypeChange(selectedPropertyType)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedLocation && (
                  <Badge variant="secondary" className="px-4 py-2 bg-purple-100 text-purple-800">
                    Location: {selectedLocation}
                    <button
                      onClick={() => handleLocationChange(selectedLocation)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {properties.length === 0 ? "No Properties Available" : "No Properties Match Your Filters"}
              </h3>
              <p className="text-gray-600 mb-8">
                {properties.length === 0
                  ? "We're currently updating our property listings. Please check back soon!"
                  : "Try adjusting your filters to see more properties."}
              </p>
              {properties.length === 0 ? (
                <button
                  onClick={fetchProperties}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Properties
                </button>
              ) : (
                <Button onClick={clearFilters} className="bg-blue-600 text-white">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <Tooltip key={property.id}>
                  <TooltipTrigger asChild>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer h-96 w-full group border border-gray-100">
                      {/* Property Image Background */}
                      <div className="absolute inset-0">
                        <Image
                          src={getPropertyImage(property.property_type, index) || "/placeholder.svg"}
                          alt={`${property.property_type} in ${property.location}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 6}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      </div>

                      {/* Date Badge */}
                      {/* <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-base">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(property.created_at)}
                        </Badge>
                      </div> */}

                      {/* Property Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {/* Property Type - Large and Prominent */}
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                          {property.property_type}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center text-white/90 mb-4 ">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="font-medium text-base">{property.location || "Location not specified"}</span>
                        </div>

                        {/* Property Details Panel */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 space-y-3 shadow-lg">
                          {/* Price */}
                          {property.price_range && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Price</span>
                              <span className="text-lg font-bold text-orange-600">{property.price_range}</span>
                            </div>
                          )}

                          {/* Size */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Built-up Area</span>
                            <span className="text-sm font-semibold text-gray-900">{property.size}</span>
                          </div>

                          {/* Facing */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Facing</span>
                            <span className="text-sm font-semibold text-gray-900">{property.facing}</span>
                          </div>

                          {/* Contact Buttons */}
                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCall()
                              }}
                              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center shadow-md"
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleWhatsApp(property)
                              }}
                              className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center shadow-md"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent side="top" className="bg-gray-200 text-brown-700 p-4 rounded-lg shadow-xl">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/images/srini_realty_logo.png"
                        alt="Srini Realty"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-brown-700">Contact Srini Realty</p>
                        <p className="text-sm text-brown-700">+91 7478997899</p>
                        <div className="flex items-center space-x-2 mt-1 text-brown-700">
                          <Phone className="h-3 w-3 text-brown-700" />
                          <MessageCircle className="h-3 w-3 text-brown-700" />
                          <span>
                            WHATSAPP
                          </span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need Help Finding Your Perfect Property?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Our expert team is here to help you find the ideal property that matches your requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCall}
                className="flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call +91 7478997899
              </button>
              <button
                onClick={() =>
                  handleWhatsApp({
                    id: "",
                    property_type: "General Inquiry",
                    location: "",
                    size: "",
                    facing: "",
                    created_at: "",
                  })
                }
                className="flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg shadow-lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
