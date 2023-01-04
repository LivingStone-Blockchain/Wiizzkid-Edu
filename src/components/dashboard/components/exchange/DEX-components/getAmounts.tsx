import { Contract } from "ethers";
import {DEX_ABI, DEX_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "../constants/constants";


  // const TokenContract = useContract({
  //   addressOrName: TOKEN_ADDRESS,
  //   contractInterface: TOKEN_ABI,
  //   signerOrProvider: signer,
  // });

  // const ExchangeContract = useContract({
  //   addressOrName: DEX_ADDRESS,
  //   contractInterface: DEX_ABI,
  //   signerOrProvider: signer,
  // });


/**
 * getEtherBalance: Retrieves the ether balance of the user or the contract
 */

export const getEtherBalance = async (provider:any, address:any, contract:boolean = false) => {
  try {
    // If the caller has set the `contract` boolean to true, retrieve the balance of
    // ether in the `exchange contract`, if it is set to false, retrieve the balance
    // of the user's address
    if (contract) {
      const balance = await provider.getBalance(DEX_ADDRESS);
      return balance;
    } else {
      const balance = await provider.getBalance(address);
      return balance;
    }
  } catch (err) {
    console.error(err);
    return 0;
  }
};

/**
 * getSTTokensBalance: Retrieves the Stone tokens in the account
 * of the provided `address`
 */
export const getSTBalance = async (provider:any, address:any) => {
  try {
    const tokenContract = new Contract(
      TOKEN_ADDRESS,
      TOKEN_ABI,
      provider
    );
    const balanceOfStoneTokens = await tokenContract.balanceOf(address);
    return balanceOfStoneTokens;
  } catch (err) {
    console.error(err);
  }
};

/**
 * getLPTokensBalance: Retrieves the amount of Stone LP tokens in the account
 * of the provided `address`
 */
export const getLPTokensBalance = async (provider:any, address:any) => {
  try {
    const exchangeContract = new Contract(
      DEX_ADDRESS,
      DEX_ABI,
      provider
    );
    const balanceOfLPTokens = await exchangeContract.balanceOf(address);
    return balanceOfLPTokens;
  } catch (err) {
    console.error(err);
  }
};

/**
 * getReserveOfStoneTokens: Retrieves the amount of Stone tokens in the
 * exchange contract address
 */
export const getReserveOfST = async (provider:any) => {
  try {
    const exchangeContract = new Contract(
      DEX_ADDRESS,
      DEX_ABI,
      provider
    );
    const reserve = await exchangeContract.getReserve();
    return reserve;
  } catch (err) {
    console.error(err);
  }
};