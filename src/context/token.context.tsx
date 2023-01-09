import { createContext, FC, useEffect, useMemo, useState } from "react";
import { BigNumber, utils } from "ethers";
import {
  useProvider,
  useSigner,
  useConnect,
  useAccount,
  useContract,
} from "wagmi";
import { goerli } from "wagmi/chains";


import {
  DEX_ABI,
  DEX_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from  './../components/dashboard/components/exchange/constants/constants.js';

import {
  addLiquidity,
  calculateST,
} from "./../components/dashboard/components/exchange/DEX-components/addLiquidity";
import {
  getSTBalance,
  getEtherBalance,
  getLPTokensBalance,
  getReserveOfST,
} from "./../components/dashboard/components/exchange/DEX-components/getAmounts";
import {
  getTokensAfterRemove,
  removeLiquidity,
} from "./../components/dashboard/components/exchange/DEX-components/removeLiquidity";
import {
  swapTokens,
  getAmountOfTokensReceivedFromSwap,
} from "./../components/dashboard/components/exchange/DEX-components/swap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";




export interface TokenContextType {
     isConnected: any,
     getAmounts: () => Promise<void>,
     _getAmountOfTokensReceivedFromSwap: (_swapAmount: number) => Promise<void>, 
      _swapTokens:  () => void, 
      _getTokensAfterRemove: (_removeLPTokens: any) => Promise<void>, 
      _addLiquidity:  () => void, 
      _removeLiquidity: () => void, 
      stBalance: BigNumber,
      ethBalance: BigNumber,
      lpBalance: BigNumber,
      reservedST: BigNumber,
      setAddEther: React.Dispatch<React.SetStateAction<BigNumber>>
      setAddSTTokens: React.Dispatch<React.SetStateAction<BigNumber>>
      etherBalanceContract: BigNumber,
      addSTTokens: BigNumber,
      setRemoveLPTokens:  React.Dispatch<React.SetStateAction<string>>,
      removeST: BigNumber,
      removeEther: BigNumber,
      zero: BigNumber,
      setSwapAmount: React.Dispatch<React.SetStateAction<string>>,
      swapAmount: string,
      ethSelected: boolean,
    setEthSelected: React.Dispatch<React.SetStateAction<boolean>>,
    tokenToBeReceivedAfterSwap: BigNumber,
}

export const TokenContext = createContext<TokenContextType | null>(null);


const TokenProvider: FC<any> = ({ children }) => {
    const { address } = useAccount();
    const { data: signer } = useSigner({ chainId: goerli.id });
    const provider = useProvider();
  
    const zero = BigNumber.from(0);
    /** Variables to keep track of amount */
    // `ethBalance` keeps track of the amount of Eth held by the user's account
    const [ethBalance, setEtherBalance] = useState(zero);
    // `reservedST` keeps track of the Stone tokens Reserve balance in the Exchange contract
    const [reservedST, setReservedST] = useState(zero);
    // Keeps track of the ether balance in the contract
    const [etherBalanceContract, setEtherBalanceContract] =
      useState(zero);
    // stBalance is the amount of `ST` tokens held by the users account
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
    const [tokenToBeReceivedAfterSwap, settokenToBeReceivedAfterSwap] =
      useState(zero);
    // Keeps track of whether  `Eth` or `Stone` token is selected. If `Eth` is selected it means that the user
    // wants to swap some `Eth` for some `Stone` tokens and vice versa if `Eth` is not selected
    const [ethSelected, setEthSelected] = useState(true);
    //web3 wallet
    const { connector: isConnected } = useAccount();
    const navigate = useNavigate();




      
  const getAmounts = async () => {
    try {


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
      const _ethBalanceContract = await getEtherBalance(
        provider,
        null,
        true
      );
      setEtherBalance(_ethBalance);
      setSTBalance(_stBalance);
      setLPBalance(_lpBalance);
      setReservedST(_reservedST);
      setEtherBalanceContract(_ethBalanceContract);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (isConnected) {
      getAmounts();
    }
}, [isConnected]);




  const _swapTokens = async () => {
    if (swapAmount === "") {
       return toast.error('Input cannot be empty!', {duration:4000});
    }

    if (Number(swapAmount) === 0 || Number(swapAmount) > Number(utils.formatEther(ethBalance))) {
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
        setSwapAmount("");
        toast.success('Swap successful', {duration: 5000})
        setTimeout(() => {
            navigate('/dashboard-home');
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
        const _ethBalance = await getEtherBalance(
          provider,
          null,
          true
        );
        // Call the `getAmountOfTokensReceivedFromSwap` from the utils folder
        const amountOfTokens =
          await getAmountOfTokensReceivedFromSwap(
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
      console.log("parsing");
      // Check if the values are zero
      if (!addSTTokens.eq(zero) && !addEtherWei.eq(zero)) {
        // call the addLiquidity function from the components folder
        await addLiquidity(signer, addSTTokens, addEtherWei);
        console.log("awaiting add liquidity...");
        // Reinitialize the ST tokens
        setAddSTTokens(zero);
        console.log("st set");
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






  const value = useMemo(
    () => ({ 
        isConnected, 
        getAmounts,
        _getAmountOfTokensReceivedFromSwap, 
        _swapTokens,  
        _getTokensAfterRemove, 
        _addLiquidity, 
        _removeLiquidity, 
        stBalance,
        ethBalance,
        lpBalance, 
        reservedST,
        setAddEther,
        setAddSTTokens,
        etherBalanceContract,
        addSTTokens,
        setRemoveLPTokens,
        removeST,
        removeEther,
        zero,
        swapAmount,
        setSwapAmount,
        ethSelected,
        setEthSelected,
        tokenToBeReceivedAfterSwap
    }),
    [
        isConnected, 
        getAmounts,
        _getAmountOfTokensReceivedFromSwap, 
        _swapTokens,  
        _getTokensAfterRemove, 
        _addLiquidity, 
        _removeLiquidity, 
        stBalance,
        ethBalance,
        lpBalance,
        reservedST,
        setAddEther,
        setAddSTTokens,
        etherBalanceContract,
        addSTTokens,
        setRemoveLPTokens,
        removeST,
        removeEther,
        zero,
        swapAmount,
        setSwapAmount,
        ethSelected,
        setEthSelected,
        tokenToBeReceivedAfterSwap
    ]
  )


    return (
        <TokenContext.Provider 
            value={value}
        >
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider;