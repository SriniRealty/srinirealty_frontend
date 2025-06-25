import { Button } from "./ui/button";
import LocationDialog from "./location-dialog";
import { useState } from "react";

export default function MiniContact() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  return (
    <div>
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Grow Together?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have made their real
            estate dreams come true with Srini Realty Private Limited in
            Hyderabad. Let's grow together towards your property goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              className="bg-white text-teal-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                setIsLocationOpen(true);
              }}
            >
              Contact Us Today
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-10 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10"
            >
              Download Brouchere
            </Button>
          </div>
        </div>
      </section>

      <LocationDialog
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
}
