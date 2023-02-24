import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Button from '../../../Button';


const CheckoutForm = () => {
  const [message, setMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 

    if (!stripe || !elements) {
      return;
    }


    setIsProcessing(true);

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/buy-token/completion`,
      },
    });

    if (error) {
      setMessage(error.message!);
    } 

    setIsProcessing(false);
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 lg:w-1/2 md:w-[70%] w-[90%]">
      <PaymentElement />
      <Button
          type='submit'
          disabled={isProcessing}
          className='flex-initial md:w-36 w-28 text-white sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
        >
        {isProcessing ? "Processing" : "Pay now"}  
        </Button>
        {message && <div className='text-sm text-tomato'>{message}</div>}
    </form>
  );
};

export default CheckoutForm;



