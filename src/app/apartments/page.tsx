"use client";

import { MapPin, Bed, Bath, Square, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import LocationDialog from "@/components/location-dialog";
import { useState } from "react";
import MiniContact from "@/components/mini-contact";

const apartments = [
  {
    id: 2,
    title: "Modern 3BHK Apartment",
    location: "Gachibowli, Hyderabad",
    price: "₹1.2 Cr",
    beds: 3,
    baths: 2,
    area: "1800 sq ft",
    image: "/images/App_3.avif",
    rating: 4.7,
  },
  {
    id: 9,
    title: "Premium 2BHK Apartment",
    location: "Madhapur, Hyderabad",
    price: "₹95 L",
    beds: 2,
    baths: 2,
    area: "1200 sq ft",
    image: "/images/App_2.avif",
    rating: 4.6,
  },
];

export default function ApartmentsPage() {
  const [isLocationOpen, setIsLoactionOpen] = useState(false);

  return (
    <div className="pt-16">
      {/* Hero Section with Background Image - Bigger Height */}
      <section className="py-40 relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            backgroundImage: `url('/images/App_1.avif')`,
          }}
        ></div>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-white/90 mb-8 drop-shadow-2xl">
            Modern Apartments
          </h1>
          <p className="text-white/80 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Contemporary living spaces in prime locations with modern amenities
            and excellent connectivity in Hyderabad
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apartment) => (
              <Card
                key={apartment.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={apartment.image || "/placeholder.svg"}
                      alt={apartment.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "/placeholder.svg?height=256&width=400&text=Apartment";
                      }}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">
                      {apartment.rating}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-heading text-xl font-bold text-gray-800">
                      {apartment.title}
                    </h3>
                    <span className="text-blue-600 font-bold text-xl">
                      {apartment.price}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">{apartment.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 text-sm mb-6">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{apartment.beds}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{apartment.baths}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{apartment.area}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white text-lg"
                    onClick={() => {
                      setIsLoactionOpen(true);
                    }}
                  >
                    Visit For Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <LocationDialog
        isOpen={isLocationOpen}
        onClose={() => setIsLoactionOpen(false)}
      />
      <MiniContact />
    </div>
  );
}
