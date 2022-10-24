import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { ethers } from "ethers";
import Image from "next/image";
import dancingpizza from "../../public/dancingpizza.gif";

export default function BuyPizza(user) {
  let isConnected = null;
  isConnected = useAccount();
  const [donaterName, setDonaterName] = useState("@someone");
  const [memo, setMemo] = useState("...just bought you a pizza frend.");
  const [finalDonaterName, setFinalDonaterName] = useState("@someone");
  const [finalMemo, setFinalMemo] = useState(
    "...just bought you a pizza frend."
  );

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

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xb4D137536Ae7962eFD6b09905801D8108B43d0D8",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
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
        ],
        name: "buyPizza",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "buyPizza",
    overrides: {
      value: ethers.utils.parseEther("0.01"),
    },
    args: [user.user.ethAddress, finalDonaterName, finalMemo],
    enabled: true,
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (isSuccess) {
  }

  return (
    <div className='mt-1  m-4 w-[400px] h-[500px] flex flex-col justify-center  border-2 border-gray-200 rounded-lg '>
      <h4 className='font-CircularMedium text-2xl'>
        Buy <span className='text-gray-500'>{user.user.displayName}</span> a
        pizza
      </h4>
      <div className='mt-10 py-6 m-4  border-2 border-gray-200 rounded-lg bg-orange-50'>
        <p className='font-Montserrat text-gray-500'>
          <span className='text-5xl align-middle'>🍕</span> x
          <span className='ml-4 px-4 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            1
          </span>
          <span className='px-4 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            2
          </span>
          <span className='px-4 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            5
          </span>
          <span className='px-3 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            10
          </span>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <div className='mx-4'>
          <input
            className='min-w-full mt-1 p-2 border-2 border-gray-200 rounded-lg bg-gray-100 '
            placeholder={donaterName}
            onChange={(e) => setDonaterName(e.target.value)}
            value={donaterName}
          />
        </div>
        <div className='mx-4'>
          <textarea
            className='min-w-full mt-3 border-2 border-gray-200 rounded-lg bg-gray-100 '
            placeholder={memo}
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
          />
        </div>
        <div className='mt-3 mx-4'>
          <ConnectButton />
        </div>
        {isConnected && !isSuccess && (
          <button
            disabled={!write || isLoading}
            type='submit'
            className='font-CircularMedium bg-yellow-400 rounded-full mt-5 py-3 w-72 text-center disabled:bg-gray-300 md:max-w-xs md:mx-auto hover:scale-105 transition-all'
          >
            {isLoading ? "Processing..." : "Support $5"}
          </button>
        )}
      </form>

      {isSuccess && (
        <div className='mx-8  rounded-2xl'>
          <h4 className='mt-3  font-CircularMedium text-2xl '>
            {user.user.displayName} about to eat!
          </h4>
          <h4 className=' font-CircularMedium'>
            ...we've sent you an NFT as receipt. :)
          </h4>
          <div className='absolute left-1/3 top-1/2 mt-28'>
            <Image src={dancingpizza} />
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
}
