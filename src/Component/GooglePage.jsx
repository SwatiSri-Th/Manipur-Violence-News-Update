import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import Google from "@/Component/Google";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDisclosure } from "@mantine/hooks";
import MobileNavbar from "./MobileNavbar";
import { Drawer } from "@mantine/core";

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
          <h1 className="text-3xl font-extrabold text-[hsl(220,90%,67%)] text-center mt-8 mb-8">
            Google
          </h1>
          <div className="flex flex-wrap place-self-center w-full justify-center gap-4">
            {googleData?.map((data, index) => (
              <Google
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

export default GooglePage;
