import React from "react";
import { useLocation } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useTitle from "../../../hooks/useTitle";
import CheckoutForm from "../../../components/Dashboard/User/CheckoutForm";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_TOKEN);

const Payment = () => {
  useTitle("Payment");
  const location = useLocation();
  
  const booking = location.state?.booking;

  if (!booking) {
    return <div className="text-center mt-20 text-red-500 font-bold">Error: No booking selected.</div>;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gradient mb-2">Complete Your Payment</h2>
        <p className="text-gray-500">
          You are paying for <strong>{booking.ticketTitle}</strong> ({booking.quantity} Seats)
        </p>
      </div>

      <div className="w-full">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;