import EthereumProvider from "@walletconnect/ethereum-provider";

export type WalletEventProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (...args: any[]) => unknown;
  removeListener?: (...args: any[]) => unknown;
  disconnect?: () => Promise<void>;
};

let walletConnectProvider: EthereumProvider | null = null;

type ConnectResult = {
  provider: WalletEventProvider;
  account: string | null;
  chainId: string | null;
};

const toHexChainId = (value?: number | null) => {
  if (!value || Number.isNaN(value)) {
    return null;
  }
  return `0x${value.toString(16)}`;
};

export const connectWalletConnect = async (projectId: string): Promise<ConnectResult> => {
  const trimmed = projectId.trim();
  if (!trimmed) {
    throw new Error("Missing WalletConnect project id.");
  }

  if (!walletConnectProvider) {
    walletConnectProvider = await EthereumProvider.init({
      projectId: trimmed,
      chains: [56],
      optionalChains: [1, 137],
      showQrModal: true,
      metadata: {
        name: "VEIL",
        description: "VEIL AI battleground",
        url: "https://veil.local",
        icons: ["https://avatars.githubusercontent.com/u/37784886"]
      }
    });
  }

  await walletConnectProvider.enable();

  const accounts = (walletConnectProvider.accounts ?? []) as string[];
  const account = accounts[0] ?? null;
  const chainId = toHexChainId(walletConnectProvider.chainId ?? null);

  return {
    provider: walletConnectProvider,
    account,
    chainId
  };
};

export const disconnectWalletConnect = async () => {
  if (!walletConnectProvider) {
    return;
  }

  try {
    await walletConnectProvider.disconnect();
  } finally {
    walletConnectProvider = null;
  }
};
