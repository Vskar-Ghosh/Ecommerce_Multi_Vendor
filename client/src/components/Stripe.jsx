import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import axios from "axios";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { base_url } from "../utils/config";

const stripePromise = loadStripe(
  "pk_test_51Oi0LzCa4wilIjAOD9Dr5ddoWcZIOzE3svkhO2sSPcTQrZ86a7l4VDYS0dSsNhnE9wibqJ1tv5ZywAJFxb1X97tA008TcfKuPh"
);

const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState();
  const apperance = {
    theme: "stripe",
  };

  const options = {
    apperance,
    clientSecret,
  };

  const create_payment = async () => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/order/create-payment`,
        { price },
        {
          withCredentials: true,
        }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className=" mt-4">
      {clientSecret ? (
        <div>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm orderId={orderId} />
          </Elements>
        </div>
      ) : (
        <button
          onClick={create_payment}
          className=" px-10 py-2 rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
        >
          Start Payment
        </button>
      )}
    </div>
  );
};

export default Stripe;
