import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import Twitter from "@/Component/Twitter";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Modal } from "@mantine/core";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
const TwitterPage = () => {
  const [image, setImage] = useState();
  const [twitter, setTwitter] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchTwitter = async () => {
    try {
      const res = await instance({
        url: `twitter/search?limit=${limit}&skip=${skip}`,
      });
      if (skip == 0) setTwitter(res.data.data);
      else {
        setTwitter((prevItems) => [...prevItems, ...res.data.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTwitter();
  }, [skip, limit]);
  const [navbaropened, { open: drawopen, close: drawclose }] =
    useDisclosure(false);
  const [burgeropened, { toggle }] = useDisclosure();
  const handleClose = () => {
    drawclose();
    toggle();
  };
  return (
    <div className=" flex">
      <Sidebar />
      <Modal opened={opened} onClose={close} centered size="100vw">
        <img
          className="aspect-auto w-full object-cover"
          src={`https://drive.google.com/thumbnail?id=${image}&sz=w1000-h1000`}
        />
      </Modal>
      <Drawer opened={navbaropened} onClose={handleClose} title="Pages">
        {/* Drawer content */}
        <MobileNavbar />
      </Drawer>
      <ScrollArea className="h-[calc(100vh-2rem)] bg-slate-300 w-full rounded-md  ">
        <Navbar
          drawopen={drawopen}
          burgeropened={burgeropened}
          toggle={toggle}
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl bg-slate-300 font-extrabold text-[#000] text-center mb-8 mt-8">
            Twitter
          </h1>
          <div className="flex flex-col w-screen items-center bg-slate-300  justify-center  gap-4">
            {twitter?.map((data) => (
              <Twitter
                key={data._id}
                text={data.text}
                link={data.url}
                author={data.user_name}
                date={data.created_at}
                type={data.type}
                media={data.media}
                image={image}
                district={data.district}
                category={data.category}
                setImage={setImage}
                open={open}
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

export default TwitterPage;
