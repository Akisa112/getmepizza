import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function BuyPizza(user) {
  console.log(user.user);
  let isConnected = null;
  isConnected = useAccount();
  return (
    <div className='mt-1  m-4 w-[400px] h-[450px] flex flex-col justify-center  border-2 border-gray-200 rounded-lg '>
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

      <form>
        <div className='mx-4'>
          <textarea
            className='min-w-full mt-1 border-2 border-gray-200 rounded-lg bg-gray-100 '
            placeholder='Say something nice... (optional)'
          />
        </div>
        <div className='mt-3 mx-4'>
          <ConnectButton />
        </div>
        {isConnected && (
          <button
            type='submit'
            className='font-CircularMedium bg-yellow-400 rounded-full mt-5 py-3 w-72 text-center md:max-w-xs md:mx-auto'
          >
            Support $5
          </button>
        )}
      </form>
    </div>
  );
}
