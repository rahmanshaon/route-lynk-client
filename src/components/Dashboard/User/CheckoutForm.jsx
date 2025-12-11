import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaLock, FaExclamationTriangle } from "react-icons/fa";
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
  const [isAmountValid, setIsAmountValid] = useState(true);

  // Get Client Secret on Mount
  useEffect(() => {
    // Client-Side Validation
    if (!booking?.totalPrice || booking.totalPrice < 1) {
      setCardError("Invalid ticket price.");
      setIsAmountValid(false);
      return;
    }

    // Stripe Minimum Requirement (~$0.50 USD which is approx 60 BDT)
    if (booking.totalPrice < 60) {
      setCardError("Minimum payment amount is 60 BDT.");
      setIsAmountValid(false);
      return;
    }

    axiosSecure
      .post("/create-payment-intent", { price: booking.totalPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setCardError("");
      })
      .catch((err) => {
        console.error("Payment Intent Error:", err);
        // Handle 400 Bad Request
        const errorMsg =
          err.response?.data?.message ||
          "Payment system is temporarily unavailable.";
        setCardError(errorMsg);
        setIsAmountValid(false);
      });
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
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
        },
      });

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
        ticketTitle: booking.ticketTitle,
      };

      try {
        const res = await axiosSecure.post("/payments", paymentInfo);
        if (res.data.insertResult.insertedId) {
          toast.success(
            `Payment Successful! Transaction ID: ${paymentIntent.id}`
          );
          navigate("/dashboard/history", {
            state: { transactionId: paymentIntent.id, autoDownload: true },
          });
        }
      } catch (err) {
        toast.error(
          "Payment successful but failed to update database. Contact support."
        );
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 bg-base-100 rounded-2xl shadow-xl border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-6 text-primary">
        <FaLock />
        <h3 className="font-bold text-lg">Secure Payment</h3>
      </div>

      {/* Show Error Warning if amount is invalid */}
      {!isAmountValid ? (
        <div className="alert alert-warning text-sm mb-4">
          <FaExclamationTriangle />
          <span>{cardError || "Payment unavailable for this ticket."}</span>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="text-sm font-bold text-base-content/60 mb-2 block uppercase">
              Card Details
            </label>
            <div className="p-4 border border-base-300 rounded-lg bg-base-200/50">
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

          {/* General Card Errors */}
          {cardError && (
            <div className="alert alert-error text-white text-sm mb-4 py-2 rounded-lg">
              <span>{cardError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="btn btn-primary w-full mt-2 text-white font-bold"
          >
            {processing ? (
              <span className="loading loading-spinner"></span>
            ) : (
              `Pay ৳${booking.totalPrice}`
            )}
          </button>
        </>
      )}

      <p className="text-center text-xs text-base-content/40 mt-4">
        Powered by Stripe. Your data is encrypted.
      </p>
    </form>
  );
};

export default CheckoutForm;
