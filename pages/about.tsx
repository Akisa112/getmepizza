import Link from "next/link";

import Footer from "./components/footer";
import { FiTwitter } from "react-icons/fi";

export default function Custom404() {
  return (
    <main className='h-[calc(100vh-107px)] flex flex-col justify-between lg:max-w-5xl lg:mx-auto'>
      <section className='px-3 py-6 mb-6 md:px-20'>
        <div>
          <h1 className='text-4xl font-bold text-center px-2 py-2 leading-10 md:text-4xl md:max-w-lg mx-auto lg:max-w-4xl lg:text-6xl lg:pt-14 '>
            Unlocking value through emerging tech.
          </h1>
        </div>
      </section>
      <hr />
      <section className='mt-8 lg:max-w-4xl lg:mx-auto'>
        <div className='mx-6'>
          <p className='text-gray-800 text-lg'>
            Get me pizza is built out of a personal need to allow my followers
            to support me with small amounts of crypto in a more meaninful way
            then just asking to gib money.
            <br />
            <br />
            Then I thought... Hey, maybe artists, influencers, and other
            creators could use this too.
            <br />
            <br />
            So I spent 1 month throughout the Moralis x Google Defining Defi
            Hackathon building the basic features of GetMe.🍕 using next,
            firebase, moralis and tailwindcss.
            <br />
            <br />
            That said, I intend to build upon this mvp by adding more features
            that allows web3 creators and artists to unlock their true potential
            value by adding new ways to connect with their audience.
            <br />
            <br />
            LFG!
            <br />
            <br />
            <Link href='https://twitter.com/elonsdev'>
              <a className='hover:text-orange-600 font-CircularMedium'>
                Elons Dev
              </a>
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
