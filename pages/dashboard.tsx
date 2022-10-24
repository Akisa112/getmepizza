import AuthCheck from "./components/AuthCheck";

import PoweredBy from "./components/poweredby";
import { useContext, useEffect } from "react";
import { UserContext } from "./libs/context";
import { MdIosShare } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import MobileNav from "./components/mobileNav";
import { getEarnings } from "./libs/moralis";

import PolygonLogo from "../public/polygon.png";
import BinanceLogo from "../public/binance.png";
import FantomLogo from "../public/fantom.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

// 1. Show username
// 2. TO DO: Show earnings from contract using Moralis
// 3. TO DO: Invite functionality
export default function Dashboard({}) {
  const { username, userETH } = useContext(UserContext);
  const [earningsPoly, setEarningsPoly] = useState(0);

  const getEarningsFrom = async () => {
    const get = await getEarnings(
      "0x9AFd3a2AAC444123b33f1fcD5f26F9B63E9EA53d",
      "MUMBAI"
    );
    setEarningsPoly(Number(get) / 1000000000000000000);
  };

  useEffect(() => {
    if (earningsPoly === 0) {
      getEarningsFrom();
    }
  }, [userETH]);

  return (
    <main className='h-[calc(100vh-107px)] flex flex-col justify-between '>
      <AuthCheck>
        <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
          <MobileNav username={username} />
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
              <button className='m-auto flex font-CircularMedium bg-gray-200 rounded-full py-3 w-28 text-center md:max-w-xs md:mx-auto'>
                <MdIosShare className='text-xl ml-3 mr-2' /> Share
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
                BSC{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-5xl'>
                {earningsPoly}{" "}
              </p>
            </div>
            <div className='  m-5'>
              <h4 className='font-CircularMedium '>
                <span className='text-xs mr-2 align-bottom '>
                  <Image width='20px' height='20px' src={PolygonLogo} />
                </span>
                MATIC{" "}
              </h4>
              <p className='mt-2 font-CircularMedium text-5xl'>
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
              <p className='mt-2 font-CircularMedium text-5xl'>
                {earningsPoly}{" "}
              </p>
            </div>
          </div>
          <div className='text-center mb-4'>
            <button className=' font-CircularMedium bg-yellow-400 rounded-full mt-3 py-3 w-72 text-center disabled:bg-gray-500 md:max-w-xs md:mx-auto'>
              Withdraw
            </button>
          </div>

          <div className='mb-8'>
            <ConnectButton />
          </div>

          <hr />
          <div className='mt-10 m-5'>
            <p className='text-gray-500'>
              getme.pizza is currently invite only...
            </p>

            <form className='mt-4'>
              <div className=''>
                <input
                  className='w-full px-4 mx-2 text-center py-2  rounded-lg bg-white mb-4 text-lg border-2 border-black active:border-slate-50 active:border-black focus:ring-0 md:mx-auto'
                  type='text'
                  placeholder='yourfriendsgmailaddy@gmail.com'
                />
              </div>

              <button
                type='submit'
                className=' bg-yellow-400 rounded-full mt-2 py-3 min-w-full text-center font-CircularMedium md:max-w-xs md:mx-auto'
              >
                Send Invite
              </button>
            </form>
          </div>
        </div>
      </AuthCheck>
      <PoweredBy />
    </main>
  );
}
