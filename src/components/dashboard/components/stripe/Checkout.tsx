import React, { FC } from 'react'
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';
import { stripeService } from '../../../../services';
import Preloader from "../../../Preloader";



type clientSecretDetailsType = {
  clientSecret: string,
  loading: boolean
} 


type CheckoutPropType = {
  amount: number
}



const Checkout:FC<CheckoutPropType> = ({amount}) => {
  const [stripePromise, setStripPromise] = useState<any>(null);
  const [clientSecretSettings, setClientSecretSettings] = useState<clientSecretDetailsType>({
    clientSecret: "",
    loading: false,
  });


  const payload = {
    amount,
  }


        
 useEffect(() => {
  const fetchPublishableKey = async () => {
   const response =  await stripeService.stripePublishableKey().then(res => res.publishable_key);

   setStripPromise(loadStripe(response));
  }
  
  fetchPublishableKey();
}, [])


  useEffect(() => {
    const createPaymentIntent = async () => {
     const response = await stripeService.stripeClient(payload).then(res => res.clientSecret)
     setClientSecretSettings({
      clientSecret: response,
      loading: true,
    });
  }

   
    createPaymentIntent();
  }, []);

  //4242 4242 4242 4242
  //04 24
  //424


  return (
      <div className="flex flex-row gap-2 items-center justify-center mt-3 w-full mx-auto">
        {!clientSecretSettings.loading ? (
            <Preloader dashboardLoader={true} />
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