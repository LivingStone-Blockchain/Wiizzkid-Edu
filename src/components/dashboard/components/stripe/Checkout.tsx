import React, { FC } from 'react'
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';
import { stripeService } from '../../../../services';




type clientSecretDetailsType = {
  clientSecret: string,
  loading: boolean
} 


type CheckoutPropType = {
  amount: number
}

//put out to avoid recreating stripe onto avoid recreating the Stripe object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Checkout:FC<CheckoutPropType> = ({amount}) => {
  const [clientSecretSettings, setClientSecretSettings] = useState<clientSecretDetailsType>({
    clientSecret: "",
    loading: true,
  });


  const payload = {
    amount: amount
  }

  useEffect(() => {
    async function createPaymentIntent() {
     const response = await stripeService.stripe(payload)

      setClientSecretSettings({
        clientSecret: response.client_secret, //ask for variable
        loading: false,
      });
    }
    createPaymentIntent();
  }, []);






  return (
      <div className="flex flex-row gap-2 items-center justify-center mt-3 w-full mx-auto">
        {!clientSecretSettings.loading ? (
          <h1>Loading ...</h1>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecretSettings.clientSecret,
              appearance: { theme: "stripe" },
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
  )
}

export default Checkout