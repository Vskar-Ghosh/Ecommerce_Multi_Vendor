import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { mode } from "../utils/config";

const CheckoutForm = ({ orderId }) => {
  localStorage.setItem("orderId", orderId);
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pyamentElementOptions = {
    layout: "tabs",
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          mode === "dev"
            ? "http://localhost:3000/order/confirm"
            : "https://my-shop-tan.vercel.app/order/confirm",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred");
    }
    setIsLoading(false);
  };
  return (
    <form onSubmit={submit} id="payment-form">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={pyamentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className=" px-10 py-2 rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
      >
        <span id="button-text">
          {isLoading ? <div>Loading...</div> : "Pay now"}
        </span>
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
