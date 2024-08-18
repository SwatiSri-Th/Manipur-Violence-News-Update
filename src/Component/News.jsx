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
import { useNavigate } from "react-router-dom";

export default function News({
  video_id,
  title,
  file_id,
  channel,
  publishedAt,
  link,
  district,
  category,
  embed,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/youtube/${video_id}`)}
      className="w-[80vw] sm:w-[100%] h-full dark:text-white border   lg:w-[100%]  p-4 sm:p-4 text-wrap text-black dark:bg-slate-800 dark:border-slate-800 rounded-xl flex flex-col items-start  justify-start z-10 transition-opacity duration-300 hover:opacity-88"
    >
      {embed ? (
        <iframe
          className=" w-full aspect-video object-cover  "
          src={embed}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ) : (
        <iframe
          className="aspect-video w-full object-cover"
          src={`https://drive.google.com/file/d/${file_id}/preview`}
        ></iframe>
      )}
      <h1 className="font-bold">{title}</h1>
      <p>{channel}</p>
      <p>{publishedAt}</p>

      <p>{district ? district : ""}</p>
      <p>{category ? category : ""}</p>

      <div className="w-[100px] gap-2 flex justify-around">
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

        <TelegramShareButton url="link">
          <TelegramIcon
            className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)]"
            size={24}
          ></TelegramIcon>
        </TelegramShareButton>
      </div>
    </div>
  );
}
