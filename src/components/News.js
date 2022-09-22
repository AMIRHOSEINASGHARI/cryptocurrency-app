import React, { useEffect, useState } from "react";
///api functions
import { fetchNews } from "../services/fetchFromApi";
//components
import moment from "moment/moment";
//demo image
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [news, setNews] = useState({});
  const [category, setCategory] = useState("cryptocurrency");
  useEffect(() => {
    const fetchData = async () => {
      setNews(await fetchNews(category, simplified ? 10 : 100));
    };
    fetchData();
  }, []);
  if (Object.keys(news).length === 0) return "Loading...";
  return (
    <div className="mx-auto max-w-[1300px]">
      {!simplified && (
        <h1 className="p-3 text-center text-lg lg:text-2xl lg:mt-5 font-bold capitalize">
          latest cryptocurrency news
        </h1>
      )}
      <div className="card-grid-layout-secondary">
        {news.value.map((item, i) => {
          return (
            <div key={i} className="card-styles-primary">
              <a className="space-y-5" href={item.url} target="_blank">
                <div className="flex space-x-2">
                  <h5 className="font-semibold">
                    {item.name.length > 50
                      ? `${item.name.substring(0, 50)}....`
                      : item.name}
                  </h5>
                  {item.image && (
                    <img
                      className="w-20 h-20 rounded"
                      src={item.image.thumbnail.contentUrl || demoImage}
                      alt="news"
                    />
                  )}
                </div>
                <p>
                  {item.description.length > 150
                    ? `${item.description.substring(0, 150)}......`
                    : item.description}
                </p>
                <hr />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {item.provider[0].image ? (
                      <img
                        className="w-10 rounded-full"
                        src={item.provider[0].image.thumbnail.contentUrl}
                        alt=""
                      />
                    ) : (
                      <img className="w-10 rounded-full" src={demoImage} />
                    )}
                    <span className="font-medium text-xs w-32">
                      {item.provider[0].name}
                    </span>
                  </div>
                  <span className="text-sm">
                    {moment(item.datePublished).startOf("ss").fromNow()}
                  </span>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
