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
    </div>
  );
};

export default CryptoDetails;
