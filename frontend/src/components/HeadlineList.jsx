import React, { useState, useEffect } from "react";
import axios from "axios";

const HeadlineList = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    axios
      .get("https://headline-api.onrender.com/headlines")
      .then((response) => {
        setHeadlines(response.data);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Trending Headlines
        </h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {headlines.map((headline) => (
            <div
              key={headline._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-blue-500 text-white p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {headline.originalHeadline}
                </h2>
                <p className="text-sm">{headline.rhymingHeadline}</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{headline.biasSummary}</p>
                <a
                  href={headline.articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-4 block hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadlineList;
