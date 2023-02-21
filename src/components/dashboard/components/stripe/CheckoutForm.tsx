import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Button from '../../../Button';


const CheckoutForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const stripe = useStripe();
  const elements = useElements();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:4242/success.html',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message!);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
          children="Submit"
          type='button'
          disabled={!stripe}
          className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
        />
        {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;



