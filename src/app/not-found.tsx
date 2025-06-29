import Link from "next/link"
import { Home, Search, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <div className="relative mb-16">
          <h1 className="text-[12rem] md:text-[16rem] font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-gray-200 -z-10 transform translate-x-2 translate-y-2">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            The property you're looking for seems to have moved to a new location.
          </p>
          <p className="text-base md:text-lg text-gray-500">Don't worry, we'll help you find your dream home!</p>
        </div>

        {/* Decorative Elements */}
        <div className="relative mb-12">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-200 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute -bottom-3 left-8 w-4 h-4 bg-indigo-200 rounded-full opacity-50 animate-pulse"></div>

          {/* House Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
          >
            <Link href="/villas">
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/villas"
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:underline"
            >
              Luxury Villas
            </Link>
            <Link
              href="/apartments"
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:underline"
            >
              Apartments
            </Link>
            <Link
              href="/independent-houses"
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:underline"
            >
              Houses
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Need immediate assistance?</p>
          <div className="flex justify-center items-center space-x-4">
            <a
              href="tel:+917478997899"
              className="inline-flex items-center text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              <Phone className="w-4 h-4 mr-1" />
              +91 7478997899
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="mailto:info@srinirealty.in"
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              info@srinirealty.in
            </a>
          </div>
        </div>

        {/* Footer Text */}
      </div>
    </div>
  )
}
