import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";
import Head from "next/head";

import PoweredBy from "../../components/poweredby";

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <>
      <Head>
        <title>{user.displayName}</title>
        <meta name='title' content={user.displayName} />
        <meta name='description' content={user.about.substring(0, 159)} />

        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content={`https://www.getme.pizza/${user.username}}`}
        />
        <meta property='og:title' content={user.displayName} />
        <meta
          property='og:description'
          content={user.about.substring(0, 159)}
        />
        <meta
          property='og:image'
          content={`https://getmepizza-dapp.vercel.app/api/ogpages?name=${user.displayName}&link=${user.username}&photo=${user.photoURL}`}
        />
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content={`https://www.getme.pizza/${user.username}}`}
        />
        <meta property='twitter:title' content={user.displayName} />
        <meta
          property='twitter:description'
          content={user.about.substring(0, 159)}
        />
        <meta
          property='twitter:image'
          content={`https://getmepizza-dapp.vercel.app/api/ogpages?name=${user.displayName}&link=${user.username}&photo=${user.photoURL}`}
        />
      </Head>
      <main className='min-h-[calc(100vh-163px)] flex flex-col justify-between'>
        <UserProfile user={user} posts={posts} />

        <PoweredBy />
      </main>
    </>
  );
}
