import React, { useEffect, useState } from "react";
//api functions
import { fetchExchanges } from "../services/fetchFromApi";
//components
import millify from "millify";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setExchanges(await fetchExchanges());
    };
    fetchData();
  }, []);
  if (exchanges.length === 0) return "Loading...";
  return (
    <div className="max-w-[1300px] mx-auto p-3 space-y-3">
      <div className="grid items-center grid-cols-2 text-xs md:text-base lg:text-xl lg:mb-6">
        <h1>Exchanges</h1>
        <h1>24h Trade Volume</h1>
      </div>
      <div>
        {exchanges.map((item) => {
          const { name, id, image, trust_score_rank, trade_volume_24h_btc } =
            item;
          return (
            <div
              key={id}
              className="text-xs lg:text-base grid items-center grid-cols-2 border p-2 lg:p-4"
            >
              <div className="flex items-center space-x-2 lg:space-x-4">
                <p>{trust_score_rank}.</p>
                <img className="w-7" src={image} alt={name} />
                <p>{name}</p>
              </div>
              <p>{millify(trade_volume_24h_btc)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Exchanges;
