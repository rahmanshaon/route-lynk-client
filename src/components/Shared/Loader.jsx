import React from "react";

const Loader = ({ message, fullScreen = false, small = false, className = "" }) => {
  
  // Determine height based on props
  // 1. fullScreen = takes whole viewport (h-screen)
  // 2. small = compact height (good for inside tables/cards)
  // 3. default = a comfortable padding height
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
    <div className={`flex flex-col justify-center items-center gap-3 w-full bg-base-100 ${heightClass} ${className}`}>
      {/* DaisyUI Spinner with Primary Color */}
      <span className={`loading loading-bars ${spinnerSize} text-primary`}></span>
      
      {/* Optional Message with Pulse Effect */}
      {message && (
        <p className={`${textSize} font-medium text-base-content/70 animate-pulse tracking-wide`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;