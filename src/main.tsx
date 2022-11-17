import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { WiizzkidProvider, UserProvider } from './context';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <BrowserRouter>
      <UserProvider>
      <WiizzkidProvider>
          <App />
      </WiizzkidProvider>
      </UserProvider>
     </BrowserRouter>
  </React.StrictMode>
)

