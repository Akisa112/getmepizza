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

    console.log(BigNumber.from((value * slices).toString()));
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
        name: "buyPizza",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "buyPizza",
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
        `You have tipped ${user.user.displayName}! \n We have sent you ${slices} $pizza points!`,
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
            address: "0x8f9AeAd37C002d2FF07B6951b79D48E3Ae1aC38b", // ERC20 token address
            symbol: `PIZZA`,
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
                  5
                )}..) ${chainSymbol}`}
          </button>
        )}
        <div className='relative inline-block tooltip'>
          <p className='mt-4 uppercase text-xs font-CircularMedium text-green-600 cursor-help'>
            Tip {user.user.displayName} ${slices} & receive {slices} $Pizza
            Points*
          </p>
          <div className='flex flex-col p-4 top-8 bg-black bg-opacity-90 text-white w-60 h-30 rounded-md z-20 absolute right-3 invisible tooltip-item transition-all '>
            <p className='font-CircularMedium text-sm'>
              Pizza points can be collected, traded and used in our ecosystem.{" "}
              <Link href='./faq'>
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
          <span className='ml-2 dark:text-black'>Add $PIZZA Points</span>
        </button>
      )}
    </div>
  );
}
