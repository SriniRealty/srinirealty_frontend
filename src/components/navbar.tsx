"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Home, Building2, Building, Warehouse, TreePine, Users, BookOpen, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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

  // Navigation items for desktop (without icons)
  const desktopNavItems = [
    { label: "Villas", href: "/villas" },
    { label: "Open Flats", href: "/open-flats" },
    { label: "Apartments", href: "/apartments" },
    { label: "Independent Houses", href: "/independent-houses" },
    { label: "Farms", href: "/farms" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  // Navigation items for mobile (with icons)
  const mobileNavItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Villas", href: "/villas", icon: Building2 },
    { label: "Open Flats", href: "/open-flats", icon: Building },
    { label: "Apartments", href: "/apartments", icon: Building },
    { label: "Independent Houses", href: "/independent-houses", icon: Warehouse },
    { label: "Farms", href: "/farms", icon: TreePine },
    { label: "About Us", href: "/about", icon: Users },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Contact", href: "/contact", icon: Phone },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Reduced height */}
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/srini_realty_logo.png" alt="Srini Realty" className="h-40 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 group ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
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
                  className="lg:hidden transition-all duration-300 hover:bg-purple-50 hover:scale-110"
                >
                  <Menu className="h-6 w-6 text-primary transition-transform duration-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-3/5 bg-white transition-all duration-500 ease-in-out">
                <DialogTitle asChild>
                  <VisuallyHidden>Navigation Menu</VisuallyHidden>
                </DialogTitle>
                <div className="flex flex-col space-y-4 mt-12 h-4/5">
                  {mobileNavItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${
                          pathname === item.href
                            ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
                            : "text-slate-600 hover:text-purple-600 hover:bg-purple-50"
                        }`}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animation: isMobileMenuOpen ? "slideInRight 0.3s ease-out forwards" : "none",
                        }}
                      >
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        <span>{item.label}</span>
                        {pathname === item.href && (
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></span>
                        )}
                      </Link>
                    )
                  })}

                  {/* <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full mt-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={() => setIsLocationOpen(true)}
                  >
                    Schedule Visit
                  </Button> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Location Dialog */}
      <LocationDialog isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />

      {/* CSS for mobile menu animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
