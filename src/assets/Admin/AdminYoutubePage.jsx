import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
// import News from "../../Component/News";
import AdminYoutube from "./AdminYoutube";
import { format } from "date-fns";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminYoutubePage = () => {
  const [youtubeData, setYoutubeData] = useState([]);

  const fetchNewData = async () => {
    try {
      const response = await instance.get("/youtube");
      setYoutubeData(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchYoutube = async () => {
    try {
      const res = await instance({
        url: "/",
      });
      console.log(res.data.data);
      const sortedData = res.data.data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      setYoutubeData(sortedData);
      // setYoutubeData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchYoutube();
  }, []);
  return (
    <div className=" flex">
      <AdminSidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <div className="flex w-full items-center justify-center gap-8 ">
            <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
              YouTube
            </h1>
            <button
              onClick={fetchNewData}
              className="w-[200px] h-[60px] bg-blue-900 text-wrap text-white"
            >
              {" "}
              Fetch New Data
            </button>
          </div>
          <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
            {youtubeData?.map((data) => (
              <AdminYoutube
                key={data._id}
                title={data.title}
                channel={data.channelTitle}
                file_id={data.file_id}
                publishedAt={format(
                  new Date(data.publishedAt),
                  "dd-MMMM-yyyy h:mm:a"
                )}
                link={data.video_link}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminYoutubePage;
