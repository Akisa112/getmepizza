import Link from "next/link";
import { useState } from "react";
import PostFeed from "./PostFeed";

// UI component for user profile
export default function UserProfile({ user, posts }) {
    const [page, setPage] = useState('HOME');

    return (
      <div className="text-center mt-12">
        <img src={user.photoURL || '/hacker.png'} className="m-auto rounded-full" />
        
        <h1 className="text-4xl mt-3 font-bold">{user.displayName || 'Anonymous User'}</h1>
        <p className="text-xs">
          <i>@{user.username}</i>
        </p>
        <p className="text-gray-500 text-sm">{user.supporters} supporters</p>
        <nav className="pt-4 lg:pb-6">
          <ul className="flex mx-6 justify-center">
            <li onClick={() => setPage('HOME')} className="mx-4 font-CircularMedium text-xl text-gray-500 hover:underline hover:underline-offset-8 active:underline ">Home</li>
            <li onClick={() => setPage('POSTS')} className="mx-4 font-CircularMedium text-xl text-gray-500 hover:underline hover:underline-offset-8 active:underline">Posts</li>
          </ul>
        </nav>
        {page === 'HOME' ? (
            <div className="lg:flex">
                <div className="mt-1 py-8 m-4  border-2 border-gray-200 rounded-lg lg:w-1/2">
                    <h4 className="font-CircularMedium text-2xl">Buy <span className="text-gray-500">{user.displayName}</span> a pizza</h4>
                    <div className="mt-10 py-6 m-4  border-2 border-gray-200 rounded-lg bg-orange-50">
                        <p className="font-Montserrat text-gray-500"><span className="text-5xl align-middle">🍕</span> x 
                        <span className="ml-4 px-4 text-orange-600 py-2 mx-1 border-2 rounded-full">
                            1
                        </span>
                        <span className="px-4 text-orange-600 py-2 mx-1 border-2 rounded-full">
                            2
                        </span>
                        <span className="px-4 text-orange-600 py-2 mx-1 border-2 rounded-full">
                            5
                        </span>
                        <span className="px-3 text-orange-600 py-2 mx-1 border-2 rounded-full">
                            10
                        </span>
                        </p>
                    </div>
                    
                    <form>
                        <div className="mt-1 mx-4 border-2 border-gray-200 rounded-lg bg-gray-100 ">
                        <textarea className="min-w-full p-3 bg-gray-100"  placeholder="Say something nice... (optional)"/>
                        </div>
                        <button type="submit" className="font-CircularMedium bg-yellow-400 rounded-full mt-6 py-3 w-72 text-center md:max-w-xs md:mx-auto" >
                        Support $5
                        </button>
                    </form>
                </div>
                <div>
                    <div className="mt-1 mx-4 p-2 text-left border-2 border-gray-200 rounded-lg bg-gray-100 ">
                        <p>{user.about}</p>
                        <br/>
                        <Link href={user.website}><p className="text-orange-600">{user.website}</p></Link>
                    </div>
                    <h4 className="font-CircularMedium text-left mx-4 mt-8 text-gray-500 ">RECENT SUPPORTERS</h4>
                    <div className="mt-1 mx-4 p-2 py-4 text-left border-2 border-gray-200 rounded-lg ">
                        <p>@Someone bought a pizza</p>
                    </div>
                    <div className="mt-1 mx-4 p-2 py-4 text-left border-2 border-gray-200 rounded-lg ">
                        <p>@Someone bought a pizza</p>
                    </div>
                    <div className="mt-1 mx-4 p-2 py-4 text-left border-2 border-gray-200 rounded-lg ">
                        <p>@Someone bought a pizza</p>
                    </div>
                    <div className="mt-1 mx-4 p-2 py-4 text-left border-2 border-gray-200 rounded-lg ">
                        <p>@Someone bought a pizza</p>
                    </div>
                </div>
                
            </div>
        ):(
            <>
                <PostFeed posts={posts}/>
            </>
        )}
        
        
      </div>
    );
  }