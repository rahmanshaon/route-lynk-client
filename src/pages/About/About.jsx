import React from "react";
import { Link } from "react-router";
import {
  FaRocket,
  FaHandshake,
  FaLightbulb,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import useTitle from "../../hooks/useTitle";

const About = () => {
  useTitle("About Us");

  const stats = [
    { label: "Active Users", value: "15K+", color: "text-primary" },
    { label: "Tickets Sold", value: "45K+", color: "text-secondary" },
    { label: "Partners", value: "100+", color: "text-accent" },
    { label: "Cities Covered", value: "64", color: "text-success" },
  ];

  const values = [
    {
      icon: FaRocket,
      title: "Innovation",
      desc: "We leverage the latest MERN stack technology to provide a seamless, glitch-free booking experience.",
    },
    {
      icon: FaHandshake,
      title: "Reliability",
      desc: "Partnering only with verified vendors to ensure your safety and comfort during every journey.",
    },
    {
      icon: FaLightbulb,
      title: "Simplicity",
      desc: "Complex travel plans made simple. Book bus, train, launch, or flight tickets in just 3 clicks.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* --- Hero / Intro --- */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 -z-10"></div>
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-base-200 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Our Story
          </span>
          <h1 className="text-5xl font-black text-base-content mb-6 leading-tight">
            Redefining How <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              Bangladesh Travels
            </span>
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto leading-relaxed">
            RouteLynk is the all-in-one ticketing platform designed to bridge
            the gap between travelers and transport operators. We bring the
            ticket counter to your fingertips.
          </p>
        </div>
      </div>

      {/* --- Mission & Vision --- */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-linear-to-r from-primary to-secondary rounded-3xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500"></div>
            <img
              src="https://i.ibb.co.com/v4tfF1Sb/route-office.jpg"
              alt="Team working"
              className="relative rounded-3xl shadow-2xl w-full object-cover h-[400px]"
            />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-base-content mb-6">
              Empowering Journeys, <br /> One Ticket at a Time.
            </h2>
            <p className="text-base-content/70 mb-6 leading-relaxed">
              Founded in 2025, RouteLynk started with a simple problem: booking
              tickets in Bangladesh was chaotic. Long queues, scalpers, and
              uncertainty were the norm.
            </p>
            <p className="text-base-content/70 mb-8 leading-relaxed">
              We built a solution that offers transparency, real-time seat
              availability, and secure payments. Whether you are a daily
              commuter or a holiday seeker, RouteLynk ensures your journey
              starts smoothly.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-4">
                  <h4 className={`text-3xl font-black ${stat.color}`}>
                    {stat.value}
                  </h4>
                  <p className="text-xs text-base-content/50 uppercase font-bold tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Core Values --- */}
      <div className="bg-base-200/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              What Drives Us
            </h2>
            <p className="text-base-content/60">
              Our core values guide every decision we make, ensuring we deliver
              the best experience for our users and vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-base-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-base-200"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6">
                  <val.icon />
                </div>
                <h3 className="text-xl font-bold text-base-content mb-3">
                  {val.title}
                </h3>
                <p className="text-base-content/60 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Team / CTA --- */}
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-primary text-white rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <FaUsers className="text-5xl mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start your journey?
            </h2>
            <p className="opacity-80 text-lg mb-8">
              Join thousands of happy travelers who trust RouteLynk for their
              daily commutes and holiday trips.
            </p>
            <Link
              to="/all-tickets"
              className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none rounded-full px-10 font-bold shadow-lg"
            >
              Book a Ticket <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
