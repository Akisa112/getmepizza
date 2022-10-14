import { getUserWithUsername, postToJSON } from '../libs/firebase';
import UserProfile from '../components/UserProfile';

import NavBar from '../components/navbar';
import Footer from '../components/footer';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
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
    console.log(user)
  return (
    <main>
        <NavBar/>
      <UserProfile user={user} posts={posts} />
      
      <Footer/>
    </main>
  );
}