import axios from "axios";

const fetchCoins = async (count) => {
  const response = await axios.get(
    `https://coinranking1.p.rapidapi.com/coins?limit=${count}`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    }
  );
  return response.data.data;
};

const fetchCoin = async (id) => {
  const response = await axios.get(
    `https://coinranking1.p.rapidapi.com/coin/${id}`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    }
  );
  return response.data.data.coin;
};

const fetchCoinPriceHistory = async (id, timePeriod) => {
  const response = await axios.get(
    `https://coinranking1.p.rapidapi.com/coin/${id}/history?timePeriod=${timePeriod}`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    }
  );
  return response.data.data;
};

const fetchExchanges = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/exchanges?per_page=250&page=1"
  );
  return response.data;
};

const fetchNews = async (category, count) => {
  const response = await axios.get(
    `https://bing-news-search1.p.rapidapi.com/news/search`,
    {
      params: {
        q: category,
        count: count,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    }
  );
  return response.data;
};

export {
  fetchCoins,
  fetchCoin,
  fetchCoinPriceHistory,
  fetchExchanges,
  fetchNews,
};
