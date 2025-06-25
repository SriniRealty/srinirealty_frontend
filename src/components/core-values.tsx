import { Shield, Heart, Lightbulb } from "lucide-react";

const coreValues = [
  {
    icon: Shield,
    title: "Trust",
    description:
      "Building lasting relationships through transparency, reliability, and ethical business practices. Every promise we make is a commitment we keep, ensuring complete peace of mind for our customers throughout their property journey.",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: Heart,
    title: "Harmony",
    description:
      "Creating balanced living spaces that foster community connections and environmental sustainability. We design homes that bring families together while respecting the natural landscape and promoting harmonious neighborhood relationships.",
    color: "from-emerald-600 to-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Embracing cutting-edge construction technologies, smart home solutions, and modern architectural designs. We continuously evolve our methods to deliver future-ready properties that exceed contemporary living standards.",
    color: "from-amber-600 to-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Core Values
          </h2>
          <p className="text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
            The fundamental principles that guide every decision we make and
            every property we develop in Hyderabad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-3 group ${value.bgColor} border ${value.borderColor}`}
            >
              <div
                className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
              >
                <value.icon className="h-10 w-10 text-white" />
              </div>
              <h3
                className={`font-heading text-2xl font-bold mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform`}
              >
                {value.title}
              </h3>
              <p className="text-gray-800 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="font-heading text-4xl font-bold text-cta mb-2">
              15+
            </div>
            <div className="text-gray-800">Years of Trust</div>
          </div>
          <div className="p-6">
            <div className="font-heading text-4xl font-bold text-emerald-600 mb-2">
              5000+
            </div>
            <div className="text-gray-800">Harmonious Homes</div>
          </div>
          <div className="p-6">
            <div className="font-heading text-4xl font-bold text-amber-600 mb-2">
              50+
            </div>
            <div className="text-gray-800">Innovative Projects</div>
          </div>
          <div className="p-6">
            <div className="font-heading text-4xl font-bold text-purple-600 mb-2">
              98%
            </div>
            <div className="text-gray-800">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
