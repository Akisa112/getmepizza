import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork,
  useContractRead,
} from "wagmi";
import { useState, useEffect, useContext } from "react";
import debounce from "lodash.debounce";
import { ethers, BigNumber } from "ethers";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { successTxContext } from "./UserProfile";
import Image from "next/image";
import MetaMaskIcon from "../public/metamaskicon.webp";
import { GiFullPizza } from "react-icons/gi";

export default function BuyPizza(user) {
  let isConnected = null;
  isConnected = useAccount();
  const [donaterName, setDonaterName] = useState("@someone");
  const [memo, setMemo] = useState("...just bought you a pizza.");
  const [finalDonaterName, setFinalDonaterName] = useState("@someone");
  const [finalMemo, setFinalMemo] = useState("...just bought you a slice");
  const [slices, setSlices] = useState(1);

  const { setSuccesfullTx } = useContext(successTxContext);

  const debouncedDonatorName = debounce(async (donaterName) => {
    setFinalDonaterName(donaterName);
  }, 500);

  const debouncedMemo = debounce(async (memo) => {
    setFinalMemo(memo);
  }, 500);

  // Everytime the username formvalue changes, checkUsername
  useEffect(() => {
    debouncedDonatorName(donaterName);
    debouncedMemo(memo);
  }, [donaterName, memo]);

  const { chain } = useNetwork();
  const [chainSymbol, setChainSybol] = useState("");

  useEffect(() => {
    try {
      setChainSybol(chain.nativeCurrency.symbol);
    } catch (error) {}
  }, [chain]);

  const {
    data: ReadDataPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_POLY_CONTRACT,
    abi: [
      {
        inputs: [],
        name: "getLatestPrice",
        outputs: [
          {
            internalType: "int256",
            name: "",
            type: "int256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getLatestPrice",
    watch: true,
  });
  let value = 0;
  try {
    value = ReadDataPrice.toNumber() * 10000000000;

    console.log((value * slices).toString());
  } catch (error) {}

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_POLY_CONTRACT,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_slices",
            type: "uint256",
          },
        ],
        name: "tipPizza",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "tipPizza",
    overrides: {
      value: BigNumber.from((value * slices).toString()),
    },
    args: [
      user.user.ethAddress,
      finalDonaterName,
      finalMemo,
      BigNumber.from(slices),
    ],
    enabled: true,
  });

  const { data, isLoading, error, isError, write } = useContractWrite(config);

  const { isLoading: txLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toast.success(
        `You have tipped ${user.user.displayName}! \n We have sent you ${slices} 🍕 points!`,
        { duration: 3000 }
      );
      setSuccesfullTx(true);
      setTimeout(() => {
        setSuccesfullTx(false);
      }, 5000);
    },
  });

  const addTokenToMM = async () => {
    try {
      const { ethereum } = window;
      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0xAe634f8A025AAf53cc3AfCf29C4323085b40406F", // ERC20 token address
            symbol: `🍕`,
            decimals: 18,
            image:
              "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f355.png",
          },
        },
      });
    } catch (ex) {
      // We don't handle that error for now
      // Might be a different wallet than Metmask
      // or user declined
      console.error(ex);
    }
  };

  console.log(prepareError);
  return (
    <div className='mt-1  mx-4   md:w-[400px] h-[550px] flex flex-col justify-center  ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-3xl '>
      <h4 className='font-CircularMedium text-2xl'>
        Buy <span className='text-gray-500'>{user.user.displayName}</span> a
        pizza
      </h4>
      <div className='mt-4 py-4 m-4'>
        <p className='font-Montserrat text-gray-500'>
          <span className='text-5xl -mr-1 align-middle'>🍕</span> x
          <button
            disabled={slices === 1}
            onClick={() => {
              setSlices(1);
            }}
            className='ml-2 px-4 text-black bg-white disabled:ring-2 disabled:ring-yellow-400 py-2 mx-1 border-2 border-zinc-500 rounded-full hover:scale-105 transition-all'
          >
            1
          </button>
          <button
            disabled={slices === 2}
            onClick={() => {
              setSlices(2);
            }}
            className=' px-4 text-black bg-white disabled:ring-2 disabled:ring-yellow-400 py-2 mx-1 border-2 border-zinc-500 rounded-full hover:scale-105 transition-all'
          >
            2
          </button>
          <button
            disabled={slices === 5}
            onClick={() => {
              setSlices(5);
            }}
            className=' px-4 text-black bg-white disabled:ring-2 disabled:ring-yellow-400 py-2 mx-1 border-2 border-zinc-500 rounded-full hover:scale-105 transition-all'
          >
            5
          </button>
          <button
            disabled={slices === 10}
            onClick={() => {
              setSlices(10);
            }}
            className=' px-4 text-black bg-white disabled:ring-2 disabled:ring-yellow-400 py-2 mx-1 border-2 border-zinc-500 rounded-full hover:scale-105 transition-all'
          >
            10
          </button>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <div className='mx-10'>
          <input
            className='min-w-full mt-1 p-2 ring-1 ring-zinc-400 text-zinc-500 dark:bg-zinc-800 rounded-lg'
            placeholder={donaterName}
            onChange={(e) => setDonaterName(e.target.value)}
            value={donaterName}
            maxLength={33}
          />
        </div>
        <div className='mx-10'>
          <input
            className='min-w-full mt-3 p-2 ring-1 ring-zinc-400 text-zinc-500 dark:bg-zinc-800 rounded-lg'
            placeholder={memo}
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
            {...{
              maxLength: 33,
            }}
          />
        </div>
        <div id='buypizzaconnecter' className='mt-4 mx-4'>
          <ConnectButton />
        </div>
        {isConnected && (
          <button
            disabled={!write || txLoading || isLoading}
            type='submit'
            className='font-CircularMedium bg-yellow-300 rounded-full mt-3 py-3 w-72 text-center disabled:bg-gray-200 md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black disabled:scale-100'
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
                  <span className=''>Sending Tip</span>
                </div>
              </>
            )}
            {!chainSymbol && `Support $${slices}`}
            {!isLoading &&
              !txLoading &&
              chainSymbol &&
              `Support $${slices} 
                
                (${((value * slices) / 1000000000000000000).toFixed(
                  10
                )}..) ${chainSymbol}`}
          </button>
        )}
        <div className='relative inline-block tooltip'>
          <p className='mt-4 uppercase text-xs font-CircularMedium text-green-600 cursor-help'>
            Tip {user.user.displayName} ${slices} & receive {slices} 🍕 Points*
          </p>
          <div className='flex flex-col p-4 top-8 bg-black bg-opacity-90 text-white w-60 h-30 rounded-md z-20 absolute right-3 invisible tooltip-item transition-all '>
            <p className='font-CircularMedium text-sm'>
              🍕 points can be collected, traded and used in our ecosystem.{" "}
              <Link href='./faq#coupons'>
                <a className='text-orange-600 cursor-pointer'>Learn More</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
      {isConnected && (
        <button
          className='w-[160px] flex items-center justify-center mx-auto mt-2 p-1 text-xs font-CircularMedium bg-yellow-200 rounded-full hover:scale-105 transition-all'
          onClick={() => addTokenToMM()}
        >
          {" "}
          <span className='mt-[3px]'>
            <Image width={15} height={15} src={MetaMaskIcon} />
          </span>
          <span className='ml-2 dark:text-black'>Add 🍕 Points</span>
        </button>
      )}
    </div>
  );
}
