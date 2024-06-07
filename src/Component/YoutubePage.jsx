import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import News from "./News";
import { format } from "date-fns";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";

const YoutubePage = () => {
  const [youtubeData, setYoutubeData] = useState([]);

  const fetchYoutube = async () => {
    try {
      const res = await instance({
        url: "/",
      });
      const sortedData = res.data.data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      setYoutubeData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchYoutube();
  }, []);
  return (
    <div className=" flex">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
            YouTube
          </h1>
          <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
            {youtubeData?.map((data) => (
              <News
                key={data._id}
                video_id={data._id}
                title={data.title}
                channel={data.channelTitle}
                file_id={data.file_id}
                publishedAt={format(
                  new Date(data.publishedAt),
                  "dd-MMMM-yyyy h:mm:a"
                )}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default YoutubePage;
