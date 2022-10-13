import Link from 'next/link';

export default function UsersFeed({ users }) {
    console.log(users)
  return users ? users.users.map((user) => <UserItem key={user.username} user={user} />) : null;
}

function UserItem({ user }) {


  return (
              <li className='mx-2 px-1 py-4  snap-center min-w-fit'>
                <img width={'150px'} height={'150px'} src={user.photoURL}/>
                <p className='max-w-[150px] font-Montserrat text-sm'><span className='font-CircularMedium  '>{user.username}</span> is coding the next big dapp.</p>
                <p className=' text-sm text-left mt-1 font-CircularMedium'>🍕 {user.supporters} Supporters</p>
              </li>
  );
}