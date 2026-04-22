import React from "react";
import ReactDOM from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { arbitrum, base, bsc, mainnet, optimism, polygon } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import App from "./App";
import "./styles.css";

const walletConnectProjectId =
  (import.meta as ImportMeta & { env: { VITE_WALLETCONNECT_PROJECT_ID?: string } }).env.VITE_WALLETCONNECT_PROJECT_ID ??
  "e40e7554a29d019bedaad883896164a4";

const wagmiConfig = getDefaultConfig({
  appName: "VEIL",
  projectId: walletConnectProjectId,
  chains: [mainnet, bsc, polygon, optimism, arbitrum, base],
  ssr: false
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
