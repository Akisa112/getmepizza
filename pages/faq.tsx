import Link from "next/link";
import Head from "next/head";
import Footer from "../components/footer";
import { FiTwitter } from "react-icons/fi";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>GetMe.Pizza | Privacy</title>
        <meta name='title' content='GetMe.Pizza | Privacy' />
        <meta
          name='description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://getme.pizza/' />
        <meta property='og:title' content='GetMe.Pizza | Privacy' />
        <meta
          property='og:description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta property='og:image' content='https://i.imgur.com/nFZLBWm.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://getme.pizza/' />
        <meta property='twitter:title' content='GetMe.Pizza | Privacy' />
        <meta
          property='twitter:description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta
          property='twitter:image'
          content='https://i.imgur.com/nFZLBWm.png'
        />
      </Head>
      <main className=' flex flex-col justify-between '>
        <section className='px-3 py-6 mb-6 md:px-20 lg:max-w-5xl lg:mx-auto '>
          <div>
            <h1 className='text-4xl font-bold text-center px-2 py-2 leading-10 md:text-4xl md:max-w-lg mx-auto lg:max-w-4xl lg:text-6xl lg:pt-14 '>
              Frequently Asked Questions
            </h1>
            <p className='pt-8 px-2 py-8 max-w-sm mx-auto text-center text-gray-800 dark:text-slate-300 font-Montserrat font-bold leading-7 text-lg md:text-xl md:max-w-md lg:max-w-4xl lg:text-2xl lg:px-40'>
              If you can&apos;t find the answer that you&apos;re looking for,
              hit me up on twitter @elonsdev
            </p>

            <div className=' mx-2 font-CircularMedium bg-yellow-300 rounded-full text-lg  py-3  cursor-pointer dark:text-black'>
              <div className='flex items-center justify-center'>
                <FiTwitter className='mr-2 text-lg' />
                <Link href='https://twitter.com/elonsdev'>
                  <div className='text-center'>@elonsdev</div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className='lg:max-w-4xl lg:mx-auto text-gray-800 dark:text-slate-300'>
          <div className='mx-6'>
            <h1 className='mt-8 mb-2  font-bold text-xl'>When 🍕?</h1>
            <p className=' '>
              Get me pizza is built out of a personal need to allow my followers
              to support me with small amounts of crypto in a more meaningful
              way than just asking to gib moneys. Then I thought... Hey, maybe
              artists, influencers, and other creators could use this too.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>Why 🍕?</h1>
            <p className=''>
              Short answer: Who doesn&apos;t like Pizza? Without pizza, we would
              have no Bitcoins...
              <br />
              <br /> Longer answer: I thought it would be fun to allow
              supporters to tip in pizza slice value instead of dollars and mint
              the supporter a $PIZZA coupons that shows their support for the
              creator. I want to expand the idea into token-gating posts and
              content, creating an economy around $PIZZA coupons, and allow web3
              creators to un-tap their full value creation.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>
              How do I get paid in 🍕?
            </h1>
            <p className=''>
              Every time a supporter tips you a $1 slice they get 1 $PIZZA
              coupon proving their support and the crypto goes into a smart
              contract mapped to your ETH address. You can withdraw these funds
              anytime from your dashboard or directly from the smart contract.
              You don&apos;t actually get pizza, but you could buy yourself one,
              or anything else, once you withdraw your funds.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>
              How can my fans pay?
            </h1>
            <p className=''>
              Currently support is available to a wide range of blockchains
              namely: BSC, POLYGON & FANTOM... more coming soon.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>Is there a fee?</h1>
            <p className=''>
              It is completely free to sign up and create posts. The smart
              contract takes 5% on every tip to pay for development and servers.
            </p>
            <h1 id='coupons' className='mt-8 mb-2  font-bold text-xl'>
              What are 🍕 points?
            </h1>
            <p className=''>
              🍕 points are blockchain tokens that supporters receive when
              tipping a creator. They are cross-chain and can be swapped between
              chains on{" "}
              <Link
                href='https://app.multichain.org/#/router/🍕'
                target='_blank'
              >
                <a className='text-orange-500'>multichain app.</a>
              </Link>
              🍕 points will be used on future features such as buying digital
              items from creators and getme.pizza.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>
              What is this profile pic most people have?
            </h1>
            <p className=''>
              Instead of giving everyone a blank blue egg or some such nonsense,
              we thought it would be fun to generate a random profile picture
              for you, using Dicebear.com (micah) API, seeded with your user UID
              we generate when you sign up.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>
              Is it safe to connect a wallet to this site?
            </h1>
            <p className=''>
              GetMe.Pizza uses the latest Moralis v2 SDK, Firebase, and Open
              Zeppelin smart contract libraries to ensure everything is safe and
              secure.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>
              What about my data?
            </h1>
            <p className=''>
              This website doesn&apos;t track ad data or serve ads and tips are
              clearly visible on the blockchain. Your posts are stored in secure
              Firebase storage which can be retrieved on request.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>
              Hows this site different?
            </h1>
            <p className=''>
              GetMe.Pizza is focused on web3 and can innovate faster than the
              web2 competitors as well as build tools that directly unlock web3
              creators specific value and solve some of web3 pain points.
            </p>
            <h1 className='mt-8 mb-2  font-bold text-xl'>
              Who&apos;s running this?
            </h1>
            <p className=''>
              Just me at the moment,{" "}
              <Link href='https://twitter.com/elonsdev'>
                <a className='hover:text-orange-600'>@elonsdev</a>
              </Link>
              . Wanna help out or fork the project? Get hold of me on
              <Link href='https://twitter.com/elonsdev'>
                <a className='hover:text-orange-600'> Twitter </a>
              </Link>
              or grab the code on
              <Link href='https://github.com/elonsdev/getmepizza-dapp'>
                <a className='hover:text-orange-600'> GitHub</a>
              </Link>
              .
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
