import React from "react";
import { useForm } from "react-hook-form";
import { FaTicketAlt } from "react-icons/fa";

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
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { quantity: 1 },
  });

  const quantity = watch("quantity", 1);
  const totalPrice = quantity * ticket.price;

  const onSubmit = (data) => {
    handleBooking(data.quantity, totalPrice);
  };

  return (
    <dialog
      id="booking_modal"
      className="modal modal-bottom sm:modal-middle"
      open
    >
      <div className="modal-box p-6 rounded-2xl">
        <h3 className="font-bold text-2xl text-gradient mb-4">
          Book Your Journey
        </h3>

        {/* Ticket Summary */}
        <div className="bg-base-200 p-4 rounded-xl mb-6 flex gap-4 items-center">
          <img
            src={ticket.image}
            alt="Ticket"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-bold line-clamp-1">{ticket.title}</h4>
            <p className="text-sm text-gray-500">
              {ticket.from} → {ticket.to}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* User Info (Read Only) */}
          <div className="form-control w-full mb-3">
            <label className="label font-semibold text-gray-500 text-xs uppercase">
              Passenger Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-50"
            />
          </div>

          <div className="form-control w-full mb-3">
            <label className="label font-semibold text-gray-500 text-xs uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-50"
            />
          </div>

          {/* Quantity Input */}
          <div className="form-control w-full mb-4">
            <label className="label font-semibold text-gray-500 text-xs uppercase">
              Tickets (Max {ticket.quantity})
            </label>
            <input
              type="number"
              className={`input input-bordered w-full font-bold text-lg ${
                errors.quantity ? "input-error" : ""
              }`}
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "At least 1 ticket" },
                max: {
                  value: ticket.quantity,
                  message: `Only ${ticket.quantity} seats available`,
                },
              })}
            />
            {errors.quantity && (
              <span className="text-error text-xs mt-1">
                {errors.quantity.message}
              </span>
            )}
          </div>

          {/* Total Price Display */}
          <div className="flex justify-between items-center bg-primary/10 p-4 rounded-xl border border-primary/20 mb-6">
            <span className="font-bold text-gray-700">Total Amount:</span>
            <span className="text-2xl font-black text-primary">
              ৳{totalPrice}
            </span>
          </div>

          {/* Actions */}
          <div className="modal-action grid grid-cols-2 gap-4">
            <button
              type="button"
              className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-gradient text-white"
              disabled={processing}
            >
              {processing ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <FaTicketAlt /> Confirm Booking
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
};

export default BookingModal;
