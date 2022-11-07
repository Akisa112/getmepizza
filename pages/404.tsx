import Link from "next/link";
import Head from "next/head";
import Footer from "../components/footer";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>GetMe.Pizza | 404</title>
        <meta name='title' content='GetMe.Pizza | 404' />
        <meta
          name='description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://getme.pizza/' />
        <meta property='og:title' content='GetMe.Pizza | 404' />
        <meta
          property='og:description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta property='og:image' content='https://i.imgur.com/nFZLBWm.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://getme.pizza/' />
        <meta property='twitter:title' content='GetMe.Pizza | 404' />
        <meta
          property='twitter:description'
          content='Start your account now and get tipped in your favorite cryptocurrencies! ... It all started with the pizza, so get tipped the crypto way... '
        />
        <meta
          property='twitter:image'
          content='https://i.imgur.com/nFZLBWm.png'
        />
      </Head>
      <main className='min-h-[calc(100vh-163px)] flex flex-col justify-between'>
        <div className='text-center'>
          <iframe
            className='m-auto text-center'
            src='https://giphy.com/embed/l2JehQ2GitHGdVG9y'
            width='480'
            height='362'
            frameBorder='0'
            allowFullScreen
          ></iframe>
          <h1 className='mt-10 font-Montserrat text-gray-500 font-bold text-center text-xl'>
            {" "}
            That page does not seem to exist.
          </h1>
          <Link href='/'>
            <button className='m-auto font-CircularMedium bg-yellow-300 rounded-full mt-6 py-3 w-72 text-center md:max-w-xs md:mx-auto hover:scale-105 transition-all'>
              Go home
            </button>
          </Link>
        </div>
        <Footer />
      </main>
    </>
  );
}
