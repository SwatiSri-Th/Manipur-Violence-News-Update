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

export default function AdminTimesOfIndia({
  title,
  description,
  link,
  date,
  image,
}) {
  return (
    <a
      href={link}
      className="w-[90%] max-h-30 p-4 text-wrap text-black  rounded-xl flex flex-row  items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all"
    >
      {image == null ? (
        <img
          className="aspect-video w-full object-cover"
          src="https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
          alt=""
        />
      ) : (
        <img
          className="aspect-video w-[300px] object-cover"
          src={`https://drive.google.com/thumbnail?id=${image}&sz=w1000-h1000`}
        />
      )}

      {/* <img className="aspect-video w-full object-cover" src={image} alt="" /> */}
      <div className="m-6">
        <div className="flex flex-col ">
          <h1 className="font-bold ">{title}</h1>
          <div className="w-full flex justify-start text-slate-500 flex-col ">
            <p>{date}</p>
          </div>
        </div>
        <p className="text-black mt-5 text-left">{description}</p>
      </div>

      <div className="flex gap-4 mt-[190px]">
        <div className="w-[120px] flex  gap-2">
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
        </div>

        <div className=" flex justify-end gap-3">
          <button className=" flex justify-center p-1 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border  border-solid-[6px] transition-[3s] hover:bg-transparent hover:text-black  bg-black text-wrap text-white">
            <AiOutlineEdit size={18} />
          </button>

          <button className=" flex justify-center p-1 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border border-solid-[6px]  transition-[3s] hover:bg-transparent hover:text-black bg-black text-wrap text-white">
            <MdDelete size={18} />
          </button>
        </div>
      </div>
    </a>
  );
}
