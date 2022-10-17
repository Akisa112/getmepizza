import AuthCheck from "./components/AuthCheck";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { useContext } from "react";
import { UserContext } from "./libs/context";
import { MdIosShare } from "react-icons/md";

export default function Dashboard({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main className='h-screen flex flex-col justify-between'>
      <NavBar />
      <AuthCheck>
        <div className='mt-4 m-5 flex justify-between'>
          <div>
            <h2 className='font-CircularMedium'>Hello, {user.displayName}</h2>
            <p className='text-sm '>getme.pizza/{username}</p>
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
            <div className='mx-2 text-center py-2  rounded-lg bg-white mb-4 text-lg border-2 border-black lg:max-w-lg lg:mx-auto'>
              <input
                className='w-full px-4'
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
      </AuthCheck>
      <Footer />
    </main>
  );
}
