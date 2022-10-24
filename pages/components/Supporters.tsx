import { getMemos } from "../libs/moralis";
import { useEffect, useState } from "react";
import { firestore } from "../libs/firebase";

export function Supporters(user) {
  const [mems, setMems] = useState([]);

  const [memsMumbai, setMemsMumbai] = useState([]);
  const [memsBinance, setMemsBinance] = useState([]);
  const [memsFantom, setMemsFantom] = useState([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const memePerPage = 4;
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);
  const [chain, setChain] = useState("MUMBAI");

  const onNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
      setStart(false);
      if (page + 1 === pages) {
        setEnd(true);
      }
    }
  };

  const onPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setEnd(false);
      if (page === 2) {
        setStart(true);
      }
    }
  };

  const memos = async () => {
    let memoArray;
    if (user.user.ethAddress) {
      memoArray = await getMemos(user.user.ethAddress, chain);
      setMemsMumbai(memoArray.reverse());
      setMems(memsMumbai);
      setPages(Math.ceil(memoArray.length / memePerPage));
    }
  };

  useEffect(() => {
    if (mems.length === 0) {
      memos();
    }
  }, [mems]);

  const createdAt = (number) => {
    return new Date(Number(number));
  };

  const changeChains = (chosenChain) => {
    if (chosenChain === "MUMBAI") {
      setMems(memsMumbai);
    } else if (chosenChain === "BINANCE") {
      setMems(memsBinance);
      setChain("BINANCE");
    }
  };

  if (mems) {
    const memsLis = mems
      .slice((page - 1) * memePerPage, page * memePerPage)
      .map((memo, i) => (
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
            <small>{createdAt(memo[2] * 1000).toString()}</small>
          </div>
        </li>
      ));

    return (
      <>
        <h4 className='font-CircularMedium text-left mx-4 mt-4 mb-2 text-gray-500 '>
          RECENT SUPPORTERS
        </h4>
        <div className='flex justify-end mx-2 mb-3'>
          <button
            disabled={chain === "MUMBAI"}
            className='font-CircularMedium bg-yellow-400 rounded-full mt-1 py-2 w-32 text-center disabled:bg-gray-300 md:max-w-xs md:mx-auto'
            onClick={() => {
              changeChains("MUMBAI");
            }}
          >
            Mumbai
          </button>
          <button
            disabled={chain === "BINANCE"}
            className='font-CircularMedium bg-yellow-400 rounded-full mt-1 py-2 w-32 text-center md:max-w-xs md:mx-auto'
            onClick={() => {
              changeChains("BINANCE");
            }}
          >
            Binance
          </button>
          <button
            disabled={end}
            className='font-CircularMedium bg-yellow-400 rounded-full mt-1 py-2 w-32 text-center md:max-w-xs md:mx-auto'
            onClick={() => {}}
          >
            Fantom
          </button>
        </div>
        <ul>{memsLis}</ul>
        <div className='flex justify-center'>
          <button
            disabled={start}
            className='font-CircularMedium bg-yellow-400 rounded-full mt-2 py-2 w-32 text-center disabled:bg-gray-300 md:max-w-xs md:mx-auto'
            onClick={() => {
              onPrevPage();
            }}
          >
            Prev...
          </button>
          <button
            disabled={end}
            className='font-CircularMedium bg-yellow-400 rounded-full mt-2 py-2 w-32 text-center disabled:bg-gray-500 md:max-w-xs md:mx-auto'
            onClick={() => {
              onNextPage();
            }}
          >
            More...
          </button>
        </div>
      </>
    );
  }
}
