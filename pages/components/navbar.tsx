import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../libs/context";
import { useState } from "react";

import { FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import MobileNav from "./mobileNav";

export default function NavBar() {
  const { user, username } = useContext(UserContext);
  const [mobileNavOpen, setMovbileNavOpen] = useState(false);

  return (
    <main className=' bg-slate-50 pt-10 font-CircularMedium '>
      <section className='px-3 py-3  md:px-20 md:bg-white lg:max-w-4xl lg:mx-auto rounded-full '>
        <nav className='flex justify-between   '>
          <Link href={"/"}>
            <h1 className='text-2xl md:pl-4'>getme.🍕</h1>
          </Link>

          <ul className='flex items-center md:mr-4'>
            {username && (
              <div className='bg-white flex rounded-full p-2 -mt-2'>
                <p
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
                </p>
                <li className='mx-2  text-sm'>
                  <Link href={`/dashboard`}>
                    <img
                      referrerPolicy='no-referrer'
                      className='rounded-full cursor-pointer'
                      width={"30px"}
                      src={user?.photoURL}
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
                  <Link href={"/faq"}>FAQ</Link>
                </li>
                <li className='mx-2  text-sm'>
                  <Link href={"/explore"}>Explore</Link>
                </li>
                <li className='mx-2 bg-yellow-400 rounded-full text-sm px-4  py-2'>
                  <Link href={"/enter"}>Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </main>
  );
}
