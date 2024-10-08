import { useNavigate } from "react-router-dom";
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

import { format } from "date-fns";

export default function AdminYoutube({
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
      onClick={() => navigate(`/admin/youtube/${video_id}`)}
      className="w-[350px] h-35 p-4 text-wrap text-black  rounded-xl flex flex-col items-center justify-between border shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 hover:opacity-60"
    >
      {embed ? (
        <iframe
          className="aspect-video w-full object-cover"
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
      <p>{format(new Date(publishedAt), "dd-MMMM-yyyy h:mm:a")}</p>
      <p>{district ? district : ""}</p>
      <p>{category ? category : ""}</p>
      <div className="w-[100px] flex justify-around">
        <WhatsappShareButton url={link}>
          <WhatsappIcon
            className="rounded-lg hover:shadow-[0_3px_10px_rgb(0,0,0,1)] "
            size={20}
          ></WhatsappIcon>
        </WhatsappShareButton>

        <FacebookShareButton url={link}>
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
  );
}
