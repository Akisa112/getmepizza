import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./libs/context";
import { useUserData } from "./libs/hooks";
import "@rainbow-me/rainbowkit/styles.css";
import { Chain } from "@rainbow-me/rainbowkit";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import NavBar from "./components/navbar";

const binanceChain: Chain = {
  id: 56,
  name: "Binance Smart Chain",
  network: "BinanceSmartChain",
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "BinanceSmartChain",
    symbol: "BSC",
  },
  rpcUrls: {
    default: "https://bsc-dataseed.binance.org/",
  },
  blockExplorers: {
    default: { name: "BSCScan", url: "https://bscscan.com" },
    etherscan: { name: "BSCScan", url: "https://bscscan.com" },
  },
  testnet: false,
};

const fantomChain: Chain = {
  id: 250,
  name: "Fantom Opera",
  network: "Fantom",
  iconUrl: "https://cryptologos.cc/logos/fantom-ftm-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM",
  },
  rpcUrls: {
    default: "https://bsc-dataseed.binance.org/",
  },
  blockExplorers: {
    default: { name: "BSCScan", url: "https://bscscan.com" },
    etherscan: { name: "BSCScan", url: "https://bscscan.com" },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [
    chain.polygonMumbai,
    binanceChain,
    // chain.mainnet, binanceChain, chain.polygon, fantomChain,
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <UserContext.Provider value={userData}>
            <NavBar />
            <Component {...pageProps} />
            <Toaster />
          </UserContext.Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
