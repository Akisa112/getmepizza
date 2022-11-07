
import Head from 'next/head';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PostContent from '../../components/PostContent';

import UserCard from '../../components/UserCard';
import PoweredBy from '../../components/poweredby';

import HeartButton from '../../components/HeartButton';
import AuthCheck from '../../components/AuthCheck';
import Link from 'next/link';

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
  return (
    <>
    <Head>
        <title>{post.title} | @{post.username}</title>
        <meta name='title' content={`${post.title} | @${post.username}`} />
        <meta name='description' content={post.context.substring(0,159)} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={`https://www.getme.pizza/${post.slug}`} />
        <meta property='og:title' content={`${post.title} | @${post.username}`} />
        <meta property='og:description' content={post.context.substring(0,159)} />
        <meta property='og:image' content={`https://getmepizza-dapp.vercel.app/api/ogpages?name=${post.title}&link=${post.slug}`} />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={`https://www.getme.pizza/${post.slug}`} />
        <meta property='twitter:title' content={`${post.title} | @${post.username}`} />
        <meta property='twitter:description' content={post.context.substring(0,159)} />
        <meta
          property='twitter:image'
          content={`https://getmepizza-dapp.vercel.app/api/ogpages?name=${post.title}&link=${post.slug}`}
        />
        
      </Head>
    <main className='flex flex-col min-h-[calc(100vh-163px)] justify-between'>
 
      <div className='flex-1 mb-8'>
        <UserCard  user={props.user}/>
        <section className='md:max-w-3xl md:mx-auto'>
          <PostContent post={post} />
          <div className='-mt-10 text-right mr-4'>
          <AuthCheck  fallback={
            <Link href="/enter">
              <button className='mr-6 text-sm font-CircularMedium bg-yellow-300 rounded-full py-1 w-24 text-center disabled:bg-gray-200 md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black'>🍕 Sign Up</button>
            </Link>
          }>
            <div className='mx-8' >
            <HeartButton  postRef={postRef}/>
          </div>
            
          </AuthCheck>
          </div>
          
        </section>
        
      </div>
      <PoweredBy/>

    </main>
    </>
  );
}