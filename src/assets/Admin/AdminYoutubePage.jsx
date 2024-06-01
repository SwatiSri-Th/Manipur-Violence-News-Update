import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
// import News from "../../Component/News";
import AdminYoutube from "./AdminYoutube";
import { format } from "date-fns";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminYoutubePage = () => {
  const [youtubeData, setYoutubeData] = useState([]);

  const fetchYoutube = async () => {
    try {
      const res = await instance({
        url: "/",
      });
      setYoutubeData(res.data.data);
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
          <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
            YouTube
          </h1>
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
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminYoutubePage;
