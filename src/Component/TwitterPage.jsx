import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import Twitter from "@/Component/Twitter";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";

const TwitterPage = () => {
  const [twitter, setTwitter] = useState([]);

  const fetchTwitter = async () => {
    try {
      const res = await instance({
        url: "twitter/search",
      });
      setTwitter(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTwitter();
  }, []);

  return (
    <div className=" flex">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-[#000] text-center mb-8 mt-8">
            Twitter
          </h1>
          <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
            {twitter?.map((data) => (
              <Twitter
                key={data._id}
                text={data.text}
                link={data.link}
                author={data.user_name}
                date={data.created_at}
                type={data.type}
                media={data.media}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default TwitterPage;
