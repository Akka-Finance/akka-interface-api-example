import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { WagmiProvider, createConfig, http } from "wagmi";
import { ToastContainer } from "react-toastify";
import { coreDao } from "wagmi/chains";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [coreDao],
  transports: {
    [coreDao.id]: http(),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ToastContainer
              position={"bottom-left"}
              autoClose={6000}
              hideProgressBar={false}
              closeOnClick={true}
              pauseOnHover={true}
              draggable={true}
              theme="light"
            />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
