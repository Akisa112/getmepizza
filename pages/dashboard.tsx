import AuthCheck from "./components/AuthCheck";
import NavBar from "./components/navbar";
import PoweredBy from "./components/poweredby";
import { useContext } from "react";
import { UserContext } from "./libs/context";
import { MdIosShare } from "react-icons/md";
import Link from "next/link";
import { getUserWithUsername } from "./libs/firebase";
import { useState } from "react";
import MobileNav from "./components/mobileNav";

// 1. Show username
// 2. TO DO: Show earnings from contract using Moralis
// 3. TO DO: Invite functionality
export default function Dashboard({}) {
  const { username } = useContext(UserContext);

  const [userDisplayName, setUserDisplayName] = useState("");

  const fetchUser = async () => {
    try {
      const userDoc = await getUserWithUsername(username);
      const user = userDoc.data();
      setUserDisplayName(user.displayName);
    } catch (error) {
      console.log(error);
    }
  };
  fetchUser();

  return (
    <main className='h-screen flex flex-col justify-between '>
      <NavBar />
      <AuthCheck>
        <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
          <MobileNav username={username} />
        </div>

        <div className='md:w-[600px] md:mx-auto'>
          <div className='mt-4 m-5 flex justify-between '>
            <div>
              <h2 className='font-CircularMedium '>Hello, {userDisplayName}</h2>
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
          <div className='mt-10 mb-12 m-5'>
            <h4 className='font-CircularMedium text-xl'>Earnings</h4>
            <p className='mt-4 font-CircularMedium text-6xl'>$0</p>
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
