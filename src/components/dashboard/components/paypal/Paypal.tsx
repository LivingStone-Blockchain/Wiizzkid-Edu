import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import  { CardBody, Card }  from '../../components/Cards';
import Button from '../../../Button';
import { X } from 'lucide-react';
import PaypalSDK from "./PaypalSDK";
import { useNavigate } from "react-router-dom";



const Paypal = ({setOpen}: {setOpen: (value: React.SetStateAction<number | null>) => void}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [amount, setAmount] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (success) {
            setAmount('');
            setShowInput(true);
            navigate('/dashboard-home');
        }
    }, [success])




    const handlePayment = () => {
        if (!amount) {
            return toast.error("Input cannot be empty")
        }

        setShowInput(false);

        setTimeout(() => {
            setIsLoading(false)
        },2000)
}






  return (
    <Card>
    <CardBody className='flex flex-col items-center justify-center gap-12 bg-tealLighter relative'>
    <p className='p-2 rounded-full absolute top-2 right-2 bg-[#e9d9de] cursor-pointer' onClick={() => setOpen(null)}><X  className='w-3 h-3 font-light'/></p>
    <div className="flex flex-col md:gap-6 gap-4 items-center justify-center mt-3 w-full mx-auto">
          <h1 className="mb-4 text-xl font-semibold text-[#252641]">Pay with Paypal</h1>
          <div className="space-y-1 flex flex-col gap-4">
            {showInput ? ( 
                <>
                    <label className='text-[#252641] text-sm'>Amount</label>
                    <input
                        type="text"
                        placeholder="Enter Amount"
                        value={amount}
                        name="amount"
                        onChange={({ target }) => setAmount(target.value)}
                        autoComplete="amount"
                        required
                        className="text-sm focus:outline-none block w-full h-11 rounded-full bg-gray-50 border-2 border-navy bg-transparent px-4 py-2 text-gray-600 transition duration-300 focus:ring-2 focus:ring-[#96fde3]"
                    />

                    <Button 
                        children='Submit'
                        type='button'
                        onClick={handlePayment}
                        className='flex-initial w-full text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-navy'
                    />
                </>
            ) : (
               <PaypalSDK 
                amount={amount}
                isLoading={isLoading}
                setSuccess={setSuccess}
               />
            )}
            <div>
            </div> 
        </div> 
    </div> 
</CardBody>
</Card>
  )
}

export default Paypal