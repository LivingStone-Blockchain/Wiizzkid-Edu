import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from 'react-icons/fa';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardBody, Card } from '../../components/Cards';
import CheckoutForm from './CheckoutForm';




type clientSecretDetailsType = {
  clientSecret: string,
  loading: boolean
} 


const Checkout = ({ setOpen }: { setOpen: (value: React.SetStateAction<number | null>) => void }) => {
  const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
  const [clientSecretSettings, setClientSecretSettings] = useState<clientSecretDetailsType>({
    clientSecret: "",
    loading: true,
  });




  useEffect(() => {
    async function createPaymentIntent() {
      const response = await axios.post("/api/create-payment-intent", {});

      setClientSecretSettings({
        clientSecret: response.data.client_secret,
        loading: false,
      });
    }
    createPaymentIntent();
  }, []);



  return (
    <Card>
    <CardBody className='flex flex-col items-center justify-center gap-12 bg-tealLighter relative'>
      <p className='p-2 rounded-full absolute top-2 right-2 bg-[#e9d9de] cursor-pointer' onClick={() => setOpen(null)}><FaTimes className='w-3 h-3 font-light' /></p>
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
    </CardBody>
  </Card>
  )
}

export default Checkout