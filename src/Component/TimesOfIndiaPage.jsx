import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import TimesOfIndia from "@/Component/TimesOfIndia";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const TimesOfIndiaPage = () => {
  const [tofIndia, setTofIndia] = useState([]);

  const fetchTimesOfIndia = async () => {
    try {
      const res = await instance({
        url: "/timeOfIndia/data",
      });
      setTofIndia(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTimesOfIndia();
  }, []);

  return (
    <div className=" flex">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
            Times Of India
          </h1>
          <div className="flex  flex-wrap place-self-start w-full justify-center  gap-5">
            {tofIndia?.map((data) => (
              <TimesOfIndia
                key={data._id}
                title={data.title}
                description={data.description}
                link={data.link}
                date={data.date}
                image={data.image}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TimesOfIndiaPage;
