import Head from "next/head";
import Link from "next/link";
import Footer from "../components/footer";
import { firestore, userToJson } from "../lib/firebase";
import UsersFeed from "../components/UsersList";
import { TbHandClick } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiCrossedChains } from "react-icons/gi";
import buymepizza from "../public/buymepizzacomponent.png";
import buymepizzadark from "../public/buymepizzacomponentdark.png";
import pizzasupporters from "../public/pizzasupporters.png";
import pizzasupportersdark from "../public/pizzasupportersdark.png";
import Image from "next/image";

// Set a limit for getting users to display to 10 for now.
const LIMIT = 10;

// Returns a users array as props from firestore based on the limit above.
export async function getServerSideProps() {
  const usersQuery = firestore
    .collection("users")
    .orderBy("createdUserAt", "desc")
    .limit(LIMIT);
  const users = (await usersQuery.get()).docs.map(userToJson);
  return {
    props: { users },
  };
}

/**`
 * Homepage takes in users array as props from getServerSideProps
 * @param  {Array} props
 */
export default function Home(props) {
  const users = props.users;
  return (
    <div className=''>
      <Head>
        <title>GetMe.Pizza | Get Tipped In Crypto</title>
        <meta name='title' content='GetMe.Pizza | Get Tipped In Crypto' />
        <meta
          name='description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://getme.pizza/' />
        <meta
          property='og:title'
          content='GetMe.Pizza | Get Tipped In Crypto'
        />
        <meta
          property='og:description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta property='og:image' content='https://i.imgur.com/nFZLBWm.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://getme.pizza/' />
        <meta
          property='twitter:title'
          content='GetMe.Pizza | Get Tipped In Crypto'
        />
        <meta
          property='twitter:description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta
          property='twitter:image'
          content='https://i.imgur.com/nFZLBWm.png'
        />
      </Head>

      <main className='-mt-8 font-CircularMedium lg:max-w-5xl lg:mx-auto'>
        <section className='px-3 md:px-20'>
          <div>
            <h1 className='text-3xl font-bold text-center px-2 py-2 mt-8 leading-10 md:text-4xl md:max-w-lg mx-auto lg:max-w-4xl lg:text-6xl lg:pt-14 tracking-wide'>
              We can all use a slice of 🍕 sometimes...
            </h1>
            <p className='pt-8 px-2 py-8 max-w-sm mx-auto text-center text-gray-800 font-Montserrat font-bold leading-9 text-lg md:text-xl md:max-w-md lg:max-w-4xl lg:text-2xl lg:px-40 dark:text-slate-100 tracking-wide'>
              It all started with the pizza, so get tipped the crypto way...
              with pizza of course.
            </p>
            <div className='mx-2 text-center py-4 rounded-full bg-white dark:bg-zinc-800  mb-4 text-lg lg:max-w-lg lg:mx-auto'>
              <span className=''>getme.pizza/</span>
              <input
                type={"text"}
                className='pl-0 border-none focus:ring-0 dark:text-slate-100 dark:bg-zinc-800'
                placeholder={"yourname"}
              ></input>
              <span className='hidden  lg:inline'>
                <Link href='/enter'>
                  <a className='px-6 bg-yellow-300 dark:bg-yellow-300 cursor-pointer rounded-full text-lg  py-3 text-center   hover:text-xl  transition-all dark:text-black'>
                    Start my page
                  </a>
                </Link>
              </span>
            </div>

            <Link href='/enter'>
              <div className='mx-2 bg-yellow-300 rounded-full text-lg  py-3 text-center lg:hidden dark:text-black'>
                Start my page
              </div>
            </Link>
            <p className=' px-2 py-4 text-center text-gray-800 font-Montserrat font-bold leading-7 text-sm dark:text-slate-100 tracking-wide'>
              *It&apos;s free and takes only a minute.
            </p>
          </div>
        </section>

        {/* Creators Section */}
        <section className='px-3 md:px-20 dark:text-slate-50 '>
          <h1 className='tracking-wider'>LATEST CREATORS</h1>

          <nav className='pt-1 mb-5'>
            <ul className='flex items-center overflow-x-auto scrollbar-hide  scroll-auto'>
              <UsersFeed users={users} />
            </ul>
          </nav>
        </section>

        {/* Info Section */}
        <section className='bg-yellow-50 pb-10 rounded-3xl dark:bg-yellow-300'>
          <div className='px-3 md:px-20'>
            <h4 className='text-center pt-10 text-gray-500 pb-5 tracking-wide'>
              TIP
            </h4>
            <h2 className='text-3xl font-bold text-center px-2 leading-10 pb-5 dark:text-black'>
              Give your followers a way to say wagmi.
            </h2>
            <p className='pt-8 px-2 py-4 text-center text-gray-800 font-Montserrat font-bold leading-7 text-lg'>
              GetMe.Pizza makes supporting pretty awesome. With just a click,
              your followers can tip you enough crypto to get yourself a 🍕
              slice! They can leave a message and not even have to create an
              account.
            </p>
            <div className='flex mt-8'>
              <div className='-rotate-2 dark:hidden'>
                <Image src={buymepizza} />
              </div>
              <div className='-rotate-2 hidden dark:block'>
                <Image src={buymepizzadark} />
              </div>
              <div className='display flex flex-col justify-center rotate-3 dark:hidden'>
                <Image src={pizzasupporters} />
              </div>
              <div className='display flex-col justify-center rotate-3 hidden dark:flex'>
                <Image src={pizzasupportersdark} />
              </div>
            </div>
          </div>

          <div className='px-3 md:px-20'>
            <p className='pt-8 px-2 py-4 text-center text-gray-800 font-Montserrat font-bold leading-7 text-lg'>
              Membership tools, tip-gating posts, and ways to sell your digital
              items easily are coming soon...
            </p>
          </div>
        </section>

        {/* Action Section */}
        <section className='pt-10 mb-5 dark:text-slate-50'>
          <h2 className='text-3xl font-bold text-center px-2 leading-10 py-5 tracking-wide'>
            Made for web3 creators
          </h2>
          <div className='pt-8 '>
            <TbHandClick className='mb-4 mx-auto text-center text-4xl text-orange-500' />
            <p className='mx-auto text-center max-w-[250px] font-Montserrat text-sm'>
              Set up your account and allow your{" "}
              <span className='font-CircularMedium  '>fans</span> to support{" "}
              <span className='font-CircularMedium  '>you</span>.
            </p>
          </div>
          <div className='pt-8'>
            <GiTakeMyMoney className='mb-4 mx-auto text-center text-4xl text-orange-500' />
            <p className='mx-auto text-center max-w-[250px] font-Montserrat text-sm'>
              You can withdraw your crypto tips{" "}
              <span className='font-CircularMedium  '>anytime you want</span>,
              while your supporter will get{" "}
              <span className='font-CircularMedium  '>🍕 coupons</span> as a
              memento and to use on future features.
            </p>
          </div>
          <div className='pt-8 pb-10'>
            <GiCrossedChains className='mb-4 mx-auto text-center text-4xl text-orange-500' />
            <p className=' mx-auto text-center max-w-[250px] font-Montserrat text-sm'>
              Tips and memos are{" "}
              <span className='font-CircularMedium  '>transparent</span> and{" "}
              <span className='font-CircularMedium  '>securely stored</span>{" "}
              on-chain in our smart contracts.
            </p>
          </div>
          <div className='text-center h-[50px] hover:scale-105 transition-all'>
            <Link href='/enter'>
              <a className='mx-10 bg-yellow-300 rounded-full  py-3 px-10  cursor-pointer md:max-w-xs md:mx-auto  dark:text-black'>
                Start my page
              </a>
            </Link>
          </div>

          <p className=' px-2 py-2 text-center text-gray-800 font-Montserrat font-bold leading-7 text-xs dark:text-slate-100'>
            *It&apos;s free and takes only a minute.
          </p>
        </section>

        <Footer />
      </main>
    </div>
  );
}
