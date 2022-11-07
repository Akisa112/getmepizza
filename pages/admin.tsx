import { auth, firestore } from "../lib/firebase";

import PoweredBy from "../components/poweredby";
import { UserContext } from "../lib/context";
import { useEffect, useContext, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import AuthCheck from "../components/AuthCheck";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import SideNav from "../components/sideNav";
import { useDropzone } from "react-dropzone";

import { BiCamera } from "react-icons/bi";
import { blobToBase64 } from "../lib/hooks";
import { upLoadIPFS } from "../lib/moralis";
import Image from "next/image";

export default function AdminPage({}) {
  return (
    <main className='min-h-[calc(100vh-163px)] flex flex-col justify-between'>
      <AuthCheck>
        <AdminManager />
      </AuthCheck>
      <PoweredBy />
    </main>
  );
}

function AdminManager() {
  const { username, userPhoto } = useContext(UserContext);

  const [userPhotoURL, setUserPhotoURL] = useState(userPhoto);
  const [userEditedPhotoURL, setUserEditedPhotoURL] = useState("");

  const postRef = firestore.collection("users").doc(auth.currentUser.uid);
  const [user] = useDocumentDataOnce(postRef);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const data = await acceptedFiles[0];
      const content = await blobToBase64(data);
      const ipfsObject = await upLoadIPFS(content);
      setUserEditedPhotoURL(ipfsObject);
    } catch (error) {
      alert(error);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: user, mode: "onChange" });

  useEffect(() => {
    reset(user);
  }, [user]);

  const onSubmit = async (values) => {
    console.log(values);

    const displayName = values.displayName;
    const photoURL = userEditedPhotoURL ? userEditedPhotoURL : user.photoURL;
    const username = user.username;
    const about = values.about;
    const website = values.website;
    const ethAddress = values.ethAddress;
    const creatorType = values.creatorType;

    console.log(photoURL);

    await postRef.update({
      about,
      displayName,
      ethAddress,
      photoURL,
      username,
      website,
      creatorType,
    });

    reset({
      about,
      displayName,
      ethAddress,
      photoURL,
      username,
      website,
      creatorType,
    });

    toast.success("Updated successfully!");
  };
  return (
    <>
      <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
        <SideNav username={username} />
      </div>
      <form
        className='mx-4 mt-6 md:w-[600px] md:mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mx-4 flex justify-between'>
          <div className='w-16 mb-6 border-none  cursor-pointer'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Image
                  width={"65px"}
                  height={"65px"}
                  className=' rounded-full border-dashed border-gray-800 dark:border-slate-300 border-2 '
                  src={userPhotoURL}
                />
              ) : (
                <div className='relative'>
                  {userEditedPhotoURL ? (
                    <Image
                      width={"65px"}
                      height={"65px"}
                      className=' rounded-full border-solid border-gray-800 dark:border-slate-300 border-2 '
                      src={userEditedPhotoURL}
                    />
                  ) : (
                    <Image
                      width={"65px"}
                      height={"65px"}
                      className='absolute top-0  bg-white rounded-full border-solid border-gray-800 dark:border-slate-300 border-2 '
                      src={userPhotoURL}
                    />
                  )}
                  <div className='absolute top-5 left-5 p-1 bg-neutral-400 bg-opacity-80 rounded-full'>
                    <BiCamera />
                  </div>
                </div>
              )}
            </div>
            <p className='mt-2 text-xs w-[200px]'>Drag n drop image.</p>
          </div>

          <div>
            <h1 className='text-right mb-2 mt-2 font-CircularMedium text-2xl'>
              {username}
            </h1>
            <small className='text-xs'>username cannot be changed*</small>
          </div>
        </div>
        <h4 className='font-Montserrat mb-3 mx-2 text-left'>Display Name</h4>
        <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800  mb-4 text-lg border-2 border-black dark:border-slate-300  lg:mx-auto'>
          <input
            className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
            type='text'
            placeholder={""}
            ref={register}
            {...register("displayName", { maxLength: 80 })}
          />
        </div>
        <p className='text-red-500 mx-3 text-left mb-4'>
          {errors.name && "Please enter a name"}
        </p>

        <h4 className='font-Montserrat mb-3 mx-2 text-left'>About</h4>
        <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-black dark:border-slate-300  lg:mx-auto'>
          <textarea
            className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
            rows={4}
            placeholder={""}
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
        <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-black dark:border-slate-300  lg:mx-auto'>
          <input
            className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
            type='url'
            placeholder={""}
            {...register("website", { maxLength: 80 })}
          />
        </div>
        <p className='text-red-500 mx-3 text-left mb-4'>
          {errors.website && "Please enter a valid link"}
        </p>

        <h4 className='font-Montserrat mb-3 mx-2 text-left'>Type of creator</h4>
        <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-gray-800 dark:border-slate-300 lg:mx-auto'>
          <select
            {...register("creatorType")}
            className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
          >
            <option value='Content Creator'>Content Creator</option>
            <option value='Artist'>Artist</option>
            <option value='Writer'>Writer</option>
            <option value='Musician'>Musician</option>
            <option value='Gamer'>Gamer</option>
            <option value='Developer'>Developer</option>
            <option value='Community'>Community</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <h4 className='font-Montserrat mb-3 mx-2 text-left'>
          EVM Address (ETH, MATIC, BSC, ETC)
        </h4>
        <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-black dark:border-slate-300  lg:mx-auto'>
          <input
            className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
            type='text'
            placeholder={""}
            ref={register}
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
          className=' bg-yellow-300 rounded-full mt-6 py-3 h-[50px] min-w-full text-center font-CircularMedium md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black'
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
