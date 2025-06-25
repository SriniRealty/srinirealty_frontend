"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationDialog from "./location-dialog";

const heroSlides = [
  {
    id: 1,
    href: "/villas",
    image: "/images/villa_1.avif",
    title: "Luxury Villas with Premium Amenities",
    subtitle:
      "Experience the finest living with our exclusive villa collection featuring world-class amenities and stunning architecture",
    cta: "Explore Villas",
  },
  {
    id: 2,
    href: "/apartments",
    image: "/images/App_4.avif",
    title: "Modern Apartments in Prime Locations",
    subtitle:
      "Contemporary living spaces designed for urban professionals with stunning city views and modern facilities",
    cta: "View Apartments",
  },
  {
    id: 3,
    href: "/independent-houses",
    image: "/images/Ih_3.avif",
    title: "Independent Houses for Growing Families",
    subtitle:
      "Spacious homes with private gardens and modern facilities in peaceful, family-friendly neighborhoods",
    cta: "Discover Houses",
  },
  {
    id: 4,
    href: "/farms",
    image: "/images/fl_2.avif",
    title: "Agricultural Lands & Farm Houses",
    subtitle:
      "Invest in fertile lands with modern farming infrastructure and scenic beauty for sustainable living",
    cta: "Explore Farms",
  },
  {
    id: 5,
    href: "/open-flats",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    title: "Villa Open Flats & Studios",
    subtitle:
      "Affordable luxury living spaces perfect for young professionals and students in prime locations",
    cta: "View Open Flats",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="relative h-[90vh] lg:h-screen overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-8 w-full">
                <div className="max-w-4xl">
                  <h1 className="font-heading text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 leading-relaxed max-w-3xl">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Link
                      href={slide.href ?? "/"}
                      className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 text-base font-semibold rounded-xl border-2 border-transparent bg-cta hover:bg-cta-hover text-white transition-all duration-300 hover:scale-105 min-w-[160px] text-center"
                    >
                      {slide.cta}
                    </Link>

                    <Button
                      variant="outline"
                      className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 text-base font-semibold rounded-xl border-2 border-white bg-white/10 text-white hover:bg-white hover:text-[#2563eb] transition-all duration-300 hover:scale-105 min-w-[160px]"
                      onClick={() => setIsLocationOpen(true)}
                    >
                      Schedule Visit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Significantly smaller on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-6 h-6 md:w-14 md:h-14 bg-white/30 hover:bg-cta/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
      >
        <ChevronLeft className="h-3 w-3 md:h-7 md:w-7" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-6 h-6 md:w-14 md:h-14 bg-white/30 hover:bg-cta/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
      >
        <ChevronRight className="h-3 w-3 md:h-7 md:w-7" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-cta scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/80 text-sm backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/20">
        {currentSlide + 1} / {heroSlides.length}
      </div>
      <LocationDialog
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
}
