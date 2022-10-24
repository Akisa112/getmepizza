import { auth, firestore } from "./libs/firebase";

import PoweredBy from "./components/poweredby";
import { UserContext } from "./libs/context";
import { useEffect, useContext, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import AuthCheck from "./components/AuthCheck";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import MobileNav from "./components/mobileNav";
import { useDropzone } from "react-dropzone";
import { getUserWithUsername } from "./libs/firebase";
import { BiCamera } from "react-icons/bi";
import { blobToBase64 } from "./libs/hooks";
import { upLoadIPFS } from "./libs/moralis";

export default function AdminPage({}) {
  const { username } = useContext(UserContext);

  const [userPhotoURL, setUserPhotoURL] = useState("");
  const [userEditedPhotoURL, setUserEditedPhotoURL] = useState("");

  const fetchUser = async () => {
    try {
      const userDoc = await getUserWithUsername(username);
      const user = userDoc.data();
      setUserPhotoURL(user.photoURL);
    } catch (error) {
      console.log(error);
    }
  };

  if (username) {
    if (!userPhotoURL) {
      fetchUser();
    }
  }

  let postRef = firestore.collection("users").doc(auth.currentUser.uid);
  let [user] = useDocumentDataOnce(postRef);

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
    const supporters = user.supporters;
    const username = user.username;
    const about = values.about;
    const website = values.website;
    const ethAddress = values.ethAddress;

    console.log(photoURL);

    await postRef.update({
      about,
      displayName,
      ethAddress,
      photoURL,
      supporters,
      username,
      website,
    });

    reset({
      about,
      displayName,
      ethAddress,
      photoURL,
      supporters,
      username,
      website,
    });

    toast.success("Post updated successfully!");
  };

  return (
    <main className='h-[calc(100vh-107px)] flex flex-col justify-between'>
      <AuthCheck>
        <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
          <MobileNav username={username} />
        </div>
        <form
          className='mx-4 mt-6 md:w-[600px] md:mx-auto'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mx-4 flex justify-between'>
            <div className='w-16 mb-6 border-none'>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <img
                    className='rounded-full border-dashed border-gray-800 border-2 cursor-pointer'
                    src={userPhotoURL}
                  />
                ) : (
                  <div className='relative'>
                    <img
                      className='w-[65px] h-[65px] rounded-full border-solid border-gray-800 border-2 cursor-pointer'
                      src={userPhotoURL}
                    />
                    {userEditedPhotoURL && (
                      <img
                        className='absolute top-0 w-[65px] h-[65px] bg-white rounded-full border-solid border-gray-800 border-2 cursor-pointer'
                        src={userEditedPhotoURL}
                      />
                    )}
                    <div className='absolute top-5 left-5 p-1 bg-neutral-400 bg-opacity-80 rounded-full'>
                      <BiCamera />
                    </div>
                  </div>
                )}
              </div>
            </div>

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
              placeholder={""}
              ref={register}
              {...register("displayName", { maxLength: 80 })}
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
          <div className='mx-2 text-center py-2  rounded-lg bg-white mb-4 text-lg border-2 border-black  lg:mx-auto'>
            <input
              className='w-full px-4 border-none focus:ring-0'
              type='url'
              placeholder={""}
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
