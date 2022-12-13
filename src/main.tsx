import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { WiizzkidProvider, UserProvider, QuizProvider, TimestableProvider } from './context';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider} from "wagmi/providers/jsonRpc";
import { publicProvider } from 'wagmi/providers/public';



const alchemyApi = import.meta.env.VITE_ALCHEMY_API;

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    alchemyProvider({apiKey: alchemyApi}),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Wiizzkid App',
  chains
});

const Client = createClient({
  autoConnect: true,
  connectors,
  provider
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <BrowserRouter>
        <WagmiConfig client={Client}>
         <RainbowKitProvider chains={chains}>
          <UserProvider>
          <QuizProvider>
          <TimestableProvider>
          <WiizzkidProvider>
              <App />
          </WiizzkidProvider>
          </TimestableProvider>
          </QuizProvider>
          </UserProvider>
          </RainbowKitProvider>
          </WagmiConfig>
        </BrowserRouter>
      </React.StrictMode>
)

