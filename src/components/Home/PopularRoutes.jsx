import React from "react";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const PopularRoutes = () => {
  const routes = [
    {
      id: 1,
      from: "Dhaka",
      to: "Cox's Bazar",
      price: "3200",
      image: "https://i.ibb.co.com/kg59hQ6F/route1.png",
    },
    {
      id: 2,
      from: "Dhaka",
      to: "Sylhet",
      price: "1850",
      image: "https://i.ibb.co.com/3yZddmd8/route2.png",
    },
    {
      id: 3,
      from: "Chittagong",
      to: "Saint Martin",
      price: "2500",
      image: "https://i.ibb.co.com/fdm1vM5P/route3.png",
    },
    {
      id: 4,
      from: "Dhaka",
      to: "Bandarban",
      price: "3950",
      image: "https://i.ibb.co.com/BHX4xpQN/route4.png",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-3 animate-pulse">
            <FaMapMarkerAlt /> Top Destinations
          </div>
          <h2 className="text-4xl font-black text-base-content mb-4">
            Popular <span className="text-gradient">Routes</span>
          </h2>
          <p className="text-base-content/60">
            Explore the most travelled paths. From the mountains to the sea,
            find your perfect getaway.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <Link
              key={route.id}
              to={`/all-tickets?from=${route.from}&to=${route.to}`}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-lg border border-base-200"
            >
              {/* Background Image */}
              <img
                src={route.image}
                alt={`${route.from} to ${route.to}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                  Starts from ৳{route.price}
                </p>
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                  {route.from} <FaArrowRight className="text-sm text-primary" />{" "}
                  {route.to}
                </h3>

                {/* Hover Button */}
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-white transition-colors">
                  Book Now <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
