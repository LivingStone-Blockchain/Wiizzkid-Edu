//import {useContext, useState, useEffect} from 'react'
//import { TokenContext, TokenContextType } from '../../../../context/token.context';
import  {CardBody, Card}  from '../../components/Cards';
import Button from '../../../Button';
import { FaTimes } from 'react-icons/fa';
//import { BigNumber, utils } from "ethers";

/*import {
  calculateST,
} from "./DEX-components/addLiquidity";
*/
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react"
import { BigNumber, providers, utils, } from "ethers";
import { useProvider , useSigner, useConnect, useAccount, useContract} from 'wagmi'
import{goerli} from "wagmi/chains"
import { addLiquidity, calculateST } from "../../components/exchange/DEX-components/addLiquidity";
import { getSTBalance, getEtherBalance, getLPTokensBalance, getReserveOfST } from  "../../components/exchange/DEX-components/getAmounts";
import { getTokensAfterRemove, removeLiquidity } from  "../../components/exchange/DEX-components/removeLiquidity";
import { swapTokens, getAmountOfTokensReceivedFromSwap } from  "../../components/exchange/DEX-components/swap";







const Exchange = ({setOpen}: {setOpen: (value: React.SetStateAction<number| null>) => void}) => {
  const [liquidityTab, setLiquidityTab] = useState(false); 
  //const { isConnected, getAmounts, zero, _getAmountOfTokensReceivedFromSwap, _swapTokens, _getTokensAfterRemove, _addLiquidity, _removeLiquidity, stBalance, ethBalance, lpBalance, reservedST, addEther, setAddEther, setAddSTTokens, etherBalanceContract, addSTTokens, removeST, removeEther, setRemoveLPTokens,   swapAmount, setSwapAmount, ethSelected, setEthSelected, tokenToBeReceivedAfterSwap} = useContext(TokenContext) as TokenContextType;
  const [tokenSelected, setTokenSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);




  const { connector: isConnected, address} = useAccount();
  const { data: signer } = useSigner({chainId:goerli.id});
  const provider = useProvider();


  const zero = BigNumber.from(0);
    /** Variables to keep track of amount */
  // `ethBalance` keeps track of the amount of Eth held by the user's account
  const [ethBalance, setEtherBalance] = useState(zero);
  // `reservedST` keeps track of the Stone tokens Reserve balance in the Exchange contract
  const [reservedST, setReservedST] = useState(zero);
  // Keeps track of the ether balance in the contract
  const [etherBalanceContract, setEtherBalanceContract] = useState(zero);
  // stBalance is the amount of `ST` tokens help by the users account
  const [stBalance, setSTBalance] = useState(zero);
  // `lpBalance` is the amount of LP tokens held by the users account
  const [lpBalance, setLPBalance] = useState(zero);
  /** Variables to keep track of liquidity to be added or removed */
  // addEther is the amount of Ether that the user wants to add to the liquidity
  const [addEther, setAddEther] = useState(zero);
  // addSTTokens keeps track of the amount of ST tokens that the user wants to add to the liquidity
  // in case when there is no initial liquidity and after liquidity gets added it keeps track of the
  // ST tokens that the user can add given a certain amount of ether
  const [addSTTokens, setAddSTTokens] = useState(zero);
  // removeEther is the amount of `Ether` that would be sent back to the user based on a certain number of `LP` tokens
  const [removeEther, setRemoveEther] = useState(zero);
  // removeST is the amount of Stone tokens that would be sent back to the user based on a certain number of `LP` tokens
  // that he wants to withdraw
  const [removeST, setRemoveST] = useState(zero);
  // amount of LP tokens that the user wants to remove from liquidity
  const [removeLPTokens, setRemoveLPTokens] = useState("0");
  /** Variables to keep track of swap functionality */
  // Amount that the user wants to swap
  const [swapAmount, setSwapAmount] = useState("");
  // This keeps track of the number of tokens that the user would receive after a swap completes
  const [tokenToBeReceivedAfterSwap, settokenToBeReceivedAfterSwap] = useState(zero);
  // Keeps track of whether  `Eth` or `Stone` token is selected. If `Eth` is selected it means that the user
  // wants to swap some `Eth` for some `Stone` tokens and vice versa if `Eth` is not selected
  const [ethSelected, setEthSelected] = useState(true);
  const navigate = useNavigate();




  const getAmounts = async () => {
    try {
      
      // const provider = await getProviderOrSigner(false);
      // const signer = await getProviderOrSigner(true);
      // const address = await signer.getAddress();

      // console.log(address);
      // get the amount of eth in the user's account
      const _ethBalance = await getEtherBalance(provider, address);
      // console.log(_ethBalance)
      // const _ethBalance = await getUserETH(provider, address);
      // get the amount of `Stone` tokens held by the user
      const _stBalance = await getSTBalance(provider, address);
      // get the amount of `Stone` LP tokens held by the user
      const _lpBalance = await getLPTokensBalance(provider, address);
      // gets the amount of `ST` tokens that are present in the reserve of the `Exchange contract`
      const _reservedST = await getReserveOfST(provider);
      // Get the ether reserves in the contract
      // const _ethBalanceContract = await getContractETH(provider);
      const _ethBalanceContract = await getEtherBalance(provider, null, true);
      setEtherBalance(_ethBalance);
      setSTBalance(_stBalance);
      setLPBalance(_lpBalance);
      setReservedST(_reservedST);
      setEtherBalanceContract(_ethBalanceContract);
    } catch (err) {
      console.error(err);
    }
  };

  const _swapTokens = async () => {
    setLoading(true);

    if (swapAmount === "") {
      return toast.error('Input cannot be empty!', {duration:4000});
   }

   if(typeof Number(swapAmount) !== "number") {
    return toast.error('invalid input!', {duration:4000});
   }

   if (Number(swapAmount) === 0 || ethSelected && Number(swapAmount) > Number(utils.formatEther(ethBalance)) || !ethSelected && Number(swapAmount) > Number(utils.formatEther(stBalance)) ) {
       return toast.error('Insufficient funds!', {duration:4000});
   }


    try {
      // Convert the amount entered by the user to a BigNumber using the `parseEther` library from `ethers.js`
      const swapAmountWei = utils.parseEther(swapAmount);
      
      // Check if the user entered zero
      // We are here using the `eq` method from BigNumber class in `ethers.js`
      if (!swapAmountWei.eq(zero)) {
        // Call the swapTokens function from the `utils` folder
        await swapTokens(
          signer,
          swapAmountWei,
          tokenToBeReceivedAfterSwap,
          ethSelected
        );
        // Get all the updated amounts after the swap
        await getAmounts();
        setLoading(false);
        console.log("correct")
        toast.success('Swap successful', {duration: 5000})
        setTimeout(() => {
            navigate('/dashboard-home');
            setSwapAmount("");
        }, 3000)
      }
    } catch (err) {
      console.error(err);
      setSwapAmount("");
    }
  };

  const _getAmountOfTokensReceivedFromSwap = async (_swapAmount:number) => {
    try {
      // Convert the amount entered by the user to a BigNumber using the `parseEther` library from `ethers.js`
      const _swapAmountWEI = utils.parseEther(_swapAmount.toString());
      // Check if the user entered zero
      // We are here using the `eq` method from BigNumber class in `ethers.js`
      if (!_swapAmountWEI.eq(zero)) {
        // Get the amount of ether in the contract
        const _ethBalance = await getEtherBalance(provider, null, true);
        // Call the `getAmountOfTokensReceivedFromSwap` from the utils folder
        const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
          _swapAmountWEI,
          provider,
          ethSelected,
          _ethBalance,
          reservedST
        );
        settokenToBeReceivedAfterSwap(amountOfTokens);
      } else {
        settokenToBeReceivedAfterSwap(zero);
      }
    } catch (err) {
      console.error(err);
    }
  };

    /**
   * _addLiquidity helps add liquidity to the exchange,
   * If the user is adding initial liquidity, user decides the ether and CD tokens he wants to add
   * to the exchange. If he is adding the liquidity after the initial liquidity has already been added
   * then we calculate the stone tokens he can add, given the Eth he wants to add by keeping the ratios
   * constant
   */
     const _addLiquidity = async () => {
      try {
        // Convert the ether amount entered by the user to Bignumber
        const addEtherWei = utils.parseEther(addEther.toString());
        console.log("parsing")
        // Check if the values are zero
        if (!addSTTokens.eq(zero) && !addEtherWei.eq(zero)) {
          // call the addLiquidity function from the components folder
          await addLiquidity(signer, addSTTokens, addEtherWei);
          console.log("awaiting add liquidity...")
          // Reinitialize the ST tokens
          setAddSTTokens(zero);
          console.log("st set")
          // Get amounts for all values after the liquidity has been added
          await getAmounts();
        } else {
          setAddSTTokens(zero);
        }
      } catch (err) {
        console.error(err);
        setAddSTTokens(zero);
      }
    };

    const _removeLiquidity = async () => {
      try {
        // Convert the LP tokens entered by the user to a BigNumber
        const removeLPTokensWei = utils.parseEther(removeLPTokens);
        // Call the removeLiquidity function from the `utils` folder
        await removeLiquidity(signer, removeLPTokensWei);
        await getAmounts();
        setRemoveST(zero);
        setRemoveEther(zero);
      } catch (err) {
        console.error(err);
        setRemoveST(zero);
        setRemoveEther(zero);
      }
    };

      /**
   * _getTokensAfterRemove: Calculates the amount of `Ether` and `ST` tokens
   * that would be returned back to user after he removes `removeLPTokenWei` amount
   * of LP tokens from the contract
   */
  const _getTokensAfterRemove = async (_removeLPTokens:any) => {
    try {
      // Convert the LP tokens entered by the user to a BigNumber
      const removeLPTokenWei = utils.parseEther(_removeLPTokens);
      // Get the Eth reserves within the exchange contract
      const _ethBalance = await getEtherBalance(provider, null, true);
      // get the stone token reserves from the contract
      const stoneTokenReserve = await getReserveOfST(provider);
      // call the getTokensAfterRemove from the utils folder
      const { _removeEther, _removeST }: any | undefined = await getTokensAfterRemove(
        provider,
        removeLPTokenWei,
        _ethBalance,
        stoneTokenReserve
      );
      setRemoveEther(_removeEther);
      setRemoveST(_removeST);
    } catch (err) {
      console.error(err);
    }
  };

 
  useEffect(() => {
    if (isConnected) {
      getAmounts();
    }
  }, [isConnected]);




  const render = () =>{
    if(liquidityTab){
      return(
        <>
          <div className='flex  flex-col justify-center items-center gap-2 w-full'>
              <p className="text-lg font-medium text-navy text-center">You have {Number(utils.formatEther(stBalance)).toFixed(4)} Stone Tokens</p>
              <p className="text-sm font-normal text-gray-600">You have {Number(utils.formatEther(ethBalance)).toFixed(4)} Ether</p>
              <p className="mb-2 text-sm font-normal text-gray-600 hidden">You have {utils.formatEther(lpBalance)} Stone LP Tokens</p>
          </div>

          <div>
            {/* If reserved ST is zero, render the state for liquidity zero where we ask the user
            how much initial liquidity he wants to add else just render the state where liquidity is not zero and
            we calculate based on the `Eth` amount specified by the user how much `ST` tokens can be added */}
            {utils.parseEther(reservedST.toString()).eq(zero) ? (
                <div className='flex flex-col gap-5 justify-center items-center my-7 w-full'>
                <div className='flex flex-col md:flex-row gap-3 justify-center md:justify-start items-center w-full'>
                <input
                  type="number"
                  placeholder="Amount of Ether"
                  onChange={(e) => setAddEther(BigNumber.from(
                    utils.parseEther(e.target.value || "0")
                  ))}
                  className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
                />
                <input
                  type="number"
                  placeholder="Amount of Stone tokens"
                  onChange={(e) =>
                    setAddSTTokens(
                      BigNumber.from(utils.parseEther(e.target.value || "0"))
                    )
                  }
                  className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
                />
                </div>
                <Button 
                children='Add'
                type='button'
                onClick={_addLiquidity}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            /> 
              </div>
            ) : (
              <div  className='flex flex-col gap-3 justify-center items-center mt-7 mb-10 w-full'>
                <input
                  type="number"
                  placeholder="Amount of Ether"
                  onChange={async (e) => {
                    console.log(e.target.value)
                    setAddEther(BigNumber.from(
                      utils.parseEther(e.target.value || "0")
                    ));
                    // calculate the number of ST tokens that
                    // can be added given  `e.target.value` amount of Eth
                    const _addSTTokens = await calculateST(
                      e.target.value || "0",
                      Number(etherBalanceContract),
                      Number(reservedST)
                    );
                    setAddSTTokens(_addSTTokens);
                  }}
                  className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
                />
                
                <p className="text-sm font-normal text-gray-600">
                {`You will need ${utils.formatEther(addSTTokens)} Stone Tokens`}
              </p>

              <Button 
                children='Add'
                type='button'
                onClick={_addLiquidity}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            />  
            </div>
            )}

            {/* REMOVE LIQUIDITY */}


            <div className='flex  flex-col justify-center items-center gap-2 w-full mb-3'>
              <input
                type="number"
                placeholder="Amount of LP Tokens"
                onChange={async (e) => {
                  setRemoveLPTokens(e.target.value || "0");
                  // Calculate the amount of Ether and ST tokens that the user would receive
                  // After he removes `e.target.value` amount of `LP` tokens
                  await _getTokensAfterRemove(e.target.value || "0");
                }}
                className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
              />
               <p className="mb-2 text-sm font-normal text-gray-600">
              {`You will get ${utils.formatEther(removeST)} Stone
            Tokens and ${utils.formatEther(removeEther)} Eth`}
            </p>
            <Button 
                children='Remove'
                type='button'
                onClick={_removeLiquidity}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            /> 
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
           <div className='flex  flex-col justify-center items-center gap-2 w-full'>
              <p className="text-lg font-medium text-navy text-center"> {Number(utils.formatEther(reservedST)).toFixed(4)} Stone Tokens Available</p>
              <p className="mb-2 text-sm font-normal text-gray-600 hidden"> {utils.formatEther(etherBalanceContract)} Ether in the Contract</p>
          </div>
          <div className='flex flex-col md:flex-row gap-3 justify-center md:justify-start items-center my-7 w-full'>
            <input
              type="number"
              placeholder="Amount"
              onChange={async (e) => {
                setSwapAmount(e.target.value || "");
                // Calculate the amount of tokens user would receive after the swap
                await _getAmountOfTokensReceivedFromSwap(Number(e.target.value || "0"));
              }}
              className="flex-initial md:w-72 w-64 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
              value={swapAmount}
            />
            <label>
            <select
              value={tokenSelected}
              className='bg-navy bg-opacity-10 flex-initial w-full text-navy mx-auto sm:mx-0 font-lg px-5 py-3 text-sm rounded-sm'
              onChange={async (e) => {
                setTokenSelected(e.target.value)
                setEthSelected(!ethSelected);
                // Initialize the values back to zero
                await _getAmountOfTokensReceivedFromSwap(0);
                setSwapAmount("");
              }}
            >
              <option className="text-sm font-normal text-gray-600" value="eth">Ethereum</option>
              <option className="text-sm font-normal text-gray-600" value="stoneToken">Stone Token</option>
            </select>
          </label>
          </div>
          <div className='flex  flex-col justify-center items-center gap-2 w-full mb-3'>
              <p className="mb-2 text-sm font-normal text-gray-600">

                {ethSelected
                  ? `You will get ${Number(utils.formatEther(
                      tokenToBeReceivedAfterSwap
                  )).toFixed(6)} Stone Tokens`
                  : `You will get ${Number(utils.formatEther(
                      tokenToBeReceivedAfterSwap
                    )).toFixed(6)} Eth`}
              </p>
              <Button 
                type='button'
                onClick={_swapTokens}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            >
              {loading && (<svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>)}
            <span className={`relative md:text-base text-s font-semibold ${loading ? " text-gray-200" : " text-white"}`}>{loading ? "Processing" : "Swap"}</span>
          </Button>  
          </div>
        </>
      )
    }
  }


  
  return (
    <Card>
      <CardBody className='flex flex-col items-center justify-center gap-12 bg-tomatoLighter relative'>
      <p className='p-2 rounded-full absolute top-2 right-2 bg-[#e9d9de] cursor-pointer' onClick={() => setOpen(null)}><FaTimes  className='w-3 h-3 font-light'/></p>
      <div className="flex flex-row gap-2 items-center justify-center mt-3 w-full mx-auto">
        <Button 
            children='Swap'
            type='button'
            onClick={() => {
              setLiquidityTab(false);
            }}
            className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
        />              
        <Button 
            children='Liquidity'
            type='button'
            onClick={() => {
              setLiquidityTab(true);
            }}
            className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
        />
      </div>
      <div className="text-center">{render()}</div>
    </CardBody>
  </Card>
)


  
};



export default Exchange;







/*
 
  useEffect(() => {
    if (isConnected) {
      getAmounts();
    }
  }, [isConnected]);





const Render = () => {
  if (liquidityTab) {
    return (
      <>
         <div className='flex  flex-col justify-center items-center gap-2 w-full'>
              <p className="text-lg font-medium text-navy text-center">You have {Number(utils.formatEther(stBalance)).toFixed(4)} Stone Tokens</p>
              <p className="text-sm font-normal text-gray-600">You have {Number(utils.formatEther(ethBalance)).toFixed(4)} Ether</p>
              <p className="mb-2 text-sm font-normal text-gray-600 hidden">You have {utils.formatEther(lpBalance)} Stone LP Tokens</p>
          </div>


       <div>
          {utils.parseEther(reservedST.toString()).eq(zero) ? (
            <div className='flex flex-col gap-5 justify-center items-center my-7 w-full'>
              <div className='flex flex-col md:flex-row gap-3 justify-center md:justify-start items-center w-full'>
            <input
               type="number"
               placeholder="Amount of Ether"
               onChange={(e) => setAddEther(BigNumber.from(
                 utils.parseEther(e.target.value || "0")
               ))}
              className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
            />
             <input
                type="number"
                placeholder="Amount of Stone tokens"
                onChange={(e) =>
                  setAddSTTokens(
                    BigNumber.from(
                      utils.parseEther(e.target.value || "0")
                    )
                  )}
              className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
            />
            </div>
            <Button 
                children='Add'
                type='button'
                onClick={_addLiquidity}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            /> 
            </div>
          ) : (
            <div className='flex flex-col gap-3 justify-center items-center mt-7 mb-10 w-full'>
              <input
                type="number"
                placeholder="Amount of Ether"
                onChange={async (e) => {
                  console.log(e.target.value)
                  setAddEther(BigNumber.from(
                    utils.parseEther(e.target.value || "0")
                  ));
                  // calculate the number of ST tokens that
                  // can be added given  `e.target.value` amount of Eth
                  const _addSTTokens = await calculateST(
                    e.target.value || "0",
                    Number(etherBalanceContract),
                    Number(reservedST)
                  );
                  setAddSTTokens(_addSTTokens);
                }}
                className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
              />


              <p className="text-sm font-normal text-gray-600">
                {`You will need ${utils.formatEther(addSTTokens)} Stone Tokens`}
              </p>

              <Button 
                children='Add'
                type='button'
                onClick={_addLiquidity}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            />  
            </div>
          )}


          <div className='flex  flex-col justify-center items-center gap-2 w-full mb-3'>
            <input
              type="number"
              placeholder="Amount of LP Tokens"
              onChange={async (e) => {
                setRemoveLPTokens(e.target.value || "0");
                // Calculate the amount of Ether and ST tokens that the user would receive
                // After he removes `e.target.value` amount of `LP` tokens
                await _getTokensAfterRemove(e.target.value || "0");
              }}
              className="flex-initial w-54 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
            />
            <p className="mb-2 text-sm font-normal text-gray-600">
              {`You will get ${utils.formatEther(removeST)} Stone
            Tokens and ${utils.formatEther(removeEther)} Eth`}
            </p>
            <Button 
                children='Remove'
                type='button'
                onClick={_removeLiquidity}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            /> 
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='flex  flex-col justify-center items-center gap-2 w-full'>
              <p className="text-lg font-medium text-navy text-center"> {Number(utils.formatEther(reservedST)).toFixed(4)} Stone Tokens Available</p>
              <p className="mb-2 text-sm font-normal text-gray-600 hidden"> {utils.formatEther(etherBalanceContract)} Ether in the Contract</p>
          </div>
         
        <div className='flex flex-col md:flex-row gap-3 justify-center md:justify-start items-center my-7 w-full'>
          <input
            type="number"
            placeholder="Amount"
            min="0" max="10000" step="0.01"
            onChange={async (e) => {
              setSwapAmount(e.target.value || "");
              // Calculate the amount of tokens user would receive after the swap
              await _getAmountOfTokensReceivedFromSwap(
                Number(e.target.value || "0")
              );
            }}
            className="flex-initial md:w-72 w-64 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-navy rounded-full"
            value={swapAmount}
          />
           <label>
            <select
              value={tokenSelected}
              className='bg-navy bg-opacity-10 flex-initial w-36 text-navy mx-auto sm:mx-0 font-lg px-5 py-3 text-sm rounded-sm'
              onChange={async (e) => {
                setTokenSelected(e.target.value)
                setEthSelected(!ethSelected);
                // Initialize the values back to zero
                await _getAmountOfTokensReceivedFromSwap(0);
                setSwapAmount("");
              }}
            >
              <option className="text-sm font-normal text-gray-600" value="eth">Ethereum</option>
              <option className="text-sm font-normal text-gray-600" value="stoneToken">Stone Token</option>
            </select>
          </label>
        </div>
        
        <div className='flex  flex-col justify-center items-center gap-2 w-full mb-3'>
              <p className="mb-2 text-sm font-normal text-gray-600">

                {ethSelected
                  ? `You will get ${Number(utils.formatEther(
                      tokenToBeReceivedAfterSwap
                  )).toFixed(6)} Stone Tokens`
                  : `You will get ${Number(utils.formatEther(
                      tokenToBeReceivedAfterSwap
                    )).toFixed(6)} Eth`}
              </p>
              <Button 
                children='Swap'
                type='button'
                onClick={_swapTokens}
                className='flex-initial md:w-64 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            />  
          </div>
        </>
    );
  }
};

  
  return (
        <Card>
          <CardBody className='flex flex-col items-center justify-center gap-12 bg-tomatoLighter relative'>
          <p className='p-2 rounded-full absolute top-2 right-2 bg-[#e9d9de] cursor-pointer' onClick={() => setOpen(null)}><FaTimes  className='w-3 h-3 font-light'/></p>
          <div className="flex flex-row gap-2 items-center justify-center mt-3 w-full mx-auto">
            <Button 
                children='Swap'
                type='button'
                onClick={() => {
                  setLiquidityTab(false);
                }}
                className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            />              
            <Button 
                children='Liquidity'
                type='button'
                onClick={() => {
                  setLiquidityTab(true);
                }}
                className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            />
          </div>
          <div className="text-center"><Render /></div>
        </CardBody>
      </Card>
  )

 */