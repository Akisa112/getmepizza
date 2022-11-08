import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "@rainbow-me/rainbowkit/styles.css";
import { Chain } from "@rainbow-me/rainbowkit";
import {
  getDefaultWallets,
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import NavBar from "../components/navbar";

import { useState, useEffect } from "react";
import Router from "next/router";
import PageLoader from "../components/PageLoader";

import { motion } from "framer-motion";

const binanceChain: Chain = {
  id: 56,
  name: "Smart Chain",
  network: "BinanceSmartChain",
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Smart Chain",
    symbol: "BNB",
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
  name: "Fantom",
  network: "Fantom",
  iconUrl: "https://cryptologos.cc/logos/fantom-ftm-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM",
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/fantom/",
  },
  blockExplorers: {
    default: { name: "FTMScan", url: "https://ftmscan.com/" },
    etherscan: { name: "FTMScan", url: "https://ftmscan.com/" },
  },
  testnet: false,
};

const polyChain: Chain = {
  id: 137,
  name: "Polygon",
  network: "Polygon",
  iconUrl:
    "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Matic",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://polygon-rpc.com",
  },
  blockExplorers: {
    default: { name: "PolyScan", url: "https://polygonscan.com/" },
    etherscan: { name: "PolyScan", url: "https://polygonscan.com/" },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [polyChain, binanceChain, fantomChain],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "GetMe.Pizza",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href='https://getme.pizza/terms'>Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href='https://github.com/elonsdev/getmepizza-dapp/blob/main/contract/getmepizza.sol'>
      Disclaimer
    </Link>
  </Text>
);

const Alpha = () => (
  <div className='py-2  font-CircularMedium bg-red-200 w-full text-center dark:text-black'>
    <p className='mx-2'>
      THIS IS AN <span className='font-extrabold text-lg'>ALPHA 0.2</span>{" "}
      CURRENTLY RUNNING ON BSC & POLY TESTNETS. MAINNETS COMING SOON.
    </p>
  </div>
);

function MyApp({ Component, pageProps, router }) {
  const [darkMode, setDarkMode] = useState(false);
  const changeMode = (arg) => {
    setDarkMode(arg);
  };

  const userData = useUserData();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  return (
    <div className={darkMode ? "dark " : ""}>
      <div className='bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-50 via-red-50 to-yellow-50 dark:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] dark:from-zinc-700 dark:via-zinc-900 dark:to-black dark:text-slate-50 min-h-screen'>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            coolMode
            chains={chains}
            appInfo={{
              appName: "GetMe.🍕",
              learnMoreUrl: "https://getme.pizza/faq",
              disclaimer: Disclaimer,
            }}
          >
            <UserContext.Provider value={userData}>
              <NavBar changeMode={changeMode} darkMode={darkMode} />

              <motion.div
                key={router.route}
                initial='initial'
                animate='animate'
                transition={{
                  duration: 0.6,
                }}
                variants={{
                  initial: {
                    opacity: 0,
                  },
                  animate: {
                    opacity: 1,
                  },
                }}
              >
                {loading ? (
                  <PageLoader />
                ) : (
                  <>
                    <Component {...pageProps} />{" "}
                  </>
                )}
              </motion.div>

              <Toaster />
            </UserContext.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </div>
  );
}

export default MyApp;
