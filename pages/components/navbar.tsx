import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../libs/context";

import { FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import MobileNav from "./mobileNav";

export default function NavBar(props) {
  const { username, userPhoto } = useContext(UserContext);

  const [mobileNavOpen, setMovbileNavOpen] = useState(false);
  const changeMode = props.changeMode;
  const darkMode = props.darkMode;

  return (
    <main className=' bg-slate-50 pt-10 pb-10 font-CircularMedium dark:bg-zinc-900'>
      <section className='px-3 py-4  md:px-5 md:bg-white md:dark:bg-zinc-800 lg:max-w-4xl lg:mx-auto rounded-full '>
        <nav className='flex justify-between   '>
          {username ? (
            <div className='pt-2'>
              <Link href={"/"}>
                <a className='text-4xl md:pl-1 cursor-pointer self-center'>
                  🍕
                </a>
              </Link>
            </div>
          ) : (
            <div>
              <Link href={"/"}>
                <a className='text-2xl md:pl-4 cursor-pointer dark:text-white'>
                  getme.🍕
                </a>
              </Link>
            </div>
          )}

          <ul className='flex items-center '>
            {username && (
              <div className='bg-white flex rounded-full p-2 dark:bg-zinc-800'>
                <div
                  className='p-2 text-gray-700 rounded-md outline-none dark:text-slate-50'
                  onClick={() => setMovbileNavOpen(!mobileNavOpen)}
                >
                  {mobileNavOpen ? (
                    <>
                      <AiOutlineClose />
                    </>
                  ) : (
                    <div className='lg:hidden'>
                      <FaHamburger />
                    </div>
                  )}
                </div>
                <li className='mx-2 '>
                  <Link href={`/dashboard`}>
                    <img
                      referrerPolicy='no-referrer'
                      className='rounded-full cursor-pointer max-h-[35px]'
                      width={"35px"}
                      height={"35px"}
                      src={userPhoto}
                    />
                  </Link>
                </li>
                <div>
                  <div
                    className={`absolute z-10 top-0 right-0 w-2/3 text-left h-full bg-white dark:bg-zinc-800 md:w-1/4 ${
                      mobileNavOpen ? "absolute" : "hidden"
                    }`}
                  >
                    <button
                      className='absolute right-0 p-2 text-gray-700 dark:text-slate-50 rounded-md outline-none focus:border-gray-400'
                      onClick={() => setMovbileNavOpen(!mobileNavOpen)}
                    >
                      <AiOutlineClose />
                    </button>

                    <MobileNav username={username} />
                  </div>
                </div>
              </div>
            )}

            {!username && (
              <>
                <li className='mx-2  text-sm hover:scale-105 transition-all'>
                  <Link href={"/faq"}>
                    <a className='bg-white dark:bg-zinc-800 dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer '>
                      FAQ
                    </a>
                  </Link>
                </li>
                <li className='mx-2  text-sm hover:scale-105 transition-all'>
                  <Link href={"/explore"}>
                    <a className='bg-white dark:bg-zinc-800 dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer '>
                      Explore
                    </a>
                  </Link>
                </li>
                <li className='mx-2 hover:scale-105 transition-all'>
                  <Link href={"/enter"}>
                    <a className='bg-white dark:bg-zinc-800 dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer '>
                      Sign in
                    </a>
                  </Link>
                </li>
                <li className='mx-2 hover:scale-105 transition-all'>
                  <Link href={"/enter"}>
                    <a className='bg-yellow-300 rounded-full text-sm px-4  py-2 cursor-pointer dark:text-black'>
                      Sign up
                    </a>
                  </Link>
                </li>
              </>
            )}
            <button
              className='ml-2 p-2 text-gray-700 dark:text-white rounded-md outline-none focus:border-gray-400 hover:scale-105 transition-all'
              onClick={() => changeMode(!darkMode)}
            >
              {darkMode ? <FiMoon /> : <FiSun />}
            </button>
          </ul>
        </nav>
      </section>
    </main>
  );
}
