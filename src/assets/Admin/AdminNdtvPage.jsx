import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import AdminNdtv from "./AdminNdtv";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";

const AdminNdtvPage = () => {
  const [ndtv, setNdtv] = useState([]);

  const fetchNdtv = async () => {
    try {
      const res = await instance({
        url: "ndtv/data",
      });
      setNdtv(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNdtv();
  }, []);

  return (
    <div className=" flex justify-center">
      <AdminSidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-[#792d2d] text-center mb-8 mt-8">
            NDTV
          </h1>
          <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
            {ndtv?.map((data) => (
              <AdminNdtv
                key={data._id}
                title={data.title}
                description={data.desc}
                link={data.link}
                author={data.author}
                date={data.date}
                img={data.img}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default AdminNdtvPage;
