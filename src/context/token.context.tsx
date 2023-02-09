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
import {TOKEN_ABI, TOKEN_ADDRESS, GAME_ABI, GAME_ADDRESS} from "./../components/dashboard/components/exchange/constants/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext, UserContextType } from './user.context';
import {userDetailsService } from "../services";
import useTokenRefresh from './../hooks/useTokenRefresh';


type userType = {
  id: number,
  email: string,
  tokens: {
      access: string,
      refresh: string,
  },
  full_name: string,
  stone_token: number,
  player_code: string,
  stone_token_winnings?: number,
  wallet_address?: string
}



export interface TokenContextType {
  isConnected: any,
  getBalanceOfStoneTokens: () => Promise<void>,
  mintStoneToken: (amount: number) => Promise<number | string | undefined>,
  deductTokenOnGameCreate: (tokenFee: number) => Promise<void>,
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
  zero: BigNumber,
  isOwner: boolean,
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  firstApproval: boolean,
  setFirstApproval: React.Dispatch<React.SetStateAction<boolean>>,
  userDetail: userType | null,
  setUserDetail: React.Dispatch<React.SetStateAction<userType | null>>,
}

export const TokenContext = createContext<TokenContextType | null>(null);


const TokenProvider: FC<any> = ({ children }) => {
  const { connector:isConnected, address } = useAccount();
  const { data: signer } = useSigner({ chainId: goerli.id });
  const provider = useProvider();

  // Create a BigNumber `0`
  const zero = BigNumber.from(0);
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
  const [userDetail, setUserDetail] = useState<userType | null>(null); //for user details retriever from backend
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as UserContextType;
  const { refreshedUser } = useTokenRefresh();






      //Retrieve user details
      useEffect(() => {

        const intervalId = setInterval(async() => {
          try {
            await userDetailsService.getUser(user?.id!, refreshedUser!.tokens!.access).then(res => setUserDetail(res))
          } catch (error) {
    
          }
        }, 2000);

        return () => clearInterval(intervalId);
        

        //userDetailsService.getUser(user?.id!, refreshedUser!.tokens!.access).then(res => setUserDetail(res))
    }, [user])



    //update token balance, wallet address and winnings on backend
    useEffect(() => {
      if (!user) {
        return;
      }

      if (!address) {
        return;
      }

      const payload = {
        stone_token: Number(utils.formatEther(balanceOfStoneTokens)),
        wallet_address: address,
        stone_token_winnings: userDetail?.stone_token_winnings!
      }
      const updateStoneBalance = async () => {
        try {
          await userDetailsService.stoneUpdate(payload, user.id, refreshedUser!.tokens!.access);
        } catch (error) {
        }
      }
      updateStoneBalance();
    }, [balanceOfStoneTokens, userDetail?.stone_token_winnings!])
    



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
  const deductTokenOnGameCreate = async (tokenFee: number) => {
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
        const tx = await tokenContract.approve(GAME_ADDRESS, amount)
        await tx.wait();
        setTimeout(() => {
          setFirstApproval(false);
        }, 3000);

        const txx = await gameContract.createGame(amount)
        await txx.wait();
        setLoading(false);
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

      toast.success('Withdrawal success', { duration: 5000 })    
      //reset winnings on backend
      const payload = {
        stone_token: Number(utils.formatEther(balanceOfStoneTokens)),
        wallet_address: address!,
        stone_token_winnings: 0,
      }
      await userDetailsService.stoneUpdate(payload, user?.id!, refreshedUser!.tokens!.access);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
}




  useEffect(() => {
    if(!isConnected) {
      return;
    }

    getTotalTokensMinted();
    getBalanceOfStoneTokens();
    getTotalEth();
    getOwner();
}, [isConnected, balanceOfStoneTokens]);







  const value = useMemo(
    () => ({
      isConnected,
      zero,
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
      withdrawWinnings,
      userDetail, 
      setUserDetail
    }),
    [
      isConnected,
      zero,
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
      withdrawWinnings,
      userDetail, 
      setUserDetail
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