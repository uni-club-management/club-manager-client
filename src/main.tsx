import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
import {AuthContextProvider, ClubContextProvider} from "./context";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          <ClubContextProvider>
              <App />
              <ToastContainer />
          </ClubContextProvider>
      </AuthContextProvider>
     </QueryClientProvider>
  </React.StrictMode>,
)
