import AuthCheck from "./components/AuthCheck";
import PostFeed from "./components/PostFeed";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { useContext, useState } from "react";
import { UserContext } from "./libs/context";
import { firestore, auth, serverTimestamp } from "./libs/firebase";

import { MdIosShare } from "react-icons/md";

import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

export default function Dashboard({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main className='h-screen flex flex-col justify-between'>
      <NavBar />
      <AuthCheck>
        <CreateNewPost />
        <hr />
        <PostList />
      </AuthCheck>
      <Footer />
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
    <div className='mx-4 mt-4'>
      <h1 className='font-CircularMedium text-xl'>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </div>
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
    router.push(`/admin/${slug}`);
  };

  return (
    <form className='mx-2 text-center mt-8 mb-8' onSubmit={createPost}>
      <div className='mx-2 text-center py-2  rounded-lg bg-white text-lg border-2 border-black lg:max-w-lg lg:mx-auto'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='My Awesome Post!'
          className='w-full px-4 outline-none'
        />
      </div>
      <p className='text-xs mt-1'>
        <strong>Slug:</strong> {slug}
      </p>
      <button
        type='submit'
        disabled={!isValid}
        className='className="m-auto font-CircularMedium bg-yellow-400 rounded-full mt-2 py-3 w-72 text-center md:max-w-xs md:mx-auto'
      >
        Create a post
      </button>
    </form>
  );
}
