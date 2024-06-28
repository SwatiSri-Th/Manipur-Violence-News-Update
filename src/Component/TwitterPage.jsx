import React, { useState, useEffect } from "react";
import instance from "@/Api/api_instance";
import Twitter from "@/Component/Twitter";
import Sidebar from "@/Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "./Footer";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Navbar from "./Navbar";
const TwitterPage = () => {
  const [image, setImage] = useState();
  const [twitter, setTwitter] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

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
      <Modal opened={opened} onClose={close} centered size="100vw">
        <img
          className="aspect-auto w-full object-cover"
          src={`https://drive.google.com/thumbnail?id=${image}&sz=w1000-h1000`}
        />
      </Modal>
      <ScrollArea className="h-[calc(100vh-2rem)] bg-slate-300 w-full rounded-md  ">
        <Navbar />
        <div>
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
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default TwitterPage;
