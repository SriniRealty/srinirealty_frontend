"use client";

import { MapPin, Bed, Bath, Square, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import LocationDialog from "@/components/location-dialog";
import { useState } from "react";
import MiniContact from "@/components/mini-contact";

const openFlats = [
  {
    id: 5,
    title: "Studio Apartment",
    location: "Kondapur, Hyderabad",
    price: "₹65 L",
    beds: 1,
    baths: 1,
    area: "800 sq ft",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    rating: 4.5,
  },
];

export default function OpenFlatsPage() {
  const [isLoactionOpen, setIsLoactionOpen] = useState(false);

  return (
    <div className="pt-16">
      {/* Hero Section with Background Image - Bigger Height */}
      <section className="py-40 relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop')`,
          }}
        ></div>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-white/90 mb-8 drop-shadow-2xl">
            Open Flats
          </h1>
          <p className="text-white/80 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Modern studio apartments perfect for young professionals and
            students seeking affordable luxury in Hyderabad
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openFlats.map((flat) => (
              <Card
                key={flat.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={flat.image || "/placeholder.svg"}
                      alt={flat.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "/placeholder.svg?height=256&width=400&text=Studio";
                      }}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{flat.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-heading text-xl font-bold text-gray-800">
                      {flat.title}
                    </h3>
                    <span className="text-blue-600 font-bold text-xl">
                      {flat.price}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">{flat.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 text-sm mb-6">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{flat.beds}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{flat.baths}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{flat.area}</span>
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

      <MiniContact />

      <LocationDialog
        isOpen={isLoactionOpen}
        onClose={() => {
          setIsLoactionOpen(false);
        }}
      />
    </div>
  );
}
