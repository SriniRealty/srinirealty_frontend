"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation, Clock, Mail, X } from "lucide-react";

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationDialog({
  isOpen,
  onClose,
}: LocationDialogProps) {
  const officeAddress =
    "PE/14, 8-7-91/16, Phase 4, Hasthinapuram South, Hastinapuram, Hyderabad, Telangana 500070";
  const phoneNumber = "+917478997899";
  const whatsappNumber = "+917478997899";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl w-[95vw] max-w-[95vw] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl border-0 p-0">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center pr-8">
              Visit Our Office - Let's Grow Together
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Google Maps Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Location
              </h3>

              {/* Google Maps Embed */}
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Srini Realty Office Location"
                />
              </div>

              {/* Address Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Head Office Address
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {officeAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Open in Google Maps Button */}
              <Button
                onClick={() => window.open(googleMapsUrl, "_blank")}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Navigation className="h-5 w-5 mr-2" />
                Open in Google Maps & Get Directions
              </Button>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>

              {/* Office Hours */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Office Hours
                    </h4>
                    <div className="space-y-1 text-gray-700 text-sm">
                      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Get in Touch</h4>

                {/* Phone Call */}
                <Button
                  onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-600 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  Call Now: {phoneNumber}
                </Button>

                {/* WhatsApp */}
                <Button
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber.replace("+", "")}?text=Hi, I would like to schedule a site visit`,
                      "_blank"
                    )
                  }
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp: Schedule Visit
                </Button>

                {/* Email */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Email Us</p>
                      <p className="text-gray-700">info@srinirealty.in</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Why Visit Our Office?
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• View detailed property brochures and floor plans</li>
                  <li>• Meet our expert property consultants</li>
                  <li>• Get personalized property recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
