import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { WiizzkidProvider, UserProvider, GameProvider } from './context';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider} from "wagmi/providers/jsonRpc";
import { publicProvider } from 'wagmi/providers/public';
const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    alchemyProvider({apiKey: "D-1KSVFkVBU022haMA1gRO0rmv21ykm2"}),
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
  <WagmiConfig client={Client}>
    <RainbowKitProvider chains={chains}>
      <React.StrictMode>
        <BrowserRouter>
          <UserProvider>
          <GameProvider>
          <WiizzkidProvider>
              <App />
          </WiizzkidProvider>
          </GameProvider>
          </UserProvider>
        </BrowserRouter>
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
)

