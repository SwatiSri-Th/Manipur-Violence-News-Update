import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import Express from "./Express";
import Sidebar from "@/Component/Sidebar";
import Navbar from "./Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";
import { toast } from "react-toastify";

const ExpressPage = () => {
  const [express, setExpress] = useState([]);

  const fetchExpress = async () => {
    try {
      const res = await instance({
        url: "express/data",
      });
      setExpress(res.data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchExpress();
  }, []);

  return (
    <div className=" flex">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <Navbar />
        <div>
          <h1 className="text-3xl font-extrabold text-[#792d2d] text-center mb-8 mt-8">
            Indian Express
          </h1>
          <div className="grid  lg:grid-cols-3 items-center justify-items-center  w-screen  sm:w-full justify-center  gap-4">
            {express?.map((data) => (
              <Express
                key={data._id}
                img={data.img}
                link={data.link}
                time={data.time}
                paragraph={data.paragraph}
                district={data.district}
                category={data.category}
                title={data.title}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default ExpressPage;
