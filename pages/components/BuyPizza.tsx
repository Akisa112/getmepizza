import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState, useEffect, useContext } from "react";
import debounce from "lodash.debounce";
import { ethers } from "ethers";

import { toast } from "react-hot-toast";

import { successTxContext } from "./UserProfile";

export default function BuyPizza(user) {
  let isConnected = null;
  isConnected = useAccount();
  const [donaterName, setDonaterName] = useState("@someone");
  const [memo, setMemo] = useState("...just bought you a pizza frend.");
  const [finalDonaterName, setFinalDonaterName] = useState("@someone");
  const [finalMemo, setFinalMemo] = useState(
    "...just bought you a pizza frend."
  );

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
    onSuccess(data) {
      toast.success(
        `You have tipped ${user.user.displayName}! \n We have sent you an NFT as receipt...`
      );
      setSuccesfullTx(true);
      setTimeout(() => {
        setSuccesfullTx(false);
      }, 5000);
    },
  });

  return (
    <div className='mt-1  m-4 w-[400px] h-[530px] flex flex-col justify-center  border-2 border-gray-200 rounded-lg '>
      <h4 className='font-CircularMedium text-2xl'>
        Buy <span className='text-gray-500'>{user.user.displayName}</span> a
        pizza
      </h4>
      <div className='mt-6 py-5 m-4  border-2 border-gray-200 rounded-lg bg-orange-50'>
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
        <div id='buypizzaconnecter' className='mt-3 mx-4'>
          <ConnectButton />
        </div>
        {isConnected && (
          <button
            disabled={!write || isLoading}
            type='submit'
            className='font-CircularMedium bg-yellow-300 rounded-full mt-5 py-3 w-72 text-center disabled:bg-gray-200 md:max-w-xs md:mx-auto hover:scale-105 transition-all'
          >
            {isLoading ? "Processing..." : "Support $5"}
          </button>
        )}
      </form>

      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
}
