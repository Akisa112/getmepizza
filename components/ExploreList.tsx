import Link from "next/link";

export default function ExploreList({ users, SelectedFeed }) {
  return users
    ? users.map((user) => (
        <UserItem key={user.username} user={user} SelectedFeed={SelectedFeed} />
      ))
    : null;
}

function UserItem({ user, SelectedFeed }) {
  if (user.creatorType == SelectedFeed) {
    return (
      <li className='mx-2 px-1 py-4  snap-center min-w-fit hover:scale-105 transition-all'>
        <Link href={`/${user.username}`}>
          <img
            className='rounded-full cursor-pointer h-[150px] w-[150px]'
            referrerPolicy='no-referrer'
            width={"150px"}
            height={"150px"}
            src={user.photoURL}
          />
        </Link>

        <p className='max-w-[150px] h-[60px] line-clamp-3 mt-2 font-Montserrat text-sm'>
          <span className='font-CircularMedium  '>
            <Link href={`/${user.username}`}>{user.username}</Link>
          </span>{" "}
          {user.about}
        </p>

        <p className=' text-sm text-left mt-1 font-CircularMedium'></p>
      </li>
    );
  }
}
