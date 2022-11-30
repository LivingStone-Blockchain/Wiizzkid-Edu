import React, { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useConnect } from 'wagmi';
// import { InjectedConnector } from '@wagmi/core';
import Button from './Button'


type ConnectWalletBtnProps = {
    colorDeep: string,
    mobileDropdownOpen: boolean,
}


const ConnectWalletBtn: FC<ConnectWalletBtnProps> = ({colorDeep, mobileDropdownOpen}) => {
  return (
    
    <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      const ready = mounted && authenticationStatus !== 'loading';
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus ||
          authenticationStatus === 'authenticated');

      return (
        <div
          {...(!ready && {
            'aria-hidden': true,
            'style': {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                 <Button
                      onClick={openConnectModal}
                      type="button"
                      className={`${mobileDropdownOpen && 'blur-2xl'} w-full px-10 py-3 mt-3 md:text-base text-sm text-center text-white lg:mt-8 lg:ml-4`}
                      children="Connect Wallet"
                      style={{ backgroundColor: `${colorDeep}` }}
                 />
              );
            }

            if (!chain.unsupported) {
              return (
                <button onClick={openChainModal} type="button" className=' px-10 py-3 mt-3 md:text-base text-sm text-center lg:mt-8 lg:ml-4 flex gap-1 justify-center items-center relative z-10 rounded-full bg-white p-2 focus:outline-none border border-gray-300'>
                  Wrong network
                </button>
              );
            }

            return (
              <div>
                <button onClick={openAccountModal} type="button" className='mt-3 lg:mt-8 lg:ml-4 flex gap-1 justify-center items-center relative z-10 rounded-full bg-white p-2 focus:outline-none border border-gray-300'>
                <span  style={{ backgroundColor: `${colorDeep}`}} className='rounded-full py-[1px] px-[3px] mr-1'><span className='text-[13px]'>🤠</span></span>
                  <span className='font-medium text-[#252641] md:text-base text-sm'>{account.displayName}</span>
                  <svg className="h-5 w-5 text-[#252641]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>

  )
}

export default ConnectWalletBtn