import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import instance from "@/Api/api_instance";
import Sidebar from "./Sidebar";
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

const YoutubeDisplay = () => {
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
    <div className="flex">
      <Sidebar />
      {displayData ? (
        <div className="flex w-full p-6 items-center gap-4 ">
          <div
            onClick={() => navigate(`/youtube/${video_id}`)}
            className="w-[60vw] p-4 text-wrap text-black  rounded-xl flex flex-col items-start justify-between border shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 "
          >
            <iframe
              className="aspect-video w-full object-cover"
              src={`https://drive.google.com/file/d/${displayData.file_id}/preview`}
              allowFullScreen
            ></iframe>
            <h1 className="font-bold">{displayData.title}</h1>

            <p>{displayData.channel}</p>
            <p>{format(displayData.publishedAt, "PPPP")}</p>

            <div>
              District :
              {displayData.district ? displayData.district : "Not set"}
            </div>
            <div>
              Category :
              {displayData.category ? displayData.category : "Not set"}
            </div>
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
          <div className="w-[320px] h-[600px] p-4 rounded-lg overflow-y-scroll border shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
            <p>{displayData.description}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default YoutubeDisplay;
