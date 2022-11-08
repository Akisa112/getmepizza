import Link from "next/link";
import Head from "next/head";
import Footer from "../components/footer";
import { firestore, userToJson } from "../lib/firebase";
import UsersFeed from "../components/UsersList";
import ExploreList from "../components/ExploreList";

// Set a limit for getting users to display to 100 for now.
const LIMIT = 100;

// Returns a users array as props from firestore based on the limit above.
export async function getServerSideProps() {
  const LatestUsersQuery = firestore
    .collection("users")
    .orderBy("createdUserAt", "desc")
    .limit(LIMIT);
  const latestUsers = (await LatestUsersQuery.get()).docs.map(userToJson);

  return {
    props: { latestUsers },
  };
}

export default function Explore(props) {
  const latestUsers = props.latestUsers;

  return (
    <>
      <Head>
        <title>GetMe.Pizza | Explore</title>
        <meta name='title' content='GetMe.Pizza | Explore' />
        <meta
          name='description'
          content='Explore the latest creators and tip them some crypto so they can work without worrying about lunch!'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://getme.pizza/' />
        <meta property='og:title' content='GetMe.Pizza | Explore' />
        <meta
          property='og:description'
          content='Explore the latest creators and tip them some crypto so they can work without worrying about lunch!'
        />
        <meta property='og:image' content='https://i.imgur.com/MoVLaGP.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://getme.pizza/' />
        <meta property='twitter:title' content='GetMe.Pizza | Explore' />
        <meta
          property='twitter:description'
          content='Explore the latest creators and tip them some crypto so they can work without worrying about lunch!'
        />
        <meta
          property='twitter:image'
          content='https://i.imgur.com/MoVLaGP.png'
        />
      </Head>
      <main className='min-h-[calc(100vh-163px)] max-w-[1100px] mx-auto mt-12 flex flex-col justify-between'>
        <section className='px-3 md:px-20  dark:text-slate-50 '>
          <h1 className='font-CircularMedium'>LATEST CREATORS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <UsersFeed users={latestUsers} />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST CONTENT CREATORS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList
                users={latestUsers}
                SelectedFeed={"Content Creator"}
              />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST DEVELOPERS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList users={latestUsers} SelectedFeed={"Developer"} />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST COMMUNITIES</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList users={latestUsers} SelectedFeed={"Community"} />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST GAMERS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList users={latestUsers} SelectedFeed={"Gamer"} />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST ARTISTS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList users={latestUsers} SelectedFeed={"Artist"} />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST WRITERS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList users={latestUsers} SelectedFeed={"Writer"} />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST MUSICIANS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList users={latestUsers} SelectedFeed={"Musician"} />
            </ul>
          </nav>

          <h1 className='font-CircularMedium'>LATEST OTHERS</h1>
          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <ExploreList users={latestUsers} SelectedFeed={"Other"} />
            </ul>
          </nav>
        </section>
        <Footer />
      </main>
    </>
  );
}
