import { getMemos } from "../lib/moralis";
import { useContext, useEffect, useState } from "react";

import { successTxContext } from "./UserProfile";

import PolygonLogo from "../public/polygon.png";
import BinanceLogo from "../public/binance.png";
import FantomLogo from "../public/fantom.png";

import Image from "next/image";

export default function Supporters(user) {
  const [mems, setMems] = useState([]);

  const [memsMumbai, setMemsMumbai] = useState([]);
  const [memsBinance, setMemsBinance] = useState([]);
  const [memsFantom, setMemsFantom] = useState([]);
  const [chain, setChain] = useState("Smart Chain");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const memePerPage = 4;
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);

  const { successfullTx } = useContext(successTxContext);

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

  const memosPoly = async () => {
    let memoArrayPoly;
    if (user.user.ethAddress) {
      memoArrayPoly = await getMemos(user.user.ethAddress, "Polygon");
      setMemsMumbai(memoArrayPoly.reverse());
      if (chain === "Polygon") {
        setMems(memoArrayPoly);
        setPages(Math.ceil(memoArrayPoly.length / memePerPage));

        if (Math.ceil(memoArrayPoly.length / memePerPage) === 1) {
          setEnd(true);
        } else {
          setEnd(false);
        }
      }
    }
  };

  const memosBinance = async () => {
    let memoArrayBinance;
    if (user.user.ethAddress) {
      memoArrayBinance = await getMemos(user.user.ethAddress, "Smart Chain");
      setMemsBinance(memoArrayBinance.reverse());
      if (chain === "Smart Chain") {
        setMems(memoArrayBinance);
        setPages(Math.ceil(memoArrayBinance.length / memePerPage));
        if (Math.ceil(memoArrayBinance.length / memePerPage) === 1) {
          setEnd(true);
        } else {
          setEnd(false);
        }
      }
    }
  };

  const memosFantom = async () => {
    let memoArrayFantom;
    if (user.user.ethAddress) {
      memoArrayFantom = await getMemos(user.user.ethAddress, "Fantom");
      setMemsFantom(memoArrayFantom.reverse());
      if (chain === "Fantom") {
        setMems(memoArrayFantom);
        setPages(Math.ceil(memoArrayFantom.length / memePerPage));
        if (Math.ceil(memoArrayFantom.length / memePerPage) === 1) {
          setEnd(true);
        } else {
          setEnd(false);
        }
      }
    }
  };

  useEffect(() => {
    memosBinance();

    memosPoly();

    memosFantom();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (successfullTx) {
        if (chain === "Polygon") {
          memosPoly();
        }
        if (chain === "Smart Chain") {
          memosBinance();
        }
        if (chain === "Fantom") {
          memosFantom();
        }
      }
    }, 2000);
  }, [successfullTx]);

  const createdAt = (number) => {
    return new Date(Number(number));
  };

  const changeChains = (chosenChain) => {
    if (chosenChain === "Polygon") {
      setPage(1);
      setMems(memsMumbai);
      setPages(Math.ceil(memsMumbai.length / memePerPage));
      if (Math.ceil(memsMumbai.length / memePerPage) === 1) {
        setEnd(true);
      } else {
        setEnd(false);
      }
      setStart(true);
      setChain("Polygon");
    } else if (chosenChain === "Smart Chain") {
      setPage(1);
      setMems(memsBinance);
      setPages(Math.ceil(memsBinance.length / memePerPage));
      if (Math.ceil(memsBinance.length / memePerPage) === 1) {
        setEnd(true);
      } else {
        setEnd(false);
      }
      setStart(true);
      setChain("Smart Chain");
    } else if (chosenChain === "Fantom") {
      setPage(1);
      setMems(memsFantom);
      setPages(Math.ceil(memsFantom.length / memePerPage));
      if (Math.ceil(memsFantom.length / memePerPage) === 1) {
        setEnd(true);
      } else {
        setEnd(false);
      }
      setStart(true);
      setChain("Fantom");
    }
  };

  const memsLis = mems
    .slice((page - 1) * memePerPage, page * memePerPage)
    .map((memo, i) => (
      <li
        className='mt-1 mx-4 p-2  ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-lg'
        key={"memo_" + i}
      >
        <div className=' flex justify-between'>
          <p className=' '>{memo[4]}</p>
          <p className='text-xs font-CircularMedium'>
            {(memo[5] / 1000000000000000000).toFixed(5)}
            {"... "}
            {chain === "Polygon" && "MATIC"} {chain === "Smart Chain" && "BNB"}{" "}
            {chain === "Fantom" && "FTM"}
          </p>
        </div>
        <div className='mt-2 flex justify-between text-xs'>
          <small>
            {createdAt(memo[2] * 1000)
              .toString()
              .slice(0, 34)}
          </small>
          <small>
            {memo[3].length > 11
              ? `${memo[3].slice(0, 10)}... bought ${memo[6]} 🍕`
              : `${memo[3]} bought ${memo[6]} 🍕`}
          </small>
        </div>

        <small></small>
      </li>
    ));

  const noMemsLis = (
    <div className='className=mt-1 mx-4 p-2  h-[250px] flex flex-col justify-center ring-1 ring-slate-50 dark:ring-zinc-900 bg-white dark:bg-zinc-800 rounded-2xl'>
      <h1 className='font-CircularMedium'>
        {user.user.displayName} has no tips yet on {chain} yet... <br />
        Buy {user.user.displayName} a slice and make their day!
      </h1>
    </div>
  );

  return (
    <div className='mt-8 md:w-[450px]'>
      <h4 className='font-CircularMedium text-left mx-4 mt-4 mb-3 text-gray-500 '>
        RECENT SUPPORTERS
      </h4>
      <div className='flex justify-end mx-4 mb-5 dark:text-black'>
        <button
          disabled={chain === "Smart Chain"}
          className='mr-1 font-CircularMedium bg-yellow-100 rounded-full mt-1 py-2 w-32 text-center disabled:bg-white disabled:ring-yellow-300 disabled:ring-2  md:max-w-xs md:mx-auto hover:scale-105 transition-all'
          onClick={() => {
            changeChains("Smart Chain");
          }}
        >
          <span className='text-xs mr-2 align-bottom '>
            <Image width='20px' height='20px' src={BinanceLogo} />
          </span>
          Binance
        </button>
        <button
          disabled={chain === "Polygon"}
          className='mx-1 font-CircularMedium bg-purple-100 rounded-full mt-1 py-2 w-32 text-center disabled:bg-white disabled:ring-violet-300 disabled:ring-2 disabled:hover:scale-100 md:max-w-xs md:mx-auto hover:scale-105 transition-all'
          onClick={() => {
            changeChains("Polygon");
          }}
        >
          <span className='text-xs mr-2 align-bottom '>
            <Image width='20px' height='20px' src={PolygonLogo} />
          </span>
          Polygon
        </button>

        <button
          disabled={chain === "Fantom"}
          className='ml-1 font-CircularMedium bg-blue-100 rounded-full mt-1 py-2 w-32 text-center disabled:bg-white disabled:ring-violet-300 disabled:ring-2 disabled:hover:scale-100 md:max-w-xs md:mx-auto hover:scale-105 transition-all'
          onClick={() => {
            changeChains("Fantom");
          }}
        >
          <span className='text-xs mr-2 align-bottom '>
            <Image width='20px' height='20px' src={FantomLogo} />
          </span>
          Fantom
        </button>
      </div>

      <div className=' flex flex-col justify-between'>
        <ul>{memsLis.length > 0 ? memsLis : noMemsLis}</ul>

        {memsLis.length > 0 && (
          <div className=' flex justify-around'>
            <button
              disabled={start}
              className='font-CircularMedium bg-yellow-300 rounded-full mt-2 py-2 w-32 text-center disabled:bg-gray-200 disabled:hover:scale-100 md:max-w-xs md:mx-auto hover:scale-105  transition-all dark:text-black'
              onClick={() => {
                onPrevPage();
              }}
            >
              Prev...
            </button>
            <button
              disabled={end}
              className='font-CircularMedium bg-yellow-300 rounded-full mt-2 py-2 w-32 text-center disabled:bg-gray-200 disabled:hover:scale-100 md:max-w-xs md:mx-auto hover:scale-105 transition-all dark:text-black'
              onClick={() => {
                onNextPage();
              }}
            >
              More...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
