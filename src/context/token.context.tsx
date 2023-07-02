import { createContext, FC, useEffect, useMemo, useState, useContext } from "react";
import { BigNumber, utils, Contract, providers } from "ethers";
import {
  useProvider,
  useSigner,
  useConnect,
  useAccount,
  useContract,
} from "wagmi";
import { goerli } from "wagmi/chains";

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
import {TOKEN_ABI, TOKEN_ADDRESS, GAME_ABI, GAME_ADDRESS} from "./../components/dashboard/components/exchange/constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext, UserContextType } from './user.context';
import {userDetailsService } from "../services";




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
      addEther: BigNumber,
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













  address: any,
  getBalanceOfStoneTokens: () => Promise<void>,
  mintStoneToken: (amount: number) => Promise<number | string | undefined>,
  deductTokenOnGameCreate: (tokenFee: number, gameId: string) => Promise<void>,
  withdrawWinnings: (winnings: number) => Promise<void>,
  getTotalTokensMinted: () => Promise<void>,
  getTotalEth: () => Promise<void>,
  getOwner: () => Promise<void>,
  withdrawCoins : () => Promise<void>,
  balanceOfStoneTokens: BigNumber,
  setBalanceOfStoneTokens: React.Dispatch<React.SetStateAction<BigNumber>>
  tokenAmount: number,
  setTokenAmount: React.Dispatch<React.SetStateAction<number>>
  ETH: BigNumber,
  setETH: React.Dispatch<React.SetStateAction<BigNumber>>
  tokensMinted: BigNumber,
  setTokensMinted: React.Dispatch<React.SetStateAction<BigNumber>>,
  isOwner: boolean,
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  firstApproval: boolean,
  setFirstApproval: React.Dispatch<React.SetStateAction<boolean>>,
  secondApproval: boolean,
  setSecondApproval: React.Dispatch<React.SetStateAction<boolean>>,
}






export const TokenContext = createContext<TokenContextType | null>(null);


const TokenProvider: FC<any> = ({ children }) => {
    const {  connector: isConnected, address } = useAccount();
    const { data: signer } = useSigner({ chainId: goerli.id });
    const provider = useProvider();
  

    //exchange
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
    const navigate = useNavigate();




  //ICO
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState<boolean>(false);
  // balanceOfStoneTokens keeps track of number of Stone tokens owned by an address
  const [balanceOfStoneTokens, setBalanceOfStoneTokens] = useState<BigNumber>(zero);
  // amount of the tokens that the user wants to mint
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [ETH, setETH] = useState<BigNumber>(zero);
  // tokensMinted is the total number of tokens that have been minted till now out of 10000(max total supply)
  const [tokensMinted, setTokensMinted] = useState<BigNumber>(zero);
  // isOwner gets the owner of the contract through the signed address
  const [isOwner, setIsOwner] = useState<boolean>(false);
  //confirm transactions for fee deduction
  const [firstApproval, setFirstApproval] = useState<boolean>(false);
  const [secondApproval, setSecondApproval] = useState<boolean>(false)
;  const [isWidthdrawal, setIsWidthdrawal] =  useState<boolean>(false);
  const { user, refreshedUser } = useContext(UserContext) as UserContextType;










//exchange      
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
}, [isConnected, stBalance]);



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



















  //ICO



   // checks the balance of Stone Tokens's held by an address
 const getBalanceOfStoneTokens = async () => {
  if(!isConnected) {
    return;
  }

  try {
    // Create an instance of token contract
    const tokenContract = new Contract(
      TOKEN_ADDRESS,
      TOKEN_ABI,
      provider
    );
    // Get the address associated to the signer which is connected to  MetaMask
    // const address = await signer.getAddress();
    // call the balanceOf from the token contract to get the number of tokens held by the user
    const balance = await tokenContract.balanceOf(address);
    // balance is already a big number, so we dont need to convert it before setting it
    setBalanceOfStoneTokens(balance);
  } catch (err) {
    console.error(err);
    setBalanceOfStoneTokens(zero);
  }
};

  /**
 * mintStoneToken: mints `amount` number of tokens to a given address
 */
  const mintStoneToken = async (amount:number) => {


    if (Number(utils.formatEther(ETH)) === 0) {
      return toast.error(<span  className="text-sm">Insufficient funds!</span>, { duration: 4000 });
    }

    if (amount === 0) {
      return toast.error(<span className="text-sm">Input cannot be empty!</span>, { duration: 4000 });
    }


    try {
      // Create an instance of tokenContract
      const tokenContract = new Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer!
      );
      // Each token is of `0.0001 ether`. The value we need to send is `0.0001 * amount`
      const value = 0.0001 * amount;
      const tx = await tokenContract.mint(amount, {
        // value signifies the cost of one stone token which is "0.0001" eth.
        // We are parsing `0.0001` string to ether using the utils library from ethers.js
        value: utils.parseEther(value.toString()),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      toast.success('Swap successful', { duration: 5000 })
        setTimeout(() => {
          setTokenAmount(0);
          navigate('/dashboard-home');
        }, 2000)
      await getBalanceOfStoneTokens();
      await getTotalTokensMinted();
    } catch (err) {
      console.error(err)
    }

   
  };

    /**
 * getTotalTokensMinted: Retrieves how many tokens have been minted till now
 * out of the total supply
 */
const getTotalTokensMinted = async () => {
  
  try {
    // Create an instance of token contract
    const tokenContract = new Contract(
      TOKEN_ADDRESS,
      TOKEN_ABI,
      provider
    );
    // Get all the tokens that have been minted
    const _tokensMinted = await tokenContract.totalMinted();
    setTokensMinted(_tokensMinted);
  } catch (err) {
    console.error(err);
  }
};

const getTotalEth = async () => {
  try {
    const ethBalance = await provider.getBalance(address!);
    setETH(ethBalance);
  } catch (err) {
    console.error(err);
  }
};

  /**
 * getOwner: gets the contract owner by connected address
 */
  const getOwner = async () => {

    try {
      const tokenContract = new Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        provider
      );
      // call the owner function from the contract
      const _owner = await tokenContract.owner();
      // Get the address associated to signer which is connected to Metamask
      // const address = await signer.getAddress();
      if (address!.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * withdrawCoins: withdraws ether by calling
   * the withdraw function in the contract
   */
  const withdrawCoins = async () => {
    try {
      const tokenContract = new Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer!
      );

      const tx = await tokenContract.withdraw();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getOwner();
    } catch (error) {
      console.error(error);
    }
  };



  //Deducting token fee on game creation
  const deductTokenOnGameCreate = async (tokenFee: number, gameId: string) => {
    const gameContract = new Contract(
        GAME_ADDRESS,
        GAME_ABI,
        signer!
      );
      const tokenContract = new Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer!
      );
  
      setLoading(true);
      setFirstApproval(true);
      const amount = utils.parseEther(tokenFee.toString())

      try {
        const tx = await tokenContract.approve(GAME_ADDRESS, amount);
        await tx.wait();
        setTimeout(() => {
          setFirstApproval(false);
        }, 3000);

        const txx = await gameContract.createGame(amount)
        await txx.wait();
        setLoading(false);
        setSecondApproval(true);
         
      } catch (error) {
        console.error(error);
      }
}






//withdraw winnings
const withdrawWinnings = async (winning: number) => {
  setLoading(true);

  const gameContract = new Contract(
    GAME_ADDRESS,
    GAME_ABI,
    signer!
    );

    const winningAmount = utils.parseEther(winning.toString())

    try {
      const  tx = await gameContract.withdrawWins(winningAmount) 
      await tx.wait();

      toast.success('Withdrawal success', { duration: 5000 });  
      setLoading(false);
      setIsWidthdrawal(true);
    } catch (error) {}


    if(!loading) {
        //reset winnings on backend
        const payload = {
          stone_token: Number(utils.formatEther(stBalance)),
          wallet_address: address!,
          stone_token_winnings: 0,
        }
        await userDetailsService.stoneUpdate(payload, user?.id!, refreshedUser?.access!);
    }
}


//update winning on backend
useEffect(() => {
    //reset winnings on backend
    const payload = {
      stone_token: Number(utils.formatEther(stBalance)),
      wallet_address: address!,
      stone_token_winnings: 0,
    }

  const updateStoneBalance = async () => {
    if (isWidthdrawal) {
      try {
        await userDetailsService.stoneUpdate(payload, user?.id!, refreshedUser?.access!);
        setIsWidthdrawal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  updateStoneBalance();
}, [isWidthdrawal, stBalance, refreshedUser?.access]);





  //update user wallet details on connect or balance change
  useEffect(() => {
    if(isConnected) {
      getTotalTokensMinted();
      getBalanceOfStoneTokens();
      getTotalEth();
      getOwner();
    }

}, [isConnected, stBalance]);








































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
        addEther,
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
        tokenToBeReceivedAfterSwap,







  address,
  loading,
  setLoading,
  balanceOfStoneTokens,
  setBalanceOfStoneTokens,
  tokenAmount,
  setTokenAmount,
  ETH,
  setETH,
  tokensMinted,
  setTokensMinted,
  isOwner,
  setIsOwner,
  getBalanceOfStoneTokens, 
  mintStoneToken, 
  getTotalTokensMinted, 
  getTotalEth,
  getOwner, 
  withdrawCoins,
  deductTokenOnGameCreate, 
  firstApproval,
  setFirstApproval,
  secondApproval,
  setSecondApproval,
  withdrawWinnings,



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
        addEther,
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
        tokenToBeReceivedAfterSwap,






  address, 
  loading,
  setLoading,
  balanceOfStoneTokens,
  setBalanceOfStoneTokens,
  tokenAmount,
  setTokenAmount,
  ETH,
  setETH,
  tokensMinted,
  setTokensMinted,
  isOwner,
  setIsOwner,
  getBalanceOfStoneTokens, 
  mintStoneToken, 
  getTotalTokensMinted, 
  getTotalEth,
  getOwner, 
  withdrawCoins,
  deductTokenOnGameCreate, 
  firstApproval,
  setFirstApproval,
  secondApproval,
  setSecondApproval,
  withdrawWinnings,
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