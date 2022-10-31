import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <>
          <div className='text-center'>
            <iframe
              className='m-auto text-center'
              src='https://giphy.com/embed/3o6MbdPcxvF7Hb5G3S'
              width='480'
              height='362'
              frameBorder='0'
              allowFullScreen
            ></iframe>
            <h1 className='mt-10 font-Montserrat text-gray-500 font-bold text-center text-xl'>
              {" "}
              Your access is denied.
            </h1>
            <Link href='/enter'>
              <button className='m-auto font-CircularMedium bg-yellow-300 rounded-full mt-6 py-3 w-72 text-center md:max-w-xs md:mx-auto'>
                Sign in
              </button>
            </Link>
          </div>
        </>
      );
}
