import React, { useEffect, useState } from "react";
import day from "dayjs";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setNews(data?.articles);
    };
    fetchData(
      "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json"
    );
  }, []);

  return (
    <div className="bg-white h-fit mt-6 border border-gray-200 rounded-lg shadow-md p-6 mb-6 w-80 mr-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">LinkedIn News</h1>
      <p className="text-sm text-gray-600 mb-6">Top News</p>
      {news?.splice(0,4).map((elem, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{elem.title}</h2>
          <p className="text-sm text-gray-500">
            {day(elem.publishedAt).format("MMMM D, YYYY h:mm A")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
