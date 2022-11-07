import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";

import { FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import MobileNav from "./mobileNav";

export default function NavBar(props) {
  const { username, userPhoto } = useContext(UserContext);

  const [mobileNavOpen, setMovbileNavOpen] = useState(false);

  const closeNav = (arg) => {
    setMovbileNavOpen(arg);
  };

  const changeMode = props.changeMode;
  const darkMode = props.darkMode;

  return (
    <main className='bg-none   md:pt-5 font-CircularMedium tracking-wide'>
      <section className='px-3 py-4 md:bg-white md:dark:bg-zinc-800   md:px-5  lg:max-w-4xl lg:mx-auto rounded-full '>
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
                <a className='text-2xl md:pl-4 cursor-pointer dark:text-white lg:hidden'>
                  🍕
                </a>
              </Link>

              <Link href={"/"}>
                <a className='text-2xl md:pl-4 cursor-pointer dark:text-white hidden lg:block'>
                  getme.🍕
                </a>
              </Link>
            </div>
          )}

          <ul className='flex items-center '>
            {username && (
              <div className='bg-white  flex rounded-full p-2 dark:bg-zinc-800'>
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
                <button
                  className='ml-2 p-2 text-gray-700 dark:text-white rounded-md outline-none focus:border-gray-400 hover:scale-105 transition-all'
                  onClick={() => changeMode(!darkMode)}
                >
                  {darkMode ? <FiMoon /> : <FiSun />}
                </button>
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

                    <MobileNav closenav={closeNav} username={username} />
                  </div>
                </div>
              </div>
            )}

            {!username && (
              <>
                <li className='mx-2  text-sm hover:scale-105 transition-all'>
                  <Link href={"/feed"}>
                    <a className=' dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer hidden md:block'>
                      Latest Posts
                    </a>
                  </Link>
                </li>
                <li className='mx-2  text-sm hover:scale-105 transition-all'>
                  <Link href={"/explore"}>
                    <a className=' dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer hidden md:block'>
                      Explore
                    </a>
                  </Link>
                </li>
                <li className='mx-2  text-sm hover:scale-105 transition-all'>
                  <Link href={"/faq"}>
                    <a className=' dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer hidden md:block'>
                      F.A.Q.
                    </a>
                  </Link>
                </li>
                <li className='mx-2  text-sm hover:scale-105 transition-all'>
                  <Link href={"/about"}>
                    <a className=' dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer hidden md:block'>
                      About
                    </a>
                  </Link>
                </li>
                <li className='mr-2 hover:scale-105 transition-all md:mx-2'>
                  <Link href={"/enter"}>
                    <a className=' dark:text-white rounded-full text-sm px-4  py-2 cursor-pointer '>
                      Sign in
                    </a>
                  </Link>
                </li>
                <li className='hover:scale-105 transition-all md:mx-2'>
                  <Link href={"/enter"}>
                    <a className='bg-yellow-300 rounded-full text-sm px-4  py-2 cursor-pointer dark:text-black'>
                      Sign up
                    </a>
                  </Link>
                </li>
                <button
                  className='ml-2 p-2 text-gray-700 dark:text-white rounded-md outline-none focus:border-gray-400 hover:scale-105 transition-all'
                  onClick={() => changeMode(!darkMode)}
                >
                  {darkMode ? <FiMoon /> : <FiSun />}
                </button>
              </>
            )}
          </ul>
        </nav>
      </section>
    </main>
  );
}
