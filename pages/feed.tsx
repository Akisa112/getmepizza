import Link from "next/link";
import Head from "next/head";
import Footer from "../components/footer";
import { useState } from "react";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";
import PostFeed from "../components/PostFeed";
import { GiFullPizza } from "react-icons/gi";

// Max post to query per page
const LIMIT = 5;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

// CHANGE IMAGE META ONCE PAGE DONE
export default function Feed(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <Head>
        <title>GetMe.Pizza | Feed</title>
        <meta name='title' content='GetMe.Pizza | Feed' />
        <meta
          name='description'
          content='View the latest feed of all the public posts on GetMe.Pizza '
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://getme.pizza/' />
        <meta property='og:title' content='GetMe.Pizza | Feed' />
        <meta
          property='og:description'
          content='View the latest feed of all the public posts on GetMe.Pizza '
        />
        <meta property='og:image' content='https://i.imgur.com/nFZLBWm.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://getme.pizza/' />
        <meta property='twitter:title' content='GetMe.Pizza | Feed' />
        <meta
          property='twitter:description'
          content='View the latest feed of all the public posts on GetMe.Pizza '
        />
        <meta
          property='twitter:image'
          content='https://i.imgur.com/nFZLBWm.png'
        />
      </Head>
      <main className='min-h-[calc(100vh-163px)] max-w-2xl mx-auto flex flex-col justify-between'>
        <PostFeed posts={posts} admin={false} />
        <div className='text-center mx-auto w-[250px]'>
          <button
            disabled={postsEnd || loading}
            className=' font-CircularMedium bg-yellow-300 disabled:bg-gray-300 disabled:hover:scale-100 rounded-full mt-6 py-3 min-w-full text-center md:max-w-xs md:mx-auto dark:text-black hover:scale-105 transition-all'
            onClick={getMorePosts}
          >
            {postsEnd ? (
              `No more posts`
            ) : !loading ? (
              `Load more`
            ) : (
              <>
                <div role='status'>
                  <GiFullPizza className='inline text-2xl animate-spin -mt-1 mr-3 text-orange-600' />
                  <span className=''>Loading...</span>
                </div>
              </>
            )}
          </button>
        </div>
        <Footer />
      </main>
    </>
  );
}
