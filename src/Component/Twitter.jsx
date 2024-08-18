import { format, parse } from "date-fns";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
export default function Twitter({
  text,
  link,
  author,
  date,
  type,
  media,
  open,
  district,
  category,
  setImage,
}) {
  const modalHandler = (media) => {
    setImage(media);
    open();
  };
  return (
    <div className="h-full w-full sm:w-[700px] lg:w-[700px] bg-white p-4 text-wrap  text-black  rounded-xl flex flex-col items-start gap-4 justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 hover:opacity-70 ">
      <h1 className="font-bold  ">{author}</h1>
      <p className="">{text}</p>
      {type === "photo" ? (
        <img
          className="aspect-video w-full object-cover"
          src={`https://drive.google.com/thumbnail?id=${media}&sz=w1000-h1000`}
          onClick={() => modalHandler(media)}
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
        {format(
          parse(date, "EEE MMM dd HH:mm:ss xxxx yyyy", new Date()),
          "PPP"
        )}
      </p>
      <a href={link} className="text-blue-400 hover:text-blue-600">
        Read more about this tweets..
      </a>

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
    </div>
  );
}
