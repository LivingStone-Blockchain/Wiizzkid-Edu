import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { WiizzkidProvider, UserProvider, GameProvider } from './context';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
)

