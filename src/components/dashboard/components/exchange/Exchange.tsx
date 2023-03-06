import {useContext, useState, useEffect} from 'react'
import { ExchangeContext, ExchangeContextType } from '../../../../context/exchange.context';
import  {CardBody, Card}  from '../../components/Cards';
import Button from '../../../Button';
import { FaTimes } from 'react-icons/fa';
import { BigNumber, utils } from "ethers";

import {
  calculateST,
} from "./DEX-components/addLiquidity";







const Exchange = ({setOpen}: {setOpen: (value: React.SetStateAction<number | null>) => void}) => {
  const [liquidityTab, setLiquidityTab] = useState(false); 
  const { zero, _getAmountOfTokensReceivedFromSwap, _swapTokens, _getTokensAfterRemove, _addLiquidity, _removeLiquidity, stBalance, ethBalance, lpBalance, reservedST, setAddEther, setAddSTTokens, etherBalanceContract, addSTTokens, removeST, removeEther, setRemoveLPTokens,   swapAmount, setSwapAmount, ethSelected, setEthSelected, tokenToBeReceivedAfterSwap} = useContext(ExchangeContext) as ExchangeContextType;
  const [tokenSelected, setTokenSelected] = useState<string>("");






const Render = () => {
  if (liquidityTab) {
    return (
      <>
         <div className='flex  flex-col justify-center items-center gap-2 w-full'>
              <p className="text-lg font-medium text-navy text-center">You have {utils.formatEther(stBalance)} Stone Tokens</p>
              <p className="text-sm font-normal text-gray-600">You have {utils.formatEther(ethBalance)} Ether</p>
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

                {/* Convert the BigNumber to string using the formatEther function from ethers.js */}

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
              {/* Convert the BigNumber to string using the formatEther function from ethers.js */}
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
              <p className="text-lg font-medium text-navy text-center"> {Number(utils.formatEther(reservedST)).toFixed(6)} Stone Tokens Available</p>
              <p className="mb-2 text-sm font-normal text-gray-600 hidden"> {utils.formatEther(etherBalanceContract)} Ether in the Contract</p>
          </div>
        <div className='flex flex-col md:flex-row gap-3 justify-center md:justify-start items-center my-7 w-full'>
        <input
            type="number"
            placeholder="Amount"
            //min="0" max="10000" step="0.01"
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
                  {/* Convert the BigNumber to string using the formatEther function from ethers.js */}
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

  
};

export default Exchange;