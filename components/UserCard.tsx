import Link from "next/link";

export default function UserCard(user) {
  return (
    <div className='text-center md:mt-12'>
      <img
        referrerPolicy='no-referrer'
        src={user.user.photoURL || "/hacker.png"}
        className='m-auto h-[150px] w-[150px] rounded-full'
      />

      <h1 className='text-4xl mt-3 font-bold'>
        {user.user.displayName || "Anonymous User"}
      </h1>
      <p className='text-xs hover:text-orange-600 cursor-pointer'>
        <Link href={`../${user.user.username}`}>
          <i>@{user.user.username}</i>
        </Link>
      </p>
    </div>
  );
}