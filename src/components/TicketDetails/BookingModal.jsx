import React from "react";
import { useForm } from "react-hook-form";
import { FaTicketAlt, FaExclamationCircle } from "react-icons/fa";

const BookingModal = ({
  ticket,
  user,
  closeModal,
  handleBooking,
  processing,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: { quantity: 0 },
  });

  // Price calculation
  const quantity = watch("quantity");
  const safeQuantity = quantity ? parseInt(quantity) : 0;
  const totalPrice = safeQuantity * ticket.price;

  const onSubmit = (data) => {
    handleBooking(data.quantity, totalPrice);
  };

  return (
    <dialog id="booking_modal" className="modal modal-middle" open>
      <div className="modal-box w-11/12 max-w-md p-5 md:p-6 rounded-2xl bg-base-100 text-base-content shadow-2xl">
        {/* Header */}
        <h3 className="font-bold text-xl md:text-2xl text-primary mb-1">
          Confirm Booking
        </h3>
        <p className="text-xs text-base-content/60 mb-5">
          Review your details before proceeding.
        </p>

        {/* Ticket Summary */}
        <div className="bg-base-200/50 p-3 md:p-4 rounded-xl mb-5 flex gap-4 items-center border border-base-300">
          <img
            src={ticket.image}
            alt="Ticket"
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover bg-base-300"
          />
          <div className="min-w-0">
            <h4 className="font-bold line-clamp-1 text-base-content text-sm md:text-base">
              {ticket.title}
            </h4>
            <p className="text-xs md:text-sm text-base-content/60 font-medium">
              {ticket.from} <span className="text-primary px-1">→</span>{" "}
              {ticket.to}
            </p>
            <p className="text-[10px] md:text-xs text-base-content/40 mt-1 uppercase font-bold">
              {ticket.transportType} • ৳{ticket.price}/seat
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* User Info */}
          <div className="grid grid-cols-1 gap-3 mb-3">
            <div className="form-control w-full">
              <label className="label font-bold text-base-content/50 text-[10px] uppercase pb-1">
                Passenger
              </label>
              <input
                type="text"
                value={`${user?.displayName} (${user?.email})`}
                readOnly
                className="input input-bordered input-sm w-full bg-base-200/50 text-base-content/70 cursor-not-allowed border-base-300 text-xs md:text-sm"
              />
            </div>
          </div>

          {/* Quantity Input */}
          <div className="form-control w-full mb-4">
            <div className="label pt-0">
              <span className="label-text font-bold text-base-content/60 text-xs uppercase">
                Select Seats
              </span>
              <span className="label-text-alt text-primary font-bold text-xs">
                Available: {ticket.quantity}
              </span>
            </div>

            <input
              type="number"
              min="0"
              max={ticket.quantity}
              step="1"
              placeholder="0"
              className={`input input-bordered w-full font-bold text-lg bg-base-100 ${
                errors.quantity
                  ? "input-error focus:border-error text-error"
                  : "focus:border-primary text-base-content"
              }`}
              {...register("quantity", {
                valueAsNumber: true,
                required: "Required",
                min: { value: 1, message: "Select at least 1 seat" },
                max: {
                  value: ticket.quantity,
                  message: `Max ${ticket.quantity} seats`,
                },
                validate: (value) =>
                  Number.isInteger(value) || "Whole numbers only",
              })}
            />

            {errors.quantity && (
              <div className="flex items-center gap-1 text-error text-xs mt-2 font-semibold animate-pulse">
                <FaExclamationCircle /> {errors.quantity.message}
              </div>
            )}
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/20 mb-6">
            <span className="font-bold text-base-content/70 text-xs md:text-sm uppercase">
              Total Amount
            </span>
            <span className="text-xl md:text-2xl font-black text-primary">
              ৳{isNaN(totalPrice) ? 0 : totalPrice}
            </span>
          </div>

          {/* Actions */}
          <div className="modal-action grid grid-cols-2 gap-3 mt-0">
            <button
              type="button"
              className="btn btn-sm md:btn-md btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content/70 font-bold"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                processing ||
                !isValid ||
                safeQuantity > ticket.quantity ||
                safeQuantity < 1
              }
              className="btn btn-sm md:btn-md btn-primary text-white shadow-lg shadow-primary/20 border-none font-bold"
            >
              {processing ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  Confirm <FaTicketAlt />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <form
        method="dialog"
        className="modal-backdrop bg-black/50 backdrop-blur-sm"
      >
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
};

export default BookingModal;
