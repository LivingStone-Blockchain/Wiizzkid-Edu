import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import WiizzkidProvider from './context/wiizzkid.context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <BrowserRouter>
     <WiizzkidProvider>
      <App />
    </WiizzkidProvider>
     </BrowserRouter>
  </React.StrictMode>
)
