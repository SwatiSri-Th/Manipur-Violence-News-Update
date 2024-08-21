import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import TimesOfIndia from "@/Component/TimesOfIndia";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import MobileNavbar from "./MobileNavbar";

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
  const [opened, { open: drawopen, close: drawclose }] = useDisclosure(false);
  const [burgeropened, { toggle }] = useDisclosure();
  const handleClose = () => {
    drawclose();
    toggle();
  };
  return (
    <div className=" flex">
      <Drawer opened={opened} onClose={handleClose} title="Pages">
        {/* Drawer content */}
        <MobileNavbar />
      </Drawer>
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
        <Navbar
          drawopen={drawopen}
          burgeropened={burgeropened}
          toggle={toggle}
        />
        <div>
          <h1 className="text-3xl font-extrabold text-[#6e276f]  text-center mb-8 mt-8">
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
                district={data.district}
                category={data.category}
              />
            ))}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default TimesOfIndiaPage;
