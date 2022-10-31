import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState, useEffect, useContext } from "react";
import debounce from "lodash.debounce";
import { ethers, BigNumber } from "ethers";

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
    address: "0x46cB023CD13Fab6315E0d6d4C87566ABA4A18b43",
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
          {
            internalType: "bool",
            name: "_receipt",
            type: "bool",
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
    args: [
      user.user.ethAddress,
      finalDonaterName,
      finalMemo,
      BigNumber.from(5),
      true,
    ],
    enabled: true,
  });

  const { data, isLoading, error, isError, write } = useContractWrite(config);

  const { isLoading: txLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toast.success(
        `You have tipped ${user.user.displayName}! \n We have sent you an NFT as receipt...`,
        { duration: 3000 }
      );
      setSuccesfullTx(true);
      setTimeout(() => {
        setSuccesfullTx(false);
      }, 5000);
    },
  });

  return (
    <div className='mt-1  m-4 w-[400px] h-[530px] flex flex-col justify-center  border-2 dark:bg-zinc-800 border-gray-200 rounded-lg '>
      <h4 className='font-CircularMedium text-2xl'>
        Buy <span className='text-gray-500'>{user.user.displayName}</span> a
        pizza
      </h4>
      <div className='mt-6 py-5 m-4  border-2 border-gray-200 rounded-lg bg-orange-50 dark:bg-zinc-800 dark:border-slate-300'>
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
            className='min-w-full mt-1 p-2 border-2 border-gray-200 rounded-lg bg-gray-100 dark:bg-zinc-800 dark:border-slate-300'
            placeholder={donaterName}
            onChange={(e) => setDonaterName(e.target.value)}
            value={donaterName}
          />
        </div>
        <div className='mx-4'>
          <textarea
            className='min-w-full mt-3 border-2 border-gray-200 rounded-lg bg-gray-100 dark:bg-zinc-800 dark:border-slate-300'
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
            disabled={!write || txLoading || isLoading}
            type='submit'
            className='font-CircularMedium bg-yellow-300 rounded-full mt-5 py-3 w-72 text-center disabled:bg-gray-200 md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black'
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
            {!isLoading && !txLoading && "Support"}
          </button>
        )}
      </form>
    </div>
  );
}
