import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//api functions
import { fetchCoins } from "../services/fetchFromApi";
//components
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const Home = () => {
  const [coinsData, setCoinsData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setCoinsData(await fetchCoins(10));
    };
    fetchData();
  }, []);
  if (Object.keys(coinsData).length === 0) return "Loading...";
  const {
    stats: {
      total24hVolume,
      totalCoins,
      totalExchanges,
      totalMarketCap,
      totalMarkets,
    },
  } = coinsData;
  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="grid text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 capitalize p-3 gap-5 my-16">
        <div>
          <h4 className="text-gray-500">total cryptocurrencies</h4>
          <h1 className="text-xl lg:text-3xl">{totalCoins}</h1>
        </div>
        <div>
          <h4 className="text-gray-500">total market cap</h4>
          <h1 className="text-xl lg:text-3xl">{millify(totalMarketCap)}</h1>
        </div>
        <div>
          <h4 className="text-gray-500">total markets</h4>
          <h1 className="text-xl lg:text-3xl">{millify(totalMarkets)}</h1>
        </div>
        <div>
          <h4 className="text-gray-500">total exchanges</h4>
          <h1 className="text-xl lg:text-3xl">{totalExchanges}</h1>
        </div>
        <div>
          <h4 className="text-gray-500">total 24h volume</h4>
          <h1 className="text-xl lg:text-3xl">{millify(total24hVolume)}</h1>
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <h1 className="text-sm md:text-2xl lg:text-3xl font-bold">
          Top 10 Cryptos In The World
        </h1>
        <Link to={`/cryptocurrencies`} className="text-blue-500">
          Show More
        </Link>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="flex items-center justify-between p-3">
        <h1 className="text-sm md:text-2xl lg:text-3xl font-bold">
          Latest Crypto News
        </h1>
        <Link to={`/news`} className="text-blue-500">
          Show More
        </Link>
      </div>
      <News simplified={true} />
    </div>
  );
};

export default Home;
