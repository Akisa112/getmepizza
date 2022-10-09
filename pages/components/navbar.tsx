import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../libs/context';

export default function NavBar() {
    const { user, username } = useContext(UserContext)


    return (
        <main className=' bg-slate-50 pt-10 font-CircularMedium '>
            <section className='px-3 py-3  md:px-20 md:bg-white lg:max-w-4xl lg:mx-auto rounded-full '>
            <nav className='flex justify-between   '>
                <Link href={'/'}><h1 className='text-2xl md:pl-4'>getme.🍕</h1></Link>
                <ul className='flex items-center md:mr-4'>

                {username && (
                    <>
                        <li className='mx-2  text-sm'>
                            <Link href={`/admin`}>ADMIN</Link>
                        </li>
                        <li className='mx-2  text-sm'>
                            <Link href={`/${username}`}><img className='rounded-full' width={'30px'} src={user?.photoURL}/></Link>
                        </li>
                    </>
                )}

                {!username && (
                    <>
                        <li className='mx-2  text-sm'>
                            <Link href={"/faq"}>FAQ</Link>
                        </li>
                        <li className='mx-2  text-sm'>
                            <Link href={"/explore"}>Explore</Link>
                        </li>
                        <li className='mx-2 bg-yellow-400 rounded-full text-sm px-4  py-2'>
                            <Link href={"/enter"}>Sign up</Link>
                        </li>
                       
                    </>
                )}

                
                </ul>
            </nav>
            </section>
        </main>
    ) 
}