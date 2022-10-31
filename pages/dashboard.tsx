import AuthCheck from "./components/AuthCheck";

import PoweredBy from "./components/poweredby";
import { useContext, useEffect } from "react";
import { UserContext } from "./lib/context";
import { MdIosShare } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import SideNav from "./components/sideNav";
import { getEarnings } from "./lib/moralis";

import PolygonLogo from "../public/polygon.png";
import BinanceLogo from "../public/binance.png";
import FantomLogo from "../public/fantom.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "react-hot-toast";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useNetwork,
} from "wagmi";

export default function Dashboard({}) {
  const { username, userETH } = useContext(UserContext);
  const [earningsPoly, setEarningsPoly] = useState(0);
  const [earningsBinance, setEarningsBinance] = useState(0);

  const [currentChainEarnings, setCurrentChainEarnings] = useState(0);

  const [share, setShare] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const getEarningsFrom = async () => {
    try {
      const getPoly = await getEarnings(userETH, "Polygon Mumbai");
      setEarningsPoly(Number(getPoly) / 1000000000000000000);
      const getBinance = await getEarnings(userETH, "BSC Testnet");
      setEarningsBinance(Number(getBinance) / 1000000000000000000);
      if (chain.name === "Polygon Mumbai") {
        setCurrentChainEarnings(Number(getPoly) / 1000000000000000000);
      } else if (chain.name === "BSC Testnet") {
        setCurrentChainEarnings(Number(getBinance) / 1000000000000000000);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getEarningsFrom();
  }, [userETH]);

  useEffect(() => {
    if (chain) {
      if (chain.name === "Polygon Mumbai") {
        setCurrentChainEarnings(earningsPoly);
      } else if (chain.name === "BSC Testnet") {
        setCurrentChainEarnings(earningsBinance);
      }
    }
  }, [chain]);

  const callShare = () => {
    setShare(true);
    setTimeout(() => {
      setShare(false);
    }, 2000);
  };

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43",
    abi: [
      {
        inputs: [],
        name: "withdrawTips",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "withdrawTips",
    enabled: true,
  });

  let { data, isLoading, error, isError, write } = useContractWrite(config);

  let { isSuccess, isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toast.success(`Withdrawn ${chain.name} tips successfully!`, {
        duration: 3000,
      });
      setTimeout(() => {
        getEarningsFrom();
      }, 100);
    },
  });

  return (
    <main className='min-h-[calc(100vh-163px)] flex flex-col justify-between'>
      <AuthCheck>
        <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
          <SideNav username={username} />
        </div>

        <div className='md:w-[600px] md:mx-auto '>
          <div className='mt-8 m-5 flex justify-between '>
            <div>
              <h2 className='font-CircularMedium '>Hello, @{username}</h2>
              <Link className='hover:text-orange-600' href={`/${username}`}>
                <p className='hover:text-orange-600 hover:cursor-pointer'>
                  getme.pizza/{username}
                </p>
              </Link>
            </div>

            <div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://getme.pizza/${username}`
                  );
                  callShare();
                }}
                className='m-auto flex font-CircularMedium bg-yellow-300 rounded-full py-3 w-32 text-center md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black'
              >
                <MdIosShare className='text-xl ml-5 mr-2' />{" "}
                {share ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
          <hr />
          <h4 className='mt-8 mx-4 font-CircularMedium text-xl'>
            Available to withdraw:
          </h4>
          <div className='flex justify-between '>
            <div className='  m-5'>
              <h4 className='font-CircularMedium '>
                <span className='text-xs mr-2 align-bottom '>
                  <Image width='20px' height='20px' src={BinanceLogo} />
                </span>
                TBNB{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-4xl'>
                {earningsBinance}
              </p>
            </div>
            <div className='  m-5'>
              <h4 className='font-CircularMedium '>
                <span className='text-xs mr-2 align-bottom '>
                  <Image width='20px' height='20px' src={PolygonLogo} />
                </span>
                MATIC{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-4xl'>
                {earningsPoly}{" "}
              </p>
            </div>
            <div className='  m-5'>
              <h4 className='font-CircularMedium '>
                <span className='text-xs mr-2 align-bottom '>
                  <Image width='20px' height='20px' src={FantomLogo} />
                </span>
                FTM{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-4xl'>0</p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              write?.();
            }}
          >
            <div className='text-center mb-4'>
              <button
                disabled={
                  !write || isLoading || txLoading || currentChainEarnings === 0
                }
                className=' font-CircularMedium bg-yellow-300 rounded-full mt-3 py-3 h-[50px]  w-72 text-center disabled:bg-gray-200 md:max-w-xs md:mx-auto disabled:hover:scale-100 hover:scale-105 transition-all dark:text-black'
              >
                {isLoading && (
                  <>
                    <div role='status'>
                      <svg
                        className='inline mb-1 mr-4 w-6 h-6 text-gray-200 animate-spin dark:text-gray-300 fill-yellow-400'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span className=''>Waiting for wallet...</span>
                    </div>
                  </>
                )}
                {txLoading && (
                  <>
                    <div role='status'>
                      <svg
                        className='inline mb-1 mr-4 w-6 h-6 text-gray-200 animate-spin dark:text-gray-300 fill-yellow-400'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span className=''>Withdrawing</span>
                    </div>
                  </>
                )}
                {!isLoading && !txLoading && "Withdraw"}
              </button>
            </div>
          </form>

          {isConnected && (
            <div className='mb-4 text-center'>
              <p className='font-CircularMedium text-xs mx-auto  w-[300px]'>
                {currentChainEarnings === 0 ? (
                  `You have no tips on ${chain.name}. Switch chains or share your link to get more tips!`
                ) : (
                  <>
                    {address === userETH
                      ? `You are connected to withdraw your ${chain.name} tips. Switch chains to withdraw on other chains.`
                      : `Please connect to your address set in My Account (${userETH}) to withdraw your tips.`}
                  </>
                )}
              </p>
            </div>
          )}

          <div className='mb-8'>
            <ConnectButton />
          </div>

          <hr />
          {/* <div className='mt-10 m-5'>
            <p className='text-gray-500'>
              getme.pizza is currently invite only...
            </p>

            <form className='mt-4'>
              <div className=''>
                <input
                  className='w-full px-4 mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-black dark:border-zinc-300  active:border-black focus:ring-0 md:mx-auto'
                  type='text'
                  placeholder='yourfriendsgmailaddy@gmail.com'
                />
              </div>

              <button
                type='submit'
                className=' bg-yellow-300 rounded-full mt-2 py-3 min-w-full text-center font-CircularMedium md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black'
              >
                Send Invite
              </button>
            </form>
          </div> */}
        </div>
      </AuthCheck>
      <PoweredBy />
    </main>
  );
}
