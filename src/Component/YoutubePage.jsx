import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import News from "./News";
import { format } from "date-fns";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDebouncedValue } from "@mantine/hooks";

import { toast } from "react-toastify";

const YoutubePage = () => {
  const [youtubeData, setYoutubeData] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState("");
  const [filterYoutubeData, setFilterYoutubeData] = useState([]);
  const [debounced] = useDebouncedValue(searching, 200);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(10);

  const fetchYoutube = async () => {
    try {
      const res = await instance({
        url: `/?limit=${limit}&skip=${skip}`,
      });
      const sortedData = res.data.data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      console.log(sortedData);
      if (skip === 0) {
        setYoutubeData(sortedData);
        setFilterYoutubeData(sortedData);
      } else {
        setYoutubeData((prevItems) => [...prevItems, ...sortedData]);
        setFilterYoutubeData((prevItems) => [...prevItems, ...sortedData]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return;
    }
  };
  const filterByTitle = (data, title) => {
    return data.filter((item) =>
      item.title?.toLowerCase().includes(title?.toLowerCase())
    );
  };

  useEffect(() => {
    if (debounced.length === 0) {
      return;
    }
    const handleDataFilter = (result, setData, originalData) => {
      if (result.length === 0) {
        setData(originalData);
      } else {
        setData(result);
      }
    };

    const youtubeResult = filterByTitle(youtubeData, debounced);
    // const youtubeSearchResult = filterByTitle(youtubeData, searching);

    if (youtubeResult.length === 0) {
      toast.error("No results found for the given search query");
    }

    handleDataFilter(youtubeResult, setFilterYoutubeData, youtubeData);
  }, [debounced]);
  useEffect(() => {
    fetchYoutube();
  }, [limit, skip]);
  return (
    <div className=" flex dark:bg-slate-800">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <Navbar
          search={search}
          setSearch={setSearch}
          setSearching={setSearching}
        />
        <div className="dark:text-white dark:bg-slate-800 flex flex-col ">
          <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
            YouTube
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2  sm:items-center sm:justify-items-center justify-items-start  w-screen  sm:w-full justify-center  gap-0">
            {filterYoutubeData.length > 0
              ? filterYoutubeData.map((data) => (
                  <News
                    video_id={data._id}
                    key={data._id}
                    title={data.title}
                    channel={data.channelTitle}
                    file_id={data.file_id}
                    publishedAt={format(
                      new Date(data.publishedAt),
                      "dd-MMMM-yyyy h:mm:a"
                    )}
                    link={data.video_link}
                    district={data.district}
                    category={data.category}
                    embed={data.embed}
                  />
                ))
              : youtubeData.map((data) => (
                  <News
                    video_id={data._id}
                    key={data._id}
                    title={data.title}
                    channel={data.channelTitle}
                    file_id={data.file_id}
                    publishedAt={format(
                      new Date(data.publishedAt),
                      "dd-MMMM-yyyy h:mm:a"
                    )}
                    link={data.video_link}
                    district={data.district}
                    category={data.category}
                    embed={data.embed}
                  />
                ))}
          </div>
          <button
            className="px-4 py-2 w-fit self-center mt-12 bg-blue-300 "
            onClick={() => setSkip(skip + limit)}
          >
            Read More
          </button>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default YoutubePage;
