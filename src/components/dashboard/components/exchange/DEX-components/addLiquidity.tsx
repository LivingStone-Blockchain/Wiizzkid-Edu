import { Contract, utils } from "ethers";
import {DEX_ABI, DEX_ADDRESS, EXCHANGE_ABI, EXCHANGE_ADDRESS } from "../constants/constants";

/**
 * addLiquidity helps add liquidity to the exchange,
 * If the user is adding initial liquidity, user decides the ether and Stone tokens he wants to add
 * to the exchange. If he is adding the liquidity after the initial liquidity has already been added
 * then we calculate the Stone tokens he can add, given the Eth he wants to add by keeping the ratios
 * constant
 */
export const addLiquidity = async (signer:any, addStoneAmountWei:any, addEtherAmountWei:any ) => {
  try {
    // create a new instance of the token contract
    const tokenContract = new Contract(
      EXCHANGE_ADDRESS,
      EXCHANGE_ABI,
      signer
    );
    // create a new instance of the exchange contract
    const exchangeContract = new Contract(
      DEX_ADDRESS,
      DEX_ABI,
      signer
    );
    // Because the Stone tokens are an ERC20, user would need to give the contract allowance
    // to take the required number Stone tokens out of his contract
    let tx = await tokenContract.approve(
      DEX_ADDRESS,
      addStoneAmountWei.toString()
    );
    await tx.wait();
    // After the contract has the approval, add the ether and Stone tokens in the liquidity
    tx = await exchangeContract.addLiquidity(addStoneAmountWei, {
      value: addEtherAmountWei,
    });
    await tx.wait();
  } catch (err) {
    console.error(err);
  }
};

/**
 * calculateST calculates the Stone tokens that need to be added to the liquidity
 * given `_addEtherAmountWei` amount of ether
 */
export const calculateST = async (
  _addEther = "0",
  etherBalanceContract:number,
  stoneTokenReserve:number
) => {
  // `_addEther` is a string, we need to convert it to a Bignumber before we can do our calculations
  // We do that using the `parseEther` function from `ethers.js`
  const _addEtherAmountWei = utils.parseEther(_addEther);

  // Ratio needs to be maintained when we add liquidty.
  // We need to let the user know for a specific amount of ether how many `CD` tokens
  // He can add so that the price impact is not large
  // The ratio we follow is (amount of Stone tokens to be added) / (Stone tokens balance) = (Eth that would be added) / (Eth reserve in the contract)
  // So by maths we get (amount of Stone tokens to be added) = (Eth that would be added * Stone tokens balance) / (Eth reserve in the contract)

  const stoneTokenAmount = _addEtherAmountWei
    .mul(stoneTokenReserve)
    .div(etherBalanceContract);
  return stoneTokenAmount;
};