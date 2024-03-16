import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { dark } from '@clerk/themes';

import { ClerkProvider } from '@clerk/clerk-react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={"pk_test_YnVzeS1ib2JjYXQtNDcuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    appearance={{
        baseTheme: dark
      }}
    >
     <SignedOut>

     <App />
     
      </SignedOut>



      <SignedIn>
      <App />
      </SignedIn>
   
    </ClerkProvider>
)
