import Link from "next/link";

export default function Footer() {
  return (
    <section className='px-3 pt-12 pb-10 md:px-20 text-center'>
      <Link href='../'>
        <a className='font-CircularMedium hover:text-orange-600'>
          powered by getme.🍕
        </a>
      </Link>
    </section>
  );
}
