import { PaymentElement } from "@stripe/react-stripe-js";
import Button from '../../../Button';


const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <Button
          children="Submit"
          type='button'
          onClick={() => console.log("coingate")}
          className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
        />
    </form>
  );
};

export default CheckoutForm;