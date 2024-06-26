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

export default function AdminGoogle({
  id,
  title,
  link,
  source,
  desc,
  open,
  district,
  deleteHandler,
  category,
}) {
  return (
    <div className="w-[300px] h-35 p-4 text-wrap text-black  rounded-xl flex flex-col items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h1 className="font-bold  ">{title}</h1>
      <p className="text-black font-bold">{district ? district : ""}</p>
      <p className="text-black font-bold">{category ? category : ""}</p>
      <p className="underline">{source}</p>
      <p>
        {desc}
        <a href={link} className="text-blue-300 hover:text-blue-700">
          Read More..
        </a>
      </p>

      <div className="flex gap-16">
        <div className="w-[120px] flex gap-2">
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
}
