"use client";

import { useState } from "react";
import { MapPin, Bed, Bath, Square, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const properties = [
  {
    id: 1,
    type: "Villa",
    title: "Luxury Villa with Pool",
    location: "HITEC City, Hyderabad",
    price: "₹2.5 Cr",
    beds: 4,
    baths: 3,
    area: "3200 sq ft",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    featured: true,
    rating: 4.8,
  },
  {
    id: 2,
    type: "Apartment",
    title: "Modern 3BHK Apartment",
    location: "Gachibowli, Hyderabad",
    price: "₹1.2 Cr",
    beds: 3,
    baths: 2,
    area: "1800 sq ft",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    featured: true,
    rating: 4.7,
  },
  {
    id: 3,
    type: "Independent House",
    title: "Spacious Family Home",
    location: "Kompally, Hyderabad",
    price: "₹1.8 Cr",
    beds: 3,
    baths: 2,
    area: "2400 sq ft",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    featured: false,
    rating: 4.6,
  },
  {
    id: 4,
    type: "Commercial",
    title: "Premium Office Space",
    location: "Madhapur, Hyderabad",
    price: "₹80 L",
    beds: 0,
    baths: 2,
    area: "1200 sq ft",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    featured: true,
    rating: 4.9,
  },
  {
    id: 5,
    type: "Open Flat",
    title: "Studio Apartment",
    location: "Kondapur, Hyderabad",
    price: "₹65 L",
    beds: 1,
    baths: 1,
    area: "800 sq ft",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    featured: false,
    rating: 4.5,
  },
  {
    id: 6,
    type: "Farm",
    title: "Agricultural Land",
    location: "Shamshabad, Hyderabad",
    price: "₹45 L",
    beds: 0,
    baths: 0,
    area: "2 Acres",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    featured: false,
    rating: 4.4,
  },
];

const propertyTypes = [
  "All",
  "Villa",
  "Apartment",
  "Independent House",
  "Commercial",
  "Open Flat",
  "Farm",
];

export default function PropertyShowcase() {
  const [selectedType, setSelectedType] = useState("All");

  const filteredProperties =
    selectedType === "All"
      ? properties
      : properties.filter((property) => property.type === selectedType);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Featured Properties
          </h2>
          <p className="text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium properties across
            different categories, each offering exceptional value and modern
            amenities
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedType === type
                  ? "bg-cta text-white shadow-lg scale-105"
                  : "bg-white text-secondary hover:bg-gray-100 hover:text-primary border border-gray-200 hover:border-cta shadow-sm"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white"
            >
              <div className="relative">
                <div className="w-full h-72 overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "/placeholder.svg?height=288&width=400&text=" +
                        encodeURIComponent(property.type);
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {property.featured && (
                  <div className="absolute top-4 left-4 bg-highlight text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ Featured
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {property.type}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-primary">
                    {property.rating}
                  </span>
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-heading text-xl font-bold text-primary group-hover:text-cta transition-colors">
                    {property.title}
                  </h3>
                  <span className="text-cta font-bold text-xl">
                    {property.price}
                  </span>
                </div>

                <div className="flex items-center text-secondary mb-6">
                  <MapPin className="h-5 w-5 mr-2 text-cta" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between text-secondary text-sm mb-6">
                  {property.beds > 0 && (
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2 text-cta" />
                      <span>{property.beds} Beds</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-cta" />
                      <span>{property.baths} Baths</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-cta" />
                    <span>{property.area}</span>
                  </div>
                </div>

                <Link href={`/property/${property.id}`}>
                  <Button className="w-full bg-cta hover:bg-cta-hover text-white group-hover:shadow-lg transition-all duration-300">
                    View Details
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
