import React from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ bookingId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?bookingId=${bookingId}`,
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
    } else {
      console.log("Payment successful!", paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded bg-gray-100">
      <h3 className="text-lg font-semibold">Payment</h3>
      <p><strong>Booking ID:</strong> {bookingId}</p>
      <p><strong>Total Fee:</strong> ₹{amount}</p>

      <PaymentElement />
      
      <button 
        type="submit" 
        className="bg-purple-500 text-white px-4 py-2 rounded w-full mt-4"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
