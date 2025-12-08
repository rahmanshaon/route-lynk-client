import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  // Get Client Secret on Mount
  useEffect(() => {
    if (booking.totalPrice > 0) {
      axiosSecure.post("/create-payment-intent", { price: booking.totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [booking, axiosSecure]);

  // Handle Payment Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      setCardError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
        },
      }
    );

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Save to Database
      const paymentInfo = {
        transactionId: paymentIntent.id,
        bookingId: booking._id,
        ticketId: booking.ticketId,
        price: booking.totalPrice,
        quantity: booking.quantity,
        date: new Date(),
        status: "paid",
        vendorEmail: booking.vendorEmail,
        userEmail: user.email,
        image: booking.image, 
        ticketTitle: booking.ticketTitle
      };

      const res = await axiosSecure.post("/payments", paymentInfo);

      if (res.data.insertResult.insertedId) {
        toast.success(`Payment Successful! Transaction ID: ${paymentIntent.id}`);
        navigate("/dashboard/history"); // Redirect to history
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-primary/20">
      <div className="flex items-center gap-2 mb-6 text-primary">
         <FaLock />
         <h3 className="font-bold text-lg">Secure Payment</h3>
      </div>
      
      <div className="mb-4">
        <label className="text-sm font-bold text-gray-500 mb-2 block uppercase">Card Details</label>
        <div className="p-4 border rounded-lg bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>

      {cardError && <p className="text-red-500 text-sm mb-4 font-bold">{cardError}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-gradient w-full mt-2"
      >
        {processing ? <span className="loading loading-spinner"></span> : `Pay ৳${booking.totalPrice}`}
      </button>
      
      <p className="text-center text-xs text-gray-400 mt-4">
        Powered by Stripe. Your data is encrypted.
      </p>
    </form>
  );
};

export default CheckoutForm;