import React from "react";
import { FaUpload } from "react-icons/fa";
import InputField from "../../Shared/Form/InputField";
import SelectField from "../../Shared/Form/SelectField";

const AddTicketForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
}) => {
  const transportOptions = [
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train" },
    { value: "launch", label: "Launch" },
    { value: "flight", label: "Flight" },
  ];

  const perksList = [
    "AC",
    "WiFi",
    "Snacks",
    "Blanket",
    "Charging Port",
    "Sleeper",
    "Reading Light",
    "Meal",
    "Water",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* --- Title & Type --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Ticket Title"
          name="title"
          placeholder="Green Line Express - Morning"
          register={register}
          errors={errors}
          required
        />
        <SelectField
          label="Transport Type"
          name="transportType"
          options={transportOptions}
          register={register}
          errors={errors}
          required
        />
      </div>

      {/* --- Locations --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="From (Departure)"
          name="from"
          placeholder="Dhaka"
          register={register}
          errors={errors}
          required
        />
        <InputField
          label="To (Destination)"
          name="to"
          placeholder="Chittagong"
          register={register}
          errors={errors}
          required
        />
      </div>

      {/* --- Price, Qty, Date, Time --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InputField
          label="Price (Tk)"
          name="price"
          type="number"
          placeholder="500"
          min="1"
          register={register}
          errors={errors}
          required
        />
        <InputField
          label="Total Seats"
          name="quantity"
          type="number"
          placeholder="40"
          min="1"
          register={register}
          errors={errors}
          required
        />
        <InputField
          label="Date"
          name="departureDate"
          type="date"
          register={register}
          errors={errors}
          required
        />
        <InputField
          label="Time"
          name="departureTime"
          type="time"
          register={register}
          errors={errors}
          required
        />
      </div>

      {/* --- Perks --- */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold text-base-content/80 text-sm mb-2">
            Select Perks
          </span>
        </label>

        <div
          className={`border rounded-lg p-4 w-full bg-base-100 ${
            errors.perks ? "border-error" : "border-base-content/20"
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4">
            {perksList.map((perk) => (
              <label
                key={perk}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  value={perk}
                  {...register("perks", {
                    required: "At least one perk is required",
                  })}
                  className="checkbox checkbox-sm checkbox-primary rounded-sm border-base-content/30"
                />
                <span className="text-sm font-medium text-base-content/70 group-hover:text-primary transition-colors select-none">
                  {perk}
                </span>
              </label>
            ))}
          </div>
        </div>

        {errors.perks && (
          <span className="text-error text-xs mt-1 font-medium">
            {errors.perks.message}
          </span>
        )}
      </div>

      {/* --- Description --- */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold text-base-content/80 text-sm mb-2">
            Description
          </span>
        </label>
        <textarea
          className={`textarea textarea-bordered h-32 w-full bg-base-100 text-base-content focus:textarea-primary focus:outline-none text-base leading-relaxed placeholder:text-base-content/40 ${
            errors.description ? "textarea-error" : ""
          }`}
          placeholder="Detailed information about the journey..."
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-error text-xs mt-1 font-medium">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* --- Image Upload --- */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold text-base-content/80 text-sm mb-2">
            Ticket Banner Image
          </span>
        </label>
        <input
          type="file"
          className={`file-input file-input-bordered file-input-primary w-full bg-base-100 text-base-content ${
            errors.image ? "file-input-error" : ""
          }`}
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && (
          <span className="text-error text-xs mt-1 font-medium">
            Please select an image
          </span>
        )}
      </div>

      {/* --- Submit Button --- */}
      <div className="form-control mt-8">
        <button
          disabled={loading}
          className="btn btn-gradient w-full flex items-center justify-center gap-2 text-white text-lg"
        >
          {loading ? (
            <span className="loading loading-spinner text-white"></span>
          ) : (
            <FaUpload />
          )}
          {loading ? "Publishing..." : "Publish Ticket"}
        </button>
      </div>
    </form>
  );
};

export default AddTicketForm;
