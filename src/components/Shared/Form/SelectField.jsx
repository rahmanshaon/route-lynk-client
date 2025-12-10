import React from "react";

const SelectField = ({ label, name, register, required, options, errors }) => {
  return (
    <div className="form-control w-full">
      {/* Label */}
      <label className="label">
        <span className="label-text font-bold text-base-content/80 text-sm mb-2">
          {label}
        </span>
      </label>

      {/* Select Box */}
      <select
        className={`
          select select-bordered w-full 
          bg-base-100 text-base-content 
          focus:select-primary focus:outline-none transition-all duration-200
          ${errors[name] ? "select-error" : ""}
        `}
        {...register(name, {
          required: required ? `Please select a ${label.toLowerCase()}` : false,
        })}
        defaultValue=""
      >
        <option value="" disabled className="text-base-content/40">
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {errors[name] && (
        <span className="text-error text-xs mt-1 font-medium">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default SelectField;
