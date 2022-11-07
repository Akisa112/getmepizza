import Link from "next/link";
import { createContext, useState } from "react";
import PostFeed from "./PostFeed";
import BuyPizza from "./BuyPizza";

import Supporters from "./Supporters";

export const successTxContext = createContext(null);

// UI component for user profile
export default function UserProfile({ user, posts }) {
  console.log(posts);
  const [page, setPage] = useState("HOME");
  const [successfullTx, setSuccesfullTx] = useState(false);

  console.log(posts);

  const noPosts = (
    <div className="className='mt-1 mx-4 p-2  h-[250px] flex flex-col justify-center ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-2xl">
      <h1 className='font-CircularMedium w-[250px] mx-auto'>
        {user.displayName} has no posts yet... <br />
        <br />
        Buy {user.displayName} a slice to motivate them to post!
      </h1>
    </div>
  );

  return (
    <div className='text-center mt-4 md:max-w-4xl md:mx-auto'>
      <img
        referrerPolicy='no-referrer'
        src={user.photoURL || "/hacker.png"}
        className='m-auto rounded-full h-[150px] w-[150px] '
      />
      <h1 className='text-4xl mt-3 font-bold'>
        {user.displayName.length > 16 &&
          `${user.displayName.substring(0, 17)}...`}
        {user.displayName.length < 17 && user.displayName}
      </h1>
      <h4 className='font-CircularMedium text-lg'>{user.creatorType}</h4>
      <p className='text-xs'>
        <i>@{user.username}</i>
      </p>

      <nav className='pt-4 pb-2 lg:pb-6'>
        <ul className='flex mx-6 justify-center'>
          <li
            onClick={() => setPage("HOME")}
            className='mx-4 font-CircularMedium text-xl text-gray-500 cursor-pointer hover:underline hover:underline-offset-8 active:underline '
          >
            Home
          </li>
          <li
            onClick={() => setPage("POSTS")}
            className='mx-4 font-CircularMedium text-xl text-gray-500 cursor-pointer hover:underline hover:underline-offset-8 active:underline'
          >
            Posts
          </li>
        </ul>
      </nav>
      <successTxContext.Provider value={{ successfullTx, setSuccesfullTx }}>
        {page === "HOME" ? (
          <div className='md:flex md:mx-auto justify-center'>
            <BuyPizza className='' user={user} />
            <div className='md:w-1/2 '>
              <div className=' mt-1 mx-4 p-4 text-left ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-2xl '>
                <p className='mx-2'>{user.about}</p>
                <br />
                <Link target='_blank' href={user.website}>
                  <a
                    target='_blank'
                    className='mx-2 text-orange-600 cursor-pointer'
                  >
                    {user.website.length > 39 &&
                      `${user.website.substring(0, 40)}...`}
                    {user.website.length < 40 && user.website}
                  </a>
                </Link>
              </div>
              <Supporters user={user} />
            </div>
          </div>
        ) : (
          <div className='md:flex md:mx-auto justify-center'>
            <div className='mx-1 mb-8 md:w-[24rem]'>
              <PostFeed posts={posts} admin={false} />
              {posts.length === 0 && noPosts}
            </div>
            <BuyPizza className='w-full' user={user} />
          </div>
        )}
      </successTxContext.Provider>
    </div>
  );
}
