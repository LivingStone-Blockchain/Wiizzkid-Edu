import {useContext} from 'react'
import { TokenContext, TokenContextType } from '../../../../context/token.context';
import  {CardBody, Card}  from '../Cards';
import Button from '../../../Button';
import { X } from 'lucide-react';
import { utils } from "ethers";






const PayWithEth = ({setOpen}: {setOpen: (value: React.SetStateAction<number| null>) => void}) => {

  const { 
    loading,
    stBalance,
    tokenAmount,
    setTokenAmount,
    ethBalance,
    tokensMinted,
    isOwner,
    withdrawCoins, 
    mintStoneToken, 
  } = useContext(TokenContext) as TokenContextType;






  const render = () =>{
    return (
      <div className='flex flex-col gap-4 justify-center items-center mt-7 mb-10 w-full'>
        <input
          type="Number"
          min="0" max="10000" step="0.01"
          placeholder="Stone..."
          value={tokenAmount}
          // BigNumber.from converts the `e.target.value` to a BigNumber
          onChange={(e) => setTokenAmount(Number(e.target.value))}
          className="flex-initial sm:w-64 w-48 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
        />
    
      <Button 
        type='button'
        onClick={() => mintStoneToken(tokenAmount)}
        className={`flex-initial sm:w-64 w-48 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3 ${loading ? "cursor-not-allowed bg-[#37385e]" : "cursor-pointer bg-navy"}`}
      >
         {loading && (<svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>)}
            <span className={`relative md:text-base text-sm font-semibold ${loading ? " text-gray-200" : " text-white"}`}>{loading ? "Processing" : "Mint Tokens"}</span>
      </Button>  
      </div>
    )
  }




  
  return (
        <Card>
          <CardBody className='flex flex-col items-center justify-center gap-12 bg-tomatoLighter relative'>
          <p className='p-2 rounded-full absolute top-2 right-2 bg-[#e9d9de] cursor-pointer' onClick={() => setOpen(null)}><X  className='w-3 h-3 font-light'/></p>
          <div className='flex  flex-col justify-center items-center gap-2 w-full'>
              <p className="text-lg font-medium text-navy text-center">You have {Number(utils.formatEther(ethBalance)).toFixed(4)} ETH</p>
              <p className="text-sm font-normal text-gray-600">You have {Number(utils.formatEther(stBalance)).toFixed(2)} Stone Tokens</p>
              <p className="mb-2 text-sm font-normal text-gray-600 hidden">  Overall {utils.formatEther(tokensMinted)}/500,000 have been minted</p>
              {render()}
              <p className="text-xs font-normal text-gray-600"><span className='text-tomato text-sm'>*</span> Enter number of Stone tokens</p>
          </div> 

          {isOwner ? (
              <div>
                  {loading ? <button   className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'>Loading...</button> : 
                  
                   <Button 
                   children='Withdraw Coins'
                   type='button'
                   onClick={withdrawCoins}
                   className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
                       />  
                  }
              </div> ) : ("")
          }
     
        </CardBody>
      </Card>
  )

  
};



export default PayWithEth;