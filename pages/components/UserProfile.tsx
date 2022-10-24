import Link from "next/link";
import { useState } from "react";
import PostFeed from "./PostFeed";
import BuyPizza from "./BuyPizza";

import { Supporters } from "./Supporters";

// UI component for user profile
export default function UserProfile({ user, posts }) {
  const [page, setPage] = useState("HOME");

  return (
    <div className='text-center mt-12 md:max-w-4xl md:mx-auto'>
      <img
        referrerPolicy='no-referrer'
        src={user.photoURL || "/hacker.png"}
        className='m-auto rounded-full h-[150px] w-[150px] '
      />

      <h1 className='text-4xl mt-3 font-bold'>
        {user.displayName || "Anonymous User"}
      </h1>
      <p className='text-xs'>
        <i>@{user.username}</i>
      </p>
      <p className='text-gray-500 text-sm'>{user.supporters} supporters</p>
      <nav className='pt-4 pb-2 lg:pb-6'>
        <ul className='flex mx-6 justify-center'>
          <li
            onClick={() => setPage("HOME")}
            className='mx-4 font-CircularMedium text-xl text-gray-500 hover:underline hover:underline-offset-8 active:underline '
          >
            Home
          </li>
          <li
            onClick={() => setPage("POSTS")}
            className='mx-4 font-CircularMedium text-xl text-gray-500 hover:underline hover:underline-offset-8 active:underline'
          >
            Posts
          </li>
        </ul>
      </nav>
      {page === "HOME" ? (
        <div className='md:flex md:mx-auto justify-center'>
          <BuyPizza className='' user={user} />
          <div className='md:w-1/2'>
            <div className='mt-1 mx-4 p-2 text-left border-2 border-gray-200 rounded-lg bg-gray-100 '>
              <p>{user.about}</p>
              <br />
              <Link href={user.website}>
                <p className='text-orange-600'>{user.website}</p>
              </Link>
            </div>
            <h4 className='font-CircularMedium text-left mx-4 mt-8 text-gray-500 '>
              RECENT SUPPORTERS
            </h4>
            <Supporters user={user} />
          </div>
        </div>
      ) : (
        <div className='md:flex md:mx-auto justify-center'>
          <div className='md:w-[24rem]'>
            <PostFeed posts={posts} admin />
          </div>
          <BuyPizza className='w-full' user={user} />
        </div>
      )}
    </div>
  );
}
