import { format, parse } from "date-fns";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
export default function AdminTwitter({
  id,
  text,
  link,
  author,
  date,
  type,
  media,
  district,
  category,
  open,
  deleteHandler,
}) {
  return (
    <a
      href={link}
      className="h-fit w-[30%] bg-white p-4 text-wrap  text-black  rounded-xl flex flex-col items-start gap-4 justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 "
    >
      <h1 className="font-bold  ">{author}</h1>
      <p className="">{text}</p>
      {type === "photo" ? (
        <img
          className="aspect-video w-full object-cover"
          src={`https://drive.google.com/thumbnail?id=${media}&sz=w1000-h1000`}
        />
      ) : type === "video" ? (
        <iframe
          className="aspect-video w-full object-cover"
          src={`https://drive.google.com/file/d/${media}/preview`}
          allowFullScreen
        ></iframe>
      ) : (
        <></>
      )}
      <p className="text-black font-bold">{district ? district : ""}</p>
      <p className="text-black font-bold">{category ? category : ""}</p>

      <p>
        {format(parse(date, "EEE MMM dd HH:mm:ss xxxx yyyy", new Date()), "Pp")}
      </p>

      <div className="flex gap-52 ">
        <div className="w-[120px] flex  gap-2">
          <WhatsappShareButton url={link}>
            <WhatsappIcon
              className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] "
              size={28}
            ></WhatsappIcon>
          </WhatsappShareButton>

          <FacebookShareButton url={link}>
            <FacebookIcon
              className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
              size={28}
            ></FacebookIcon>
          </FacebookShareButton>
        </div>

        <div className=" flex justify-end gap-3">
          <button
            className=" flex justify-center p-1 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border  border-solid-[6px] transition-[3s] hover:bg-transparent hover:text-black  bg-black text-wrap text-white"
            onClick={() => open(id)}
          >
            <AiOutlineEdit size={20} />
          </button>

          <button
            className=" flex justify-center p-1 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border border-solid-[6px]  transition-[3s] hover:bg-transparent hover:text-black bg-black text-wrap text-white"
            onClick={deleteHandler}
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </a>
  );
}
