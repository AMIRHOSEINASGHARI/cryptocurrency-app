import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//api functions
import { fetchCoin, fetchCoinPriceHistory } from "../services/fetchFromApi";
//components
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import {
  AiOutlineDollarCircle,
  AiOutlineNumber,
  AiOutlineExclamationCircle,
  AiOutlineStop,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import Loader from "./Loader";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [coinPriceHistory, setCoinPriceHistory] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setCoin(await fetchCoin(id));
      setCoinPriceHistory(await fetchCoinPriceHistory(id, "24h"));
    };
    fetchData();
  }, []);
  if (Object.keys(coin).length === 0) return <Loader />;
  const stats = [
    {
      title: "Price to USD",
      value: `${coin.price && millify(coin.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: "Rank", value: coin.rank, icon: <AiOutlineNumber /> },
    {
      title: "Market Cap",
      value: `${coin.marketCap && millify(coin.marketCap)}`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${coin.allTimeHigh?.price && millify(coin.allTimeHigh?.price)}`,
      icon: <AiOutlineTrophy />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: coin.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: "Number Of Exchanges",
      value: coin.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Aprroved Supply",
      value: coin.supply?.confirmed ? (
        <AiOutlineCheckCircle />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${coin.supply?.total && millify(coin.supply?.total)}`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coin.supply?.circulating && millify(coin.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];
  return (
    <div className="min-h-screen max-w-[1300px] mx-auto">
      {/* heading */}
      <div className="text-center my-10 px-3 space-y-2">
        <h1 className="text-blue-500 text-3xl font-bold">
          {coin.name} ({coin.symbol}) Price
        </h1>
        <p className="text-gray-500">
          {coin.name} live price in US Dollar (USD). View value statistics,
          market cap and supply.
        </p>
        <hr className="bg-gray-300" />
      </div>
      <div className="p-3">
        {/* chart headings */}
        <div>
          <h1 className="text-blue-500 text-2xl font-semibold">
            {coin.name} Price Chart
          </h1>
          <div className="md:flex md:items-center md:space-x-5">
            <h2>
              Change:{" "}
              <span
                className={`${
                  coin.change < 0 ? "text-red-500" : "text-green-500"
                } font-bold`}
              >
                {coin.change}%
              </span>
            </h2>
            <h2>
              Current {coin.name} Price: ${" "}
              <span className="font-bold">{millify(coin.price)}</span>
            </h2>
          </div>
        </div>
        {/* line chart */}
        <LineChart coinHistory={coinPriceHistory} />
        {/* info */}
        <div className="lg:flex lg:justify-between lg:space-x-14">
          <div className="mt-8">
            <h1 className="text-blue-500 text-2xl font-semibold">
              {coin.name} Value Statistics
            </h1>
            <p className="mt-2 mb-3">
              An overview showing the statistics of {coin.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
            <div className="">
              {stats.map((el, i) => (
                <div
                  className={`flex items-center justify-between py-6 px-2 ${
                    i < stats.length - 1 && "border-b"
                  }`}
                  key={i}
                >
                  <div className="flex items-center text-gray-600 space-x-2">
                    {el.icon}
                    <span>{el.title}</span>
                  </div>
                  <span className="font-bold">{el.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-blue-500 text-2xl font-semibold">
              Other Stats Info
            </h1>
            <p className="mt-2 mb-3">
              An overview showing the statistics of {coin.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
            <div className="">
              {genericStats.map((el, i) => (
                <div
                  className={`flex items-center justify-between py-6 px-2 ${
                    i < stats.length - 1 && "border-b"
                  }`}
                  key={i}
                >
                  <div className="flex items-center text-gray-600 space-x-2">
                    {el.icon}
                    <span>{el.title}</span>
                  </div>
                  <span className="font-bold">{el.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* description */}
        <div className="my-14 grid grid-cols-1 gap-y-16 lg:grid-cols-2 gap-x-14">
          <div>
            <h1 className="text-blue-500 text-2xl font-bold mb-2">
              What is {coin.name}
            </h1>
            <div className="html-parser">
              {HTMLReactParser(coin.description)}
            </div>
          </div>
          <div>
            <h1 className="text-blue-500 text-2xl font-bold mb-2">
              {coin.name} Links
            </h1>
            <div>
              {coin.links.map((el, i) => (
                <div
                  className={`flex items-center justify-between py-6 px-2 ${
                    i < coin.links.length - 1 && "border-b"
                  }`}
                  key={i}
                >
                  <span className="capitalize">{el.type}</span>
                  <a
                    href={`${el.url}`}
                    target="_blank"
                    className="font-bold text-blue-500"
                  >
                    {el.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
