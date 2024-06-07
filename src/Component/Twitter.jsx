export default function Twitter({ text, link, author, date, type, media }) {
  console.log(`https://drive.google.com/thumbnail?id=${media}`);
  return (
    <a
      href={link}
      className="w-[360px] h-fit bg-white p-4 text-wrap  text-black  rounded-xl flex flex-col items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 hover:opacity-50 "
    >
      <h1 className="font-bold  ">{author}</h1>
      <p className="">{text}</p>
      {type === "photo" ? (
        <img
          className="aspect-video w-full object-cover"
          src={`https://drive.google.com/thumbnail?id=${media}`}
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

      <p>{date}</p>
    </a>
  );
}
