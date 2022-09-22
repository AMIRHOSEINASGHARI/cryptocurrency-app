import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//api functions
import { fetchCoins } from "../services/fetchFromApi";
//components
import millify from "millify";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [inputValue, setInputValue] = useState("");
  const [coins, setCoins] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setCoins(await fetchCoins(count));
    };
    fetchData();
  }, []);
  if (Object.keys(coins).length === 0) return "Loading...";
  const filteredCoins = coins.coins.filter((el) =>
    el.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  return (
    <>
      {!simplified && (
        <div className="flex items-center justify-center mt-5 md:mt-10 md:mb-5 px-3">
          <input
            className="rounded bg-white py-2 px-3 w-full md:w-[400px] border placeholder:text-gray-300 outline-none"
            type="text"
            placeholder="Search Cryptocurrency..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      )}
      <div className="max-w-[1300px] mx-auto card-grid-layout-primary">
        {filteredCoins.map((el, i) => {
          const { rank, name, iconUrl, price, marketCap, change, uuid } = el;
          return (
            <Link
              to={`/crypto/${uuid}`}
              className="card-styles-primary space-y-3"
              key={i}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-medium">
                  {rank}. {name}
                </h1>
                <img className="w-10" src={iconUrl} alt={name} />
              </div>
              <hr />
              <p>Price: {millify(price)}</p>
              <p>Market Cap: {millify(marketCap)}</p>
              <p>
                Daily Change:{" "}
                <span
                  className={`${
                    change < 0 ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {change}%
                </span>
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Cryptocurrencies;
