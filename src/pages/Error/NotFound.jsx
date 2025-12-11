import React from "react";
import { Link } from "react-router";
import { FaBus, FaHome, FaMapMarkedAlt } from "react-icons/fa";

const NotFound = ({
  title = "Page Not Found",
  description = "The route you are looking for doesn't exist or has been moved.",
  linkText = "Back to Home",
  linkTo = "/",
}) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="text-9xl text-base-200 animate-pulse">
          <FaMapMarkedAlt />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 bg-base-100 p-2 rounded-full border-4 border-base-100">
          <div className="bg-error/10 text-error p-4 rounded-full text-4xl">
            <FaBus />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl font-black text-base-content mb-4">
        {title === "Page Not Found" ? (
          <span>
            404{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              Error !
            </span>
          </span>
        ) : (
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
            {title}
          </span>
        )}
      </h1>

      <p className="text-base-content/60 text-lg max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      <Link
        to={linkTo}
        className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 text-white font-bold gap-2 hover:scale-105 transition-transform"
      >
        <FaHome /> {linkText}
      </Link>
    </div>
  );
};

export default NotFound;
