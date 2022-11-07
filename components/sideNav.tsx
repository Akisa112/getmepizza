import { BiHome, BiCog } from "react-icons/bi";
import { AiOutlineLayout, AiOutlineMail } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  RiArticleLine,
  RiLogoutBoxRLine,
  RiFileLockFill,
  RiGalleryLine,
} from "react-icons/ri";
import { MdPersonOutline, MdPeopleOutline } from "react-icons/md";
import { BsLightning, BsQuestionDiamond } from "react-icons/bs";
import { ImEmbed2 } from "react-icons/im";
import { FaRegNewspaper } from "react-icons/fa";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export default function SideNav(props) {
  const router = useRouter();
  const username = props.username;

  return (
    <div className='m-8 font-CircularMedium mt-16 dark:text-slate-50 tracking-wide'>
      <ul className='items-center justify-center space-y-4  '>
        <li className='text-sm flex'>
          <BiHome className='mr-2 text-lg' />
          <Link className='' href='/dashboard'>
            <a className=' hover:text-orange-500 transition-all'>Dashboard</a>
          </Link>
        </li>

        <li className='text-sm flex'>
          <AiOutlineLayout className='mr-2 text-lg' />
          <Link className='' href={`/${username}`}>
            <a className=' hover:text-orange-500 transition-all'>View page</a>
          </Link>
          <HiOutlineExternalLink className='ml-2' />
        </li>
      </ul>
      <h4 className='mt-10 mb-4 text-gray-400 font-Montserrat text-xs'>
        PUBLISH
      </h4>
      <ul className='items-center justify-center space-y-4 '>
        <li className='text-sm flex'>
          <RiArticleLine className='mr-2 text-lg' />
          <Link className='' href='/posts'>
            <a className=' hover:text-orange-500 transition-all'>Your Posts</a>
          </Link>
        </li>
        <li className='text-sm flex'>
          <FaRegNewspaper className='mr-2 text-lg' />
          <Link className='' href='/feed'>
            <a className=' hover:text-orange-500 transition-all'>Feed</a>
          </Link>
        </li>
      </ul>
      <h4 className='mt-10 mb-4 text-gray-400 font-Montserrat text-xs'>
        SETTINGS
      </h4>
      <ul className='items-center justify-center space-y-4 '>
        <li className='text-sm flex'>
          <MdPersonOutline className='mr-2 text-lg' />
          <Link className='' href='/admin'>
            <a className=' hover:text-orange-500 transition-all'>My Account</a>
          </Link>
        </li>
      </ul>
      <h4 className='mt-10 mb-4 text-gray-400 font-Montserrat text-xs'>MORE</h4>
      <ul className='items-center justify-center space-y-4 '>
        <li className='text-sm flex'>
          <MdPeopleOutline className='mr-2 text-lg' />
          <Link className='' href='/explore'>
            <a className=' hover:text-orange-500 transition-all'>Explore</a>
          </Link>
        </li>
        <li className='text-sm flex'>
          <BsQuestionDiamond className='mr-2 text-lg' />
          <Link className='' href='/faq'>
            <a className=' hover:text-orange-500 transition-all'>F.A.Q.</a>
          </Link>
        </li>
        <li className='text-sm flex'>
          <RiLogoutBoxRLine className='mr-2 text-lg' />
          <p
            className='cursor-pointer'
            onClick={() => router.push(`./`).then(() => auth.signOut())}
          >
            <a className=' hover:text-orange-500 transition-all'>Logout</a>
          </p>
        </li>
      </ul>
      <h4 className='mt-10 mb-4 text-gray-400 font-Montserrat text-xs'>
        COMING SOON
      </h4>
      <ul className='items-center justify-center space-y-4 '>
        <li className='text-sm flex'>
          <RiFileLockFill className='mr-2 text-lg' />
          <p className=''>Memberships</p>
        </li>
        <li className='text-sm flex'>
          <AiOutlineMail className='mr-2 text-lg' />
          <p className=''>Messages</p>
        </li>
        <li className='text-sm flex'>
          <RiGalleryLine className='mr-2 text-lg' />
          <p className=''>NFT Gallery</p>
        </li>
        <li className='text-sm flex'>
          <BsLightning className='mr-2 text-lg' />
          <p className=''>Integrations</p>
        </li>
        <li className='text-sm flex'>
          <ImEmbed2 className='mr-2 text-lg' />
          <p className=''>Buttons & Graphics</p>
        </li>
      </ul>
    </div>
  );
}
