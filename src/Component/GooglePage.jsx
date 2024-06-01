import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import Google from "@/Component/Google";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const GooglePage = () => {
  const [googleData, setGoogleData] = useState([]);

  const fetchGoogle = async () => {
    try {
      const res = await instance({
        url: "/google",
      });
      setGoogleData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGoogle();
  }, []);

  return (
    <div className=" flex">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600 text-center mt-8 mb-8">
            Google
          </h1>
          <div className="flex flex-wrap place-self-center w-full justify-center gap-4">
            {googleData?.map((data, index) => (
              <Google key={index} title={data.title} link={data.link} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GooglePage;
