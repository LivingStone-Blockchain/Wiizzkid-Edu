import React from 'react'
import  { CardBody, Card }  from '../components/Cards';
import { FaTimes } from 'react-icons/fa';
import Button from '../../Button';

const Coingate = ({setOpen}: {setOpen: (value: React.SetStateAction<number | null>) => void}) => {
  return (
    <Card>
    <CardBody className='flex flex-col items-center justify-center gap-12 bg-tealLighter relative'>
    <p className='p-2 rounded-full absolute top-2 right-2 bg-[#e9d9de] cursor-pointer' onClick={() => setOpen(null)}><FaTimes  className='w-3 h-3 font-light'/></p>
    <div className="flex flex-row gap-2 items-center justify-center mt-3 w-full mx-auto">
      <Button 
          children=<a href="https://pay-sandbox.coingate.com/pay/wiizzkid" rel="noopener noreferrer nofollow" target="_blank"><img alt="CoinGate Payment Button" src="https://assets.coingate.com/images/buttons/4.png" /></a>
          type='button'
          onClick={() => console.log("coingate")}
          className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
      /> 
      </div>
    </CardBody>
    </Card>
  )
}

export default Coingate;
