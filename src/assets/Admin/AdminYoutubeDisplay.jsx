import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "@/Api/api_instance";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const AdminYoutubeDisplay = () => {
  const [displayData, setDisplayData] = useState();
  const { id } = useParams();

  const fetchDataById = async (id) => {
    try {
      const res = await instance.get(`/youtube/${id}`);
      console.log(res.data);
      setDisplayData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataById(id);
  }, []);

  return (
    <>
      {displayData ? (
        <div className="flex p-6 items-center gap-4 ">
          <div
            onClick={() => navigate(`/youtube/${video_id}`)}
            className="w-[800px] p-4 text-wrap text-black  rounded-xl flex flex-col items-center justify-between border shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 "
          >
            <iframe
              className="aspect-video w-full object-cover"
              src={`https://drive.google.com/file/d/${displayData.file_id}/preview`}
              allowFullScreen
            ></iframe>
            <h1 className="font-bold">{displayData.title}</h1>

            <p>{displayData.channel}</p>
            <p>{displayData.publishedAt}</p>
            <div className="w-[100px] flex justify-around">
              <WhatsappShareButton url={displayData.link}>
                <WhatsappIcon
                  className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] "
                  size={20}
                ></WhatsappIcon>
              </WhatsappShareButton>

              <FacebookShareButton url={displayData.link}>
                <FacebookIcon
                  className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
                  size={20}
                ></FacebookIcon>
              </FacebookShareButton>

              <TwitterShareButton url="link">
                <XIcon
                  className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
                  size={20}
                ></XIcon>
              </TwitterShareButton>

              <TelegramShareButton url="link">
                <TelegramIcon
                  className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
                  size={20}
                ></TelegramIcon>
              </TelegramShareButton>
            </div>
          </div>
          <div>
            <div className=" flex justify-end gap-5">
              <button className="w-[100px] rounded-lg cursor-pointer border  border-solid-[6px] transition-[3s] hover:bg-transparent hover:text-black  bg-black text-wrap text-white">
                Edit
              </button>

              <button className="w-[100px] rounded-lg cursor-pointer border border-solid-[6px]  transition-[3s] hover:bg-transparent hover:text-black bg-black text-wrap text-white">
                Delete
              </button>
            </div>
            <div className="w-[500px] h-[400px] p-4 rounded-lg mt-4 overflow-y-scroll border shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
              <p>{displayData.description}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminYoutubeDisplay;