import { Contract, providers, utils, BigNumber } from "ethers";
import {DEX_ABI, DEX_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "../constants/constants";

/**
 * removeLiquidity: Removes the `removeLPTokensWei` amount of LP tokens from
 * liquidity and also the calculated amount of `ether` and `ST` tokens
 */
export const removeLiquidity = async (signer:any, removeLPTokensWei:any) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(
    DEX_ADDRESS,
    DEX_ABI,
    signer
  );
  const tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
};

/**
 * getTokensAfterRemove: Calculates the amount of `Eth` and `ST` tokens
 * that would be returned back to user after he removes `removeLPTokenWei` amount
 * of LP tokens from the contract
 */
export const getTokensAfterRemove = async (
  provider:any,
  removeLPTokenWei:any,
  _ethBalance:any,
  stoneTokenReserve:any
) => {
  try {
    // Create a new instance of the exchange contract
    const exchangeContract = new Contract(
      DEX_ADDRESS,
      DEX_ABI,
      provider
    );
    // Get the total supply of `Stone` LP tokens
    const _totalSupply = await exchangeContract.totalSupply();
    // Here we are using the BigNumber methods of multiplication and division
    // The amount of Eth that would be sent back to the user after he withdraws the LP token
    // is calculated based on a ratio,
    // Ratio is -> (amount of Eth that would be sent back to the user / Eth reserve) = (LP tokens withdrawn) / (total supply of LP tokens)
    // By some maths we get -> (amount of Eth that would be sent back to the user) = (Eth Reserve * LP tokens withdrawn) / (total supply of LP tokens)
    // Similarly we also maintain a ratio for the `ST` tokens, so here in our case
    // Ratio is -> (amount of ST tokens sent back to the user / ST Token reserve) = (LP tokens withdrawn) / (total supply of LP tokens)
    // Then (amount of ST tokens sent back to the user) = (ST token reserve * LP tokens withdrawn) / (total supply of LP tokens)
    const _removeEther = _ethBalance.mul(removeLPTokenWei).div(_totalSupply);
    const _removeST = stoneTokenReserve
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    return {
      _removeEther,
      _removeST,
    };
  } catch (err) {
    console.error(err);
  }
};