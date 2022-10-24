import { getMemos } from "../libs/moralis";
import { useState } from "react";

export function Supporters(user, chain) {
  const [mems, setMems] = useState();

  const memos = async () => {
    let memoArray;
    memoArray = await getMemos(user.user.ethAddress);
    setMems(memoArray);
  };

  if (!mems) {
    memos();
  }

  const createdAt = (number) => {
    return new Date(Number(number));
  };

  if (mems) {
    const memsLis = mems.slice(0, -5).map((memo, i) => (
      <li
        className='mt-1 mx-4 p-2  border-2 border-gray-200 rounded-lg bg-gray-100 '
        key={"memo_" + i}
      >
        <div className=' flex justify-between'>
          <p>
            {memo[3]} {memo[4]}
          </p>
          <p className='text-xs  font-CircularMedium'>
            {memo[5] / 100000000000000000} MATIC
          </p>
        </div>
        <div className='text-left text-xs'>
          <small>{createdAt(memo[2]).toString()}</small>
        </div>
      </li>
    ));

    return <ul>{memsLis}</ul>;
  }
}
