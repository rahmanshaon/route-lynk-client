import React from "react";
import { FaFacebook, FaLinkedin, FaStripe, FaTwitter } from "react-icons/fa";
import Logo from "./Logo";
import CustomNavLink from "./CustomNavLink";
import { Link } from "react-router";

const Footer = () => {
  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/all-tickets", label: "All Tickets" },
    { path: "/contact", label: "Contact Us" },
    { path: "/about", label: "About" },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-700 mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 text-center lg:text-left">
          {/* Brand Info */}
          <div className="flex flex-col items-center lg:items-start">
            <Logo size="md" direction="col" />
            <p className="mt-4 text-sm leading-relaxed text-gray-400 max-w-xs">
              Book bus, train, launch & flight tickets easily with RouteLynk.
              Your trusted partner for safe and comfortable journeys.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h6 className="text-lg font-bold text-white mb-6">Quick Links</h6>
            <ul className="space-y-3">
              <CustomNavLink
                links={quickLinks}
                variant="white"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center lg:items-start">
            <h6 className="text-lg font-bold text-white mb-6">Contact</h6>

            <div className="flex flex-col gap-3 mb-6">
              <a
                href="mailto:support@routelynk.com"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                support@routelynk.com
              </a>
              <a
                href="tel:+8801234567890"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                +880 123 456 7890
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="text-2xl text-gray-400 cursor-pointer hover:text-blue-500 transition-colors duration-300" />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl text-gray-400 cursor-pointer hover:text-blue-400 transition-colors duration-300" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-2xl text-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-300" />
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col items-center lg:items-start">
            <h6 className="text-lg font-bold text-white mb-6">We Accept</h6>

            <div className="flex flex-col items-center lg:items-start">
              <div className="text-6xl text-gray-200 hover:text-white transition-colors duration-300">
                <FaStripe className="cursor-pointer" />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Secure payments powered by Stripe.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} RouteLynk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
