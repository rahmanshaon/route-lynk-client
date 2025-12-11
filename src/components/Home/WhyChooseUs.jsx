import React from "react";
import { FaShieldAlt, FaClock, FaHeadset, FaTags } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure Payments",
      description:
        "We use industry-standard encryption to ensure your transactions are 100% safe and secure.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: FaClock,
      title: "Instant Booking",
      description:
        "No queues, no delays. Get your confirmed e-ticket in your email within seconds.",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: FaTags,
      title: "Best Prices",
      description:
        "We offer competitive rates and exclusive discounts you won't find anywhere else.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "Our dedicated support team is ready to assist you round the clock with any queries.",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-base-content mb-6">
            Why Choose{" "}
            <span className="text-gradient">
              RouteLynk?
            </span>
          </h2>
          <p className="text-base-content/60">
            We are more than just a ticketing platform. We are your travel
            partners committed to making your journey smooth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
            >
              {/* Icon Circle */}
              <div
                className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}
              >
                <feature.icon />
              </div>

              <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-base-content/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
