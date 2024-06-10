import { format, parse } from "date-fns";
export default function AdminTwitterComponent({
  text,
  link,
  author,
  date,
  type,
  media,
}) {
  return (
    <a
      href={link}
      className="h-fit w-[30%] bg-white p-4 text-wrap  text-black  rounded-xl flex flex-col items-start gap-4 justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 hover:opacity-70 "
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

      <p>
        {format(parse(date, "EEE MMM dd HH:mm:ss xxxx yyyy", new Date()), "Pp")}
      </p>
    </a>
  );
}
