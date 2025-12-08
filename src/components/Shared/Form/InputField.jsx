import React from "react";

const InputField = ({ label, type = "text", name, register, required, placeholder, errors, min }) => {
  return (
    <div className="form-control w-full">
      <label className="label font-bold text-gray-600">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        min={min}
        className={`input input-bordered w-full focus:input-primary ${errors[name] ? "input-error" : ""}`}
        {...register(name, { required: required ? `${label} is required` : false })}
      />
      {errors[name] && (
        <span className="text-error text-xs mt-1">{errors[name].message}</span>
      )}
    </div>
  );
};

export default InputField;