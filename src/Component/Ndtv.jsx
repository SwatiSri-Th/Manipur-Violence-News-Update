import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
export default function Ndtv({
  title,
  description,
  link,
  author,
  date,
  img,
  district,
  category,
}) {
  return (
    <a
      href={link}
      className="w-screen sm:w-[100%] h-full dark:text-white border   lg:w-[100%]  p-4 sm:p-4 text-wrap text-black dark:bg-slate-800 dark:border-slate-800 rounded-xl flex flex-col items-start justify-start z-10 transition-opacity duration-300 hover:opacity-88"
    >
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
      <div className="w-full flex dark:text-white justify-start text-slate-500 flex-col ">
        <p>{author}</p>
        <p>{date}</p>

        <p className="text-black dark:text-white font-bold">
          {district ? district : ""}
        </p>
        <p className="text-black dark:text-white font-bold">
          {category ? category : ""}
        </p>
      </div>
      <p className="text-black dark:text-white mt-5 text-left">{description}</p>

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
    </a>
  );
}
