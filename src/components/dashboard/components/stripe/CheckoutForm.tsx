import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Button from '../../../Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = () => {
  const [message, setMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();


  useEffect(() => {
    message && toast.error(<span className="text-sm">{message}</span>, { duration: 5000, id: 'error' });
    setTimeout(() => {
      toast.dismiss("error");
    }, 5000)
  }, [message])

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 

    if (!stripe || !elements) {
      return;
    }


    setIsProcessing(true);

    const {error, paymentIntent} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/buy-token/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message!);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      navigate('/dashboard-home');
      toast.success(<span className="text-sm">Payment Successful! 🎉</span>, { duration: 5000, id: 'success' })
      setTimeout(() => {
        toast.dismiss('success');
      }, 5000);
    } else {
      setMessage("unexpected state");
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
    </form>
  );
};

export default CheckoutForm;



