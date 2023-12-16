import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {ClubContextProvider} from "./context";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          <ClubContextProvider>
              <App />
              <ReactQueryDevtools/>
          </ClubContextProvider>
      </AuthContextProvider>
     </QueryClientProvider>
  </React.StrictMode>,
)
