import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import AdminGoogle from "./AdminGoogle";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";

const AdminGooglePage = () => {
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
      <AdminSidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-[hsl(220,90%,67%)] text-center mt-8 mb-8">
            Google
          </h1>
          <div className="flex flex-wrap place-self-center w-full justify-center gap-4">
            {googleData?.map((data, index) => (
              <AdminGoogle
                key={index}
                title={data.title}
                link={data.link}
                source={data.source}
                desc={data.desc}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default AdminGooglePage;
