import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export default function AdminGoogle({ title, link, source, desc }) {
  return (
    <a
      href={link}
      className="w-[360px] h-35 bg-white p-4 text-wrap  text-black  rounded-xl flex flex-col items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 "
    >
      <h1 className="font-bold  ">{title}</h1>
      <p className="underline">{source}</p>
      <p>{desc}</p>

      <div className=" flex items-center  gap-3">
        <button className=" p-1 rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border  border-solid-[6px] transition-[3s] hover:bg-transparent hover:text-black  bg-black text-wrap text-white flex justify-center items-center">
          <AiOutlineEdit size={18} />
        </button>

        <button className="p-1 flex justify-center items-center rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] cursor-pointer border border-solid-[6px]  transition-[3s] hover:bg-transparent hover:text-black bg-black text-wrap text-white">
          <MdDelete size={18} />
        </button>
      </div>
    </a>
  );
}
