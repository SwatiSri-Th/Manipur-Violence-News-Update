import React from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const AdminExpress = ({
  id,
  img,
  link,
  paragraph,
  time,
  title,
  district,
  category,
  deleteHandler,
  open,
}) => {
  return (
    <div className="w-[350px] h-[550px] p-4 text-wrap text-black  rounded-xl flex flex-col items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {img == null ? (
        <img
          className="aspect-video w-full object-cover"
          src="https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
          alt=""
        />
      ) : (
        <img
          className="aspect-video w-full object-cover"
          src={`https://drive.google.com/thumbnail?id=${img}&sz=w1000-h1000`}
        />
      )}

      {/* <img className="aspect-video w-full object-cover" src={img} alt="" /> */}
      <h1 className="font-bold">{title}</h1>
      <div className="w-full flex justify-start text-slate-500 flex-col ">
        <p>{time}</p>

        <p className="text-black font-bold">{district ? district : ""}</p>
        <p className="text-black font-bold">{category ? category : ""}</p>
      </div>
      <p className="text-black mt-5 text-left">
        {paragraph}...
        <a href={link} className="text-blue-600 hover:text-blue-300">
          Read more
        </a>
      </p>
      <div className="flex justify-between">
        <div className="w-[120px] flex justify-center gap-2">
          <WhatsappShareButton url={link}>
            <WhatsappIcon
              className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] "
              size={24}
            ></WhatsappIcon>
          </WhatsappShareButton>

          <FacebookShareButton url={link}>
            <FacebookIcon
              className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
              size={24}
            ></FacebookIcon>
          </FacebookShareButton>

          <TwitterShareButton url="link">
            <XIcon
              className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
              size={24}
            ></XIcon>
          </TwitterShareButton>

          {/* <TelegramShareButton url="link">
              <TelegramIcon
              className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
              size={20}
              ></TelegramIcon>
              </TelegramShareButton>
              
              <LinkedinShareButton url="link">
              <LinkedinIcon
              className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
              size={20}
              ></LinkedinIcon>
              </LinkedinShareButton> */}
        </div>
        <div className=" flex justify-end gap-3">
          <button
            className=" flex justify-center p-1 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border  border-solid-[6px] transition-[3s] hover:bg-transparent hover:text-black  bg-black text-wrap text-white"
            onClick={() => open(id)}
          >
            <AiOutlineEdit size={18} />
          </button>

          <button
            className=" flex justify-center p-1 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border border-solid-[6px]  transition-[3s] hover:bg-transparent hover:text-black bg-black text-wrap text-white"
            onClick={() => deleteHandler(id)}
          >
            <MdDelete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminExpress;
