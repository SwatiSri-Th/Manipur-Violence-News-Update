import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";

export default function TimesOfIndia({
  title,
  description,
  link,
  date,
  image,
  district,
  category,
}) {
  return (
    <a
      href={link}
      className="w-[80vw] sm:w-[90%] max-h-30 p-4 text-wrap text-black  rounded-xl flex flex-wrap sm:flex-nowrap flex-row items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all"
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
      <div className="m-6 dark:text-white">
        <div className="flex flex-col ">
          <h1 className="font-bold ">{title}</h1>
          <div className="w-full flex justify-start dark:text-white text-slate-500 flex-col ">
            <p>{date}</p>
          </div>
        </div>
        <p className="text-black mt-5 dark:text-white text-left">
          {description}
        </p>

        <p className="text-black dark:text-white font-bold">
          {district ? district : ""}
        </p>
        <p className="text-black dark:text-white font-bold">
          {category ? category : ""}
        </p>
      </div>

      <div className="w-[120px] flex  gap-2 sm:mt-[190px]">
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
    </a>
  );
}
