import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import Ndtv from "@/Component/Ndtv";
import Sidebar from "@/Component/Sidebar";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";

const NdtvPage = () => {
  const [ndtv, setNdtv] = useState([]);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);

  const fetchNdtv = async () => {
    try {
      console.log(limit);
      console.log(skip);
      const res = await instance({
        url: `ndtv/data?limit=${limit}&skip=${skip}`,
      });
      // setNdtv(res.data.data);
      if (skip === 0) {
        setNdtv(res.data.data);
        // setFilterYoutubeData(sortedData);
      } else {
        setNdtv((prevItems) => [...prevItems, ...res.data.data]);
        console.log(ndtv);
        // setFilterYoutubeData((prevItems) => [...prevItems, ...sortedData]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchNdtv();
  }, [skip, limit]);

  return (
    <div className=" flex">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-[#792d2d] text-center mb-8 mt-8">
            NDTV
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2  sm:items-center sm:justify-items-center justify-items-start  w-screen  sm:w-[97%] justify-center  gap-0">
            {ndtv?.map((data) => (
              <Ndtv
                key={data._id}
                title={data.title}
                description={data.desc}
                link={data.link}
                author={data.author}
                date={data.date}
                img={data.img}
                district={data.district}
                category={data.category}
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

export default NdtvPage;
