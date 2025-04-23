import React, { useEffect, useState } from 'react';
import Checkout from './Checkout';
import { CardBody, Card } from '../../components/Cards';
import { X } from 'lucide-react';
import Button from '../../../Button';



const Stripe = ({ setOpen }: { setOpen: (value: React.SetStateAction<number | null>) => void }) => {
    const [amount, setAmount] = useState<number>(0);
    const [checkout, setCheckout] = useState(false);



    
const render = () =>{
    return (
      <div className='flex flex-col gap-4 justify-center items-center mt-7 mb-10 w-full'>
        <h1 className="mb-4 text-xl font-semibold text-[#252641]">Pay with Stripe</h1>
        <label className='text-[#252641] text-sm sm:-ml-48 -ml-32'>Amount</label>
        <input
          type="Number"
          placeholder="Amount..."
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="flex-initial sm:w-64 w-48 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
        />
    
      <Button 
        type='button'
        onClick={() => setCheckout(true)}
        className={`flex-initial sm:w-64 w-48 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3 cursor-pointer bg-navy`}
      >
        Submit
      </Button>  
      </div>
    )
  }

  return (
    <Card>
        <CardBody className='flex flex-col items-center justify-center gap-12 bg-goldenLighter relative'>
            <p className='p-2 rounded-full absolute top-2 right-2 bg-[#e9d9de] cursor-pointer' onClick={() => setOpen(null)}><X className='w-3 h-3 font-light' /></p>
            {checkout ? (    
                <Checkout amount={amount}/>
            ) : (
                render()
            )}
      </CardBody>
  </Card>
  )
}

export default Stripe;