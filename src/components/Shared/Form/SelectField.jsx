import React from "react";

const SelectField = ({ label, name, register, required, options, errors }) => {
  return (
    <div className="form-control w-full">
      <label className="label font-bold text-gray-600">
        {label}
      </label>
      <select
        className={`select select-bordered w-full focus:select-primary ${errors[name] ? "select-error" : ""}`}
        {...register(name, { required: required ? `Please select a ${label.toLowerCase()}` : false })}
        defaultValue=""
      >
        <option value="" disabled>Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-error text-xs mt-1">{errors[name].message}</span>
      )}
    </div>
  );
};

export default SelectField;