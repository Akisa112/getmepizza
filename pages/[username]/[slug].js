
import { firestore, getUserWithUsername, postToJSON } from '../libs/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PostContent from '../components/PostContent';
import NavBar from '../components/navbar';
import UserCard from '../components/UserCard';
import Footer from '../components/footer';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;
  let user;

  if (userDoc) {
    user = await userDoc.data();
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, path, user },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}



export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  console.log(props.user.user)
  return (
    <main>
      <NavBar/>
      <UserCard  user={props.user}/>
      <section>
        <PostContent post={post} />
      </section>


    </main>
  );
}