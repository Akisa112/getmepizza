import { BiHome, BiCog } from "react-icons/bi";
import { AiOutlineLayout, AiOutlineMail } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  RiArticleLine,
  RiLogoutBoxRLine,
  RiFileLockFill,
  RiGalleryLine,
} from "react-icons/ri";
import { MdPersonOutline } from "react-icons/md";
import { BsLightning } from "react-icons/bs";
import { ImEmbed2 } from "react-icons/im";
import Link from "next/link";
import { auth } from "../libs/firebase";

export default function MobileNav(username) {
  return (
    <div className='m-8 font-CircularMedium mt-16'>
      <ul className='items-center justify-center space-y-4  '>
        <li className='text-sm flex'>
          <BiHome className='mr-2 text-lg fill-orange-600' />
          <Link className='' href='/dashboard'>
            Home
          </Link>
        </li>

        <li className='text-sm flex'>
          <AiOutlineLayout className='mr-2 text-lg' />
          <Link className='' href={`/${username.username}`}>
            View page
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
            Posts
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
            My Account
          </Link>
        </li>
      </ul>
      <h4 className='mt-10 mb-4 text-gray-400 font-Montserrat text-xs'>MORE</h4>
      <ul className='items-center justify-center space-y-4 '>
        <li className='text-sm flex'>
          <RiLogoutBoxRLine className='mr-2 text-lg' />
          <p className='cursor-pointer' onClick={() => auth.signOut()}>
            Logout
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
