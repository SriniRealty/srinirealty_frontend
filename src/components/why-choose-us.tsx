import { Shield, Award, Users, Headphones } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Expertise",
      description:
        "Over 15 years of experience in real estate with a proven track record of successful property transactions and satisfied clients.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Award,
      title: "Premium Properties",
      description:
        "Carefully curated selection of high-quality properties in prime locations with excellent investment potential and growth prospects.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Users,
      title: "Personalized Service",
      description:
        "Dedicated property consultants who understand your unique needs and provide tailored solutions for your real estate journey.",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you at every step, from property selection to final documentation and beyond.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
            Why Choose Us?
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mt-2 rounded-full"></div>
          </h2>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Left Side - Feature Cards */}
          <div className="space-y-6 h-[600px] flex flex-col justify-between">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-1"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`${feature.bgColor} p-3 rounded-xl flex-shrink-0`}
                    >
                      <IconComponent
                        className={`h-5 w-5 ${feature.iconColor}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Office Image */}
          <div className="relative h-[600px]">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-tr-4xl rounded-bl-4xl p-1 h-full">
              <div className="bg-white rounded-tr-4xl rounded-bl-4xl p-6 h-full">
                <img
                  src="/images/villa_4.avif"
                  alt="Srini Realty Office - Professional Real Estate Services Team"
                  className="w-full h-full object-cover rounded-tr-4xl rounded-bl-4xl shadow-lg"
                />
              </div>
            </div>

            {/* Floating Elements */}
            {/* <div className="absolute -top-4 -right-4 bg-orange-400 text-white p-3 rounded-full shadow-lg animate-pulse">
              <Award className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-white p-3 rounded-full shadow-lg animate-pulse">
              <Shield className="h-6 w-6" />
            </div>
            <div className="absolute top-1/2 -left-6 bg-purple-400 text-white p-2 rounded-full shadow-lg animate-bounce">
              <Users className="h-4 w-4" />
            </div> */}
          </div>
        </div>

        {/* Mobile Layout - Stacked with Different Style */}
        <div className="lg:hidden">
          {/* Mobile Image First */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-tr-4xl rounded-bl-4xl p-1">
              <div className="bg-white rounded-tr-4xl rounded-bl-4xl p-4">
                <img
                  src="/images/villa_4.avif"
                  alt="Srini Realty Office - Professional Real Estate Services Team"
                  className="w-full h-64 object-cover rounded-tr-4xl rounded-bl-4xl shadow-lg"
                />
              </div>
            </div>

            {/* Mobile Floating Elements */}
            {/* <div className="absolute -top-3 -right-3 bg-orange-400 text-white p-2 rounded-full shadow-lg">
              <Award className="h-4 w-4" />
            </div>
            <div className="absolute -bottom-3 -left-3 bg-green-400 text-white p-2 rounded-full shadow-lg">
              <Shield className="h-4 w-4" />
            </div> */}
          </div>

          {/* Mobile Feature Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <div
                      className={`${feature.bgColor} p-3 rounded-xl inline-flex mb-3`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${feature.iconColor}`}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
