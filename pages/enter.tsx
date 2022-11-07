import {
  auth,
  firestore,
  googleAuthProvider,
  twitterAuthProvider,
  serverTimestamp,
} from "../lib/firebase";

import Image from "next/image";
import Footer from "../components/footer";
import { UserContext } from "../lib/context";
import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { blobToBase64 } from "../lib/hooks";
import { upLoadIPFS } from "../lib/moralis";
import { BiCamera } from "react-icons/bi";

export default function Enter() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  // If user exists route to dashboard page
  if (username) {
    router.push(`/dashboard`);
  }

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main className=' flex flex-col min-h-[calc(100vh-163px)] font-CircularMedium '>
      <div className='mx-auto text-center mt-20 lg:max-w-5xl lg:mx-auto'>
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <SignOutButton />
          )
        ) : (
          <SignInButton username />
        )}
      </div>
      <div className='mt-auto'>
        <Footer />
      </div>
    </main>
  );
}

// Sign in with Google button
function SignInButton(username) {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
    /* if (username !== "name") {
      try {
        router.push(`/dashboard`);
      } catch (error) {
        console.log(error);
      }
    } */
  };

  return (
    <>
      <button
        className=' bg-white rounded-full text-lg  py-2 px-8 text-center lg:inline hover:text-xl hover:scale-105 transition-all dark:text-black'
        onClick={signInWithGoogle}
      >
        Sign in with{" "}
        <Image width={"18px"} height={"18px"} src={"/google.png"} />
        oogle
      </button>
    </>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

// Show the user if the username is valid or not based on current state
function UsernameMessage({ username, isValid, loading, userNameIsEmpty }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className='text-green-600'>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className='text-red-500'>That username is taken!</p>;
  } else if (userNameIsEmpty) {
    return <p className='text-red-500'>Please enter a valid username!</p>;
  } else {
    return <p></p>;
  }
}

// Username form and logic to handle checking if username is available, submit and onchange events
function UsernameForm() {
  const { user, username } = useContext(UserContext);
  const [formValueUserName, setFormValueUserName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userNameIsEmpty, setUserNameIsEmpty] = useState(false);
  const randomProfilePic = `https://avatars.dicebear.com/api/micah/:${user.uid}.svg`;
  const [userPhotoURL, setUserPhotoURL] = useState(randomProfilePic);
  const [userEditedPhotoURL, setUserEditedPhotoURL] = useState("");

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
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    if (!isValid) {
      setLoading(false);
      setUserNameIsEmpty(true);
    } else {
      // Create refs for both documents

      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValueUserName}`);

      // Commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, {
        username: formValueUserName,
        photoURL: userEditedPhotoURL ? userEditedPhotoURL : userPhotoURL,
        displayName: values.name,
        about: values.about,
        website: values.website,
        ethAddress: values.ethAddress,
        createdUserAt: Date.now(),
        creatorType: values.creatorType,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    }
  };

  const onChangeUserName = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is > 3 OR it passes regex
    if (val.length < 3) {
      setFormValueUserName(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValueUserName(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // Everytime the username formvalue changes, checkUsername
  useEffect(() => {
    checkUsername(formValueUserName);
  }, [formValueUserName]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section className='lg:w-[450px]'>
        <h1 className='text-3xl mb-16'>Complete your page</h1>
        <div className='w-16 mb-2 border-none mx-auto cursor-pointer'>
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
        </div>
        <p className=' text-xs mb-4'>Drag n drop image.</p>
        <form className='mx-4' onSubmit={handleSubmit(onSubmit)}>
          <h4 className='font-Montserrat mb-3 mx-2 text-left'>Name *</h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-gray-800 dark:border-slate-300 lg:max-w-lg lg:mx-auto'>
            <input
              className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
              type='text'
              placeholder='name'
              {...register("name", { required: true, maxLength: 80 })}
            />
          </div>
          <p className='text-red-500 mx-3 text-left mb-4'>
            {errors.name && "Please enter a name"}
          </p>

          <h4 className='font-Montserrat mb-3 mx-2 text-left'>
            GetMe.Pizza link *
          </h4>
          <div className='mx-2 text-left py-2 px-4 rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-gray-800 dark:border-slate-300 lg:max-w-lg lg:mx-auto'>
            <span>getme.pizza/</span>
            <input
              className='w-[180px] border-none focus:ring-0  dark:bg-zinc-800'
              name='username'
              placeholder='yourname'
              value={formValueUserName}
              onChange={onChangeUserName}
            />
          </div>
          <UsernameMessage
            username={formValueUserName}
            isValid={isValid}
            loading={loading}
            userNameIsEmpty={userNameIsEmpty}
          />

          <h4 className='font-Montserrat mb-3 mx-2 text-left'>About *</h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-gray-800 dark:border-slate-300  lg:max-w-lg lg:mx-auto'>
            <textarea
              className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
              rows={4}
              placeholder='Hey, I just created a page here. You can now buy me a pizza with any crypto!'
              {...register("about", {
                required: true,
                minLength: 20,
                maxLength: 128,
              })}
            />
          </div>
          <p className='text-red-500 mx-3 text-left mb-4'>
            {errors.about &&
              "Must be atleast 20 characters and less than 128 characters"}
          </p>

          <h4 className='font-Montserrat mb-3 mx-2 text-left'>
            Website or social link *
          </h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-gray-800 dark:border-slate-300 lg:max-w-lg lg:mx-auto'>
            <input
              className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
              type='url'
              placeholder='https://'
              {...register("website", { required: true, maxLength: 80 })}
            />
          </div>
          <p className='text-red-500 mx-3 text-left mb-4'>
            {errors.website && "Please enter a valid link"}
          </p>

          <h4 className='font-Montserrat mb-3 mx-2 text-left'>
            Type of creator *
          </h4>

          <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-gray-800 dark:border-slate-300  lg:mx-auto'>
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
            EVM Address (ETH, MATIC, BSC, ETC) *
          </h4>
          <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800 mb-4 text-lg border-2 border-gray-800 dark:border-slate-300 lg:max-w-lg lg:mx-auto'>
            <input
              className='w-full px-4 border-none focus:ring-0 dark:bg-zinc-800'
              type='text'
              placeholder='0x...'
              {...register("ethAddress", {
                required: true,
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
            className=' bg-yellow-300 rounded-full mt-6 py-3 min-w-full text-center md:max-w-xs md:mx-auto dark:text-black hover:scale-105 transition-all'
          >
            Continue
          </button>
        </form>
      </section>
    )
  );
}
