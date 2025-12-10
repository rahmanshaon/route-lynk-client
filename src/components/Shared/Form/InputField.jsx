import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  register,
  required,
  placeholder,
  errors,
  min,
}) => {
  return (
    <div className="form-control w-full">
      {/* Label */}
      <label className="label">
        <span className="label-text font-bold text-base-content/80 text-sm mb-2">
          {label}
        </span>
      </label>

      {/* Input */}
      <input
        type={type}
        placeholder={placeholder}
        min={min}
        className={`
          input input-bordered w-full 
          bg-base-100 text-base-content 
          placeholder:text-base-content/40
          focus:outline-none transition-all duration-200
          ${errors[name] ? "input-error" : ""}
        `}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      />

      {/* Error Message */}
      {errors[name] && (
        <span className="text-error text-xs mt-1 font-medium">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default InputField;
