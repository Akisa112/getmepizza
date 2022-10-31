import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";

import PoweredBy from "../../components/poweredby";
import { useContext, useState } from "react";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import SideNav from "../../components/sideNav";

export default function Dashboard({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main className='min-h-[calc(100vh-163px)] flex flex-col justify-between md:max-w-4xl md:mx-auto '>
      <AuthCheck>
        <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
          <SideNav username={username} />
        </div>
        <CreateNewPost />

        <PostList />
      </AuthCheck>
      <PoweredBy />
    </main>
  );
}

function PostList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <hr className='md:w-2/3 md:mx-auto' />
      <div className='mx-4 mt-4 md:w-1/2 md:mx-auto'>
        <h1 className='font-CircularMedium text-xl'>Manage your Posts</h1>
        <PostFeed posts={posts} admin />
      </div>
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      context: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/posts/${slug}`);
  };

  return (
    <form className='mx-4 text-center md:mt-24 mb-8' onSubmit={createPost}>
      <div className='mx-2 text-center py-2  rounded-lg bg-white dark:bg-zinc-800  text-lg border-2 border-black dark:border-zinc-300 lg:max-w-lg lg:mx-auto'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='My Awesome Post!'
          className='w-full px-4 outline-none dark:bg-zinc-800'
        />
      </div>
      <p className='text-xs mt-1'>
        <strong>https://getme.pizza/</strong>
        {slug}
      </p>
      <button
        type='submit'
        disabled={!isValid}
        className='className="m-auto font-CircularMedium bg-yellow-300 disabled:bg-gray-200 rounded-full mt-2 py-3 w-72 text-center md:max-w-xs md:mx-auto disabled:hover:scale-100 hover:scale-105 transition-all dark:text-black'
      >
        Create a post
      </button>
    </form>
  );
}
