"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Menu,
  Home,
  Building2,
  Building,
  Warehouse,
  TreePine,
  Users,
  Phone,
  FileText,
  ShoppingCart,
  Hammer,
  ChevronDown,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { usePathname } from "next/navigation"
import { DialogTitle } from "@radix-ui/react-dialog"
import LocationDialog from "./location-dialog"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hide navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null
  }

  // Property types for dropdown
  const propertyTypes = [
    { label: "Villas", href: "/villas" },
    { label: "Open Flats", href: "/open-flats" },
    { label: "Apartments", href: "/apartments" },
    { label: "Independent Houses", href: "/independent-houses" },
    { label: "Farms", href: "/farms" },
  ]

  // Desktop navigation items (replaced admin with buy property)
  const desktopNavItems = [
    { label: "Property Selling", href: "/property-selling" },
    { label: "Property Buying", href: "/property-buying" },
    { label: "Develop Property", href: "/develop-property" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  // Mobile navigation items (replaced admin with buy property)
  const mobileNavItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Property Selling", href: "/property-selling", icon: FileText },
    { label: "Property Buying", href: "/property-buying", icon: ShoppingCart },
    { label: "Develop Property", href: "/develop-property", icon: Hammer },
    { label: "Search Property", href: "/buy-property", icon: Search },
    { label: "Villas", href: "/villas", icon: Building2 },
    { label: "Open Flats", href: "/open-flats", icon: Building },
    { label: "Apartments", href: "/apartments", icon: Building },
    {
      label: "Independent Houses",
      href: "/independent-houses",
      icon: Warehouse,
    },
    { label: "Farms", href: "/farms", icon: TreePine },
    { label: "About Us", href: "/about", icon: Users },
    { label: "Contact", href: "/contact", icon: Phone },
  ]

  // Check if any property type is active
  const isPropertyActive = propertyTypes.some((property) => pathname === property.href)

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        } mb-0`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/srini_realty_logo.png" alt="Srini Realty" className="h-40 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 group cursor-pointer ${
                    pathname === item.href
                      ? "text-white text-sm bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                      : "text-slate-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 ${
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}

              {/* Properties Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`relative px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 group flex items-center space-x-1 cursor-pointer${
                      isPropertyActive
                        ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                        : "text-slate-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <span>Properties</span>
                    <ChevronDown className="h-3 w-3" />
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 cursor-pointer ${
                        isPropertyActive ? "w-full text-blue-500" : "group-hover:w-full text-gray-500"
                      }`}
                    ></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg mt-2"
                >
                  {propertyTypes.map((property) => (
                    <DropdownMenuItem key={property.href} asChild>
                      <Link
                        href={property.href}
                        className={`w-full px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 flex items-center cursor-pointer${
                          pathname === property.href
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-blue-500"
                            : "text-slate-600"
                        }`}
                      >
                        {property.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Buy Property Button */}
              <Link href="/buy-property">
                <Button
                  variant="outline"
                  className={`ml-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 bg-transparent ${
                    pathname === "/buy-property"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent"
                      : ""
                  }`}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Property
                </Button>
              </Link>

              <Button
                className="ml-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => {
                  setIsLocationOpen(true)
                }}
              >
                Schedule Visit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-purple-50 hover:scale-110 transition-all duration-300"
                >
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/5 bg-white transition-all duration-500 ease-in-out">
                <DialogTitle asChild>
                  <VisuallyHidden>Navigation Menu</VisuallyHidden>
                </DialogTitle>
                <div className="flex flex-col space-y-4 mt-12 h-4/5 overflow-y-auto">
                  {mobileNavItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`relative px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-2 flex items-center space-x-3 ${
                          pathname === item.href
                            ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                            : "text-slate-600 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                        {pathname === item.href && (
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <LocationDialog isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
    </>
  )
}
