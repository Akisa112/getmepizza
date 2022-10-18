import Link from "next/link";

export default function UserCard(user) {
  return (
    <div className='text-center mt-12'>
      <img
        referrerPolicy='no-referrer'
        src={user.user.photoURL || "/hacker.png"}
        className='m-auto rounded-full'
      />

      <h1 className='text-4xl mt-3 font-bold'>
        {user.user.displayName || "Anonymous User"}
      </h1>
      <p className='text-xs hover:text-orange-600 cursor-pointer'>
        <Link href={`../${user.user.username}`}>
          <i>@{user.user.username}</i>
        </Link>
      </p>
      <p className='text-gray-500 text-sm'>{user.user.supporters} supporters</p>
    </div>
  );
}
