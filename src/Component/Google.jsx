export default function Google({ title, link, source, desc }) {
  return (
    <a
      href={link}
      className="w-[80vw] sm:w-[485px] h-[200px] p-4 sm:p-4 text-wrap text-black  rounded-xl flex flex-col items-center justify-between border shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-opacity duration-300 hover:opacity-60 "
    >
      <h1 className="font-bold  ">{title}</h1>
      <p className="underline">{source}</p>
      <p>{desc}</p>
    </a>
  );
}
