import AuthCheck from "../components/AuthCheck";

import PoweredBy from "../components/poweredby";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { MdIosShare } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import SideNav from "../components/sideNav";
import { getEarnings } from "../lib/moralis";

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
  const [earningsFantom, setEarningsFantom] = useState(0);

  const [currentChainEarnings, setCurrentChainEarnings] = useState(0);

  const [share, setShare] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const getEarningsFrom = async () => {
    try {
      const getPoly = await getEarnings(userETH, "Polygon");
      setEarningsPoly(Number(getPoly) / 1000000000000000000);
      const getBinance = await getEarnings(userETH, "Smart Chain");
      setEarningsBinance(Number(getBinance) / 1000000000000000000);
      const getFantom = await getEarnings(userETH, "Fantom");
      setEarningsFantom(Number(getFantom) / 1000000000000000000);
      if (chain.name === "Polygon") {
        setCurrentChainEarnings(Number(getPoly) / 1000000000000000000);
      } else if (chain.name === "Smart Chain") {
        setCurrentChainEarnings(Number(getBinance) / 1000000000000000000);
      } else if (chain.name === "Fantom") {
        setCurrentChainEarnings(Number(getFantom) / 1000000000000000000);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getEarningsFrom();
  }, [userETH]);

  useEffect(() => {
    if (chain) {
      if (chain.name === "Polygon") {
        setCurrentChainEarnings(earningsPoly);
      } else if (chain.name === "Smart Chain") {
        setCurrentChainEarnings(earningsBinance);
      } else if (chain.name === "Fantom") {
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
    address: "0xAe634f8A025AAf53cc3AfCf29C4323085b40406F",
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
          <h4 className='mt-8 mx-4 font-CircularMedium text-xl text-center lg:text-left'>
            Available to withdraw:
          </h4>
          <div className='lg:flex  lg:justify-between '>
            <div className='text-center lg:text-left m-5'>
              <h4 className='font-CircularMedium '>
                <span className='text-xs mr-2 align-bottom '>
                  <Image width='20px' height='20px' src={BinanceLogo} />
                </span>
                BNB{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-2xl'>
                {earningsBinance.toFixed(5)}...
              </p>
            </div>
            <div className='text-center lg:text-left m-5'>
              <h4 className='font-CircularMedium '>
                <span className='text-xs mr-2 align-bottom '>
                  <Image width='20px' height='20px' src={PolygonLogo} />
                </span>
                MATIC{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-2xl'>
                {earningsPoly.toFixed(5)}...
              </p>
            </div>
            <div className='text-center lg:text-left m-5'>
              <h4 className='font-CircularMedium '>
                <span className='text-xs mr-2 align-bottom '>
                  <Image width='20px' height='20px' src={FantomLogo} />
                </span>
                FTM{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-2xl'>
                {earningsFantom.toFixed(5)}...
              </p>
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
                  !write ||
                  isLoading ||
                  txLoading ||
                  currentChainEarnings === 0 ||
                  address !== userETH
                }
                className=' font-CircularMedium bg-yellow-300 rounded-full mt-3 py-3 h-[50px]  w-72 text-center disabled:bg-gray-200 md:max-w-xs md:mx-auto disabled:hover:scale-100 hover:scale-105 transition-all dark:text-black'
              >
                {isLoading && (
                  <>
                    <div role='status'>
                      <GiFullPizza className='inline text-2xl animate-spin -mt-1 mr-3 text-orange-600' />
                      <span className=''>Waiting for wallet...</span>
                    </div>
                  </>
                )}
                {txLoading && (
                  <>
                    <div role='status'>
                      <GiFullPizza className='inline text-2xl animate-spin -mt-1 mr-3 text-orange-600' />
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
