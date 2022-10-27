import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../libs/context";

import { FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import MobileNav from "./mobileNav";
import { CgProfile } from "react-icons/cg";

export default function NavBar() {
  const { username, userPhoto } = useContext(UserContext);

  const [mobileNavOpen, setMovbileNavOpen] = useState(false);

  return (
    <main className=' bg-slate-50 pt-10 font-CircularMedium '>
      <section className='px-3 py-2  md:px-5 md:bg-white lg:max-w-4xl lg:mx-auto rounded-full '>
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
                <a className='text-2xl md:pl-4 cursor-pointer'>getme.🍕</a>
              </Link>
            </div>
          )}

          <ul className='flex items-center '>
            {username && (
              <div className='bg-white flex rounded-full p-2 '>
                <div
                  className='p-2 text-gray-700 rounded-md outline-none'
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
                      className='rounded-full cursor-pointer'
                      width={"35px"}
                      src={userPhoto}
                    />
                  </Link>
                </li>
                <div>
                  <div
                    className={`absolute top-0 right-0 w-2/3 text-left h-full bg-white md:w-1/4 ${
                      mobileNavOpen ? "absolute" : "hidden"
                    }`}
                  >
                    <button
                      className='absolute right-0 p-2 text-gray-700 rounded-md outline-none focus:border-gray-400'
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
                <li className='mx-2  text-sm'>
                  <Link href={"/faq"}>
                    <a>FAQ</a>
                  </Link>
                </li>
                <li className='mx-2  text-sm'>
                  <Link href={"/explore"}>
                    <a>Explore</a>
                  </Link>
                </li>
                <li className='mx-2 hover:scale-105 transition-all'>
                  <Link href={"/enter"}>
                    <a className='bg-white rounded-full text-sm px-4  py-2 cursor-pointer '>
                      Sign in
                    </a>
                  </Link>
                </li>
                <li className='mx-2 hover:scale-105 transition-all'>
                  <Link href={"/enter"}>
                    <a className='bg-yellow-300 rounded-full text-sm px-4  py-2 cursor-pointer '>
                      Sign in
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </main>
  );
}
