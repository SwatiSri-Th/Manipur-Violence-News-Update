export default function News({ title, file_id, channel, publishedAt }) {
  return (
    <div className="w-[460px] h-35 p-4 text-wrap text-black  rounded-xl flex flex-col items-center justify-between border shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 hover:opacity-60">
      <iframe
        className="aspect-video w-full object-cover"
        src={`https://drive.google.com/file/d/${file_id}/preview`}
      ></iframe>
      <h1 className="font-bold">{title}</h1>
      <p>{channel}</p>
      <p>{publishedAt}</p>
    </div>
  );
}
