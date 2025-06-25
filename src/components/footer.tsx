import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-heading font-bold text-xl">
                Srini Realty Private Limited
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Building dreams, creating communities, and delivering excellence
              in real estate for over 15 years. Your trusted partner in finding
              the perfect property in Hyderabad.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/srini_realty/"
                className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Properties</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/villas"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/apartments"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/independent-houses"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Independent Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/open-flats"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Open Flats
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Commercial Spaces
                </Link>
              </li>
              <li>
                <Link
                  href="/farms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Farm Lands
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    PE/14, 8-7-91/16, Phase 4, Hasthinapuram South,
                  </p>
                  <p className="text-gray-300">
                    Hastinapuram, Hyderabad, Telangana 500070
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+917478997899"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +91 74 7899 7899
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@srinirealty.in"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    info@srinirealty.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2025 Srini Realty. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
