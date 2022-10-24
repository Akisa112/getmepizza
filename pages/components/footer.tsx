import Link from "next/link";
import { FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <section className='px-3 pb-10 md:px-20'>
      <nav className='pt-10  pb-2 flex justify-center'>
        <ul className='flex items-center'>
          <li className='mx-2  text-sm hover:text-orange-500'>
            <Link href={"/faq"}>FAQ</Link>
          </li>
          <li className='mx-2  text-sm  hover:text-orange-500'>
            <Link href={"/about"}>ABOUT</Link>
          </li>
          <li className='mx-2  text-sm  hover:text-orange-500'>
            <Link href={"/privacy"}>PRIVACY</Link>
          </li>
          <li className='mx-2  text-sm  hover:text-orange-500'>
            <Link href={"/terms"}>TERMS</Link>
          </li>
        </ul>
      </nav>
      <div className='mt-2 w-2 mx-auto'>
        <Link href={"https://twitter.com/getme_pizza"}>
          <a className='text-2xl hover:text-orange-500 cursor-pointer'>
            <FiTwitter className='mx-auto' />
          </a>
        </Link>
      </div>
      <div className='mt-3 text-center mx-auto'>
        <Link href='./'>
          <a className='font-Montserrat  hover:text-orange-500 cursor-pointer'>
            getme.🍕
          </a>
        </Link>
      </div>
    </section>
  );
}
