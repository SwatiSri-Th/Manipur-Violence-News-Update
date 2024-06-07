import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import AdminTimesOfIndia from "./AdminTimesOfIndia";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/Component/Footer";

const AdminTimesOfIndiaPage = () => {
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
      <AdminSidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <div>
          <h1 className="text-3xl font-extrabold text-[#6e276f]  text-center mb-8 mt-8">
            Times Of India
          </h1>
          <div className="flex  flex-wrap place-self-start w-full justify-center  gap-5">
            {tofIndia?.map((data) => (
              <AdminTimesOfIndia
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
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default AdminTimesOfIndiaPage;
