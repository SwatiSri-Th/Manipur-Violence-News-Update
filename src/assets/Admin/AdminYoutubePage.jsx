import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
// import News from "../../Component/News";
import AdminYoutube from "./AdminYoutube";
import { format } from "date-fns";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";
import { toast } from "react-toastify";

const AdminYoutubePage = () => {
  const [youtubeData, setYoutubeData] = useState([]);

  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(10);

  const fetchNewData = async () => {
    try {
      const id = toast.loading("Please wait...");
      const response = await instance.get("/youtube");
      if (response.status === 201) {
        toast.update(id, {
          render: "Data is fetch",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      const sortedData = response?.data?.data
        ?.map((item) => ({
          ...item,
          publishedAt: new Date(item?.publishedAt),
        }))
        .sort((a, b) => b.publishedAt - a.publishedAt);

      setYoutubeData((prev) => [...prev, ...sortedData]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchYoutube = async () => {
    try {
      const res = await instance({
        // url: "/",
        url: `/?limit=${limit}&skip=${skip}`,
      });
      const sortedData = res.data.data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      console.log(sortedData);
      if (skip === 0) {
        setYoutubeData(sortedData);
      } else {
        setYoutubeData((prevItems) => [...prevItems, ...sortedData]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchYoutube();
  }, [limit, skip]);
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
              className="w-[170px] h-[40px] bg-blue-900 text-wrap rounded-xl hover:bg-blue-700 text-white"
            >
              Fetch New Data
            </button>
          </div>
          <div className="flex  flex-wrap place-self-center w-full justify-center items-center  gap-4">
            {youtubeData?.map((data) => (
              <AdminYoutube
                key={data?._id}
                video_id={data?._id}
                title={data?.title}
                channel={data?.channelTitle}
                file_id={data?.file_id}
                embed={data?.embed}
                publishedAt={data?.publishedAt}
                link={data?.video_link}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            className="px-4 py-2 w-fil self-center mt-12 bg-blue-300 "
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

export default AdminYoutubePage;
