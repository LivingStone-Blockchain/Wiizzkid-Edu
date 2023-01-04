import { Contract } from "ethers";
import {DEX_ABI, DEX_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "../constants/constants";

/*
    getAmountOfTokensReceivedFromSwap:  Returns the number of Eth/Stone tokens that can be received 
    when the user swaps `_swapAmountWei` amount of Eth/Stone tokens.
*/
export const getAmountOfTokensReceivedFromSwap = async (
  _swapAmountWei:any,
  provider:any,
  ethSelected:any,
  ethBalance:any,
  reservedST:any
) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(
    DEX_ADDRESS,
    DEX_ABI,
    provider
  );
  let amountOfTokens;
  // If `Eth` is selected this means our input value is `Eth` which means our input amount would be
  // `_swapAmountWei`, the input reserve would be the `ethBalance` of the contract and output reserve
  // would be the `Crypto Dev` token reserve
  if (ethSelected) {
    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      ethBalance,
      reservedST
    );
  } else {
    // If `Eth` is not selected this means our input value is `Stone` tokens which means our input amount would be
    // `_swapAmountWei`, the input reserve would be the `Stone` token reserve of the contract and output reserve
    // would be the `ethBalance`
    amountOfTokens = await exchangeContract.getAmountOfTokens(
      _swapAmountWei,
      reservedST,
      ethBalance
    );
  }

  return amountOfTokens;
};

/*
  swapTokens: Swaps `swapAmountWei` of Eth/Stone tokens with `tokenToBeReceivedAfterSwap` amount of Eth/Stone tokens.
*/
export const swapTokens = async (
  signer:any,
  swapAmountWei:any,
  tokenToBeReceivedAfterSwap:any,
  ethSelected:any
) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(
    DEX_ADDRESS,
    DEX_ABI,
    signer
  );
  const tokenContract = new Contract(
    TOKEN_ADDRESS,
    TOKEN_ABI,
    signer
  );
  let tx;
  // If Eth is selected call the `ethToStoneToken` function else
  // call the `cryptoDevTokenToEth` function from the contract
  // As you can see you need to pass the `swapAmount` as a value to the function because
  // it is the ether we are paying to the contract, instead of a value we are passing to the function
  if (ethSelected) {
    tx = await exchangeContract.ethToStoneToken(
      tokenToBeReceivedAfterSwap,
      {
        value: swapAmountWei,
      }
    );
  } else {
    // User has to approve `swapAmountWei` for the contract because `Stone` token is an ERC20
    tx = await tokenContract.approve(
      DEX_ADDRESS,
      swapAmountWei.toString()
    );
    await tx.wait();
    // call cryptoDevTokenToEth function which would take in `swapAmountWei` of `Stone` tokens and would
    // send back `tokenToBeReceivedAfterSwap` amount of `Eth` to the user
    tx = await exchangeContract.stoneTokenToEth(
      swapAmountWei,
      tokenToBeReceivedAfterSwap
    );
  }
  await tx.wait();
};