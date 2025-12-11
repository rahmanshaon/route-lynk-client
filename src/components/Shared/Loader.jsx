import React from "react";

const Loader = ({
  message,
  fullScreen = false,
  small = false,
  className = "",
}) => {
  const heightClass = fullScreen
    ? "min-h-screen"
    : small
    ? "min-h-[150px]"
    : "min-h-[60vh]";

  // Determine Spinner Size
  const spinnerSize = small ? "loading-md" : "loading-lg";

  // Determine Text Size
  const textSize = small ? "text-sm" : "text-xl";

  return (
    <div
      className={`flex flex-col justify-center items-center gap-3 w-full bg-base-100 ${heightClass} ${className}`}
    >
      <span
        className={`loading loading-spinner ${spinnerSize} text-primary`}
      ></span>

      {/* Optional Message with Pulse Effect */}
      {message && (
        <p
          className={`${textSize} font-medium text-base-content/70 animate-pulse tracking-wide`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
