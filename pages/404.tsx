import Link from "next/link";

import Footer from "./components/footer";

export default function Custom404() {
  return (
    <main className='h-[calc(100vh-107px)] flex flex-col justify-between'>
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
          <button className='m-auto font-CircularMedium bg-yellow-300 rounded-full mt-6 py-3 w-72 text-center md:max-w-xs md:mx-auto'>
            Go home
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
