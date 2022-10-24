import { getUserWithUsername, postToJSON } from "../libs/firebase";
import UserProfile from "../components/UserProfile";

import PoweredBy from "../components/poweredby";

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
    <main className='h-[calc(100vh-107px)] flex flex-col justify-between'>
      <UserProfile user={user} posts={posts} />

      <PoweredBy />
    </main>
  );
}
