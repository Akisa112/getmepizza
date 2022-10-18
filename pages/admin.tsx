import { auth, firestore, googleAuthProvider } from "./libs/firebase";
import NavBar from "./components/navbar";
import Image from "next/image";
import PoweredBy from "./components/poweredby";
import { UserContext } from "./libs/context";
import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AuthCheck from "./components/AuthCheck";
import Link from "next/link";

import MobileNav from "./components/mobileNav";

import { getUserWithUsername, postToJSON } from "./libs/firebase";

export default function AdminPage({}) {
  const { username } = useContext(UserContext);

  const [userDisplayName, setUserDisplayName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userWebsite, setUserWebsite] = useState("");
  const [userEthAddy, setUserEthAddy] = useState("");

  const fetchUser = async () => {
    try {
      const userDoc = await getUserWithUsername(username);
      const user = userDoc.data();
      setUserDisplayName(user.displayName);
      setUserImage(user.photoURL);
      setUserAbout(user.about);
      setUserWebsite(user.website);
      setUserEthAddy(user.ethAddress);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <main className='h-screen flex flex-col justify-between'>
      <NavBar />
      <AuthCheck>
        <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
          <MobileNav username={username} />
        </div>
        <form
          className='mx-4 mt-6 md:w-[600px] md:mx-auto'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mx-4 flex justify-between'>
            <img
              referrerPolicy='no-referrer'
              src={userImage}
              className='w-16 mb-6 rounded-full'
            />
            <div>
              <h1 className='text-right mb-2 mt-2 font-CircularMedium text-2xl'>
                {username}
              </h1>
              <small className='text-xs'>username cannot be changed*</small>
            </div>
          </div>
          <h4 className='font-Montserrat mb-3 mx-2 text-left'>Display Name</h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white mb-4 text-lg border-2 border-black lg:mx-auto'>
            <input
              className='w-full px-4 border-none focus:ring-0'
              type='text'
              placeholder={userDisplayName}
              {...register("name", { maxLength: 80 })}
            />
          </div>
          <p className='text-red-500 mx-3 text-left mb-4'>
            {errors.name && "Please enter a name"}
          </p>

          <h4 className='font-Montserrat mb-3 mx-2 text-left'>About</h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white mb-4 text-lg border-2 border-black  lg:mx-auto'>
            <textarea
              className='w-full px-4 border-none focus:ring-0'
              rows={4}
              placeholder={userAbout}
              {...register("about", {
                minLength: 20,
                maxLength: 128,
              })}
            />
          </div>
          <p className='text-red-500 mx-3 text-left mb-4'>
            {errors.about &&
              "Must be atleast 20 characters and less than 128 characters"}
          </p>

          <h4 className='font-Montserrat mb-3 mx-2 text-left '>
            Website or social link
          </h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white mb-4 text-lg border-2 border-black  lg:mx-auto'>
            <input
              className='w-full px-4 border-none focus:ring-0'
              type='url'
              placeholder={userWebsite}
              {...register("website", { maxLength: 80 })}
            />
          </div>
          <p className='text-red-500 mx-3 text-left mb-4'>
            {errors.website && "Please enter a valid link"}
          </p>

          <h4 className='font-Montserrat mb-3 mx-2 text-left'>
            EVM Address (ETH, MATIC, BSC, ETC)
          </h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white mb-4 text-lg border-2 border-black  lg:mx-auto'>
            <input
              className='w-full px-4 border-none focus:ring-0'
              type='text'
              placeholder={userEthAddy}
              {...register("ethAddress", {
                maxLength: 64,
                pattern: /^0x[a-fA-F0-9]{40}$/g,
              })}
            />
          </div>
          <p className='text-red-500 mx-3 text-left mb-4'>
            {errors.ethAddress && "Please enter a valid address"}
          </p>

          <button
            type='submit'
            className=' bg-yellow-400 rounded-full mt-6 py-3 min-w-full text-center font-CircularMedium md:max-w-xs md:mx-auto'
          >
            Save Changes
          </button>
        </form>
      </AuthCheck>
      <PoweredBy />
    </main>
  );
}
