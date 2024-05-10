export default function Ndtv({ title, description, link, author, date, img }) {
  return (
    <a
      href={link}
      className="w-[460px] h-35 p-4 text-wrap text-black  rounded-xl flex flex-col items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
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
          src={`https://drive.google.com/thumbnail?id=${img}`}
        />
      )}

      {/* <img className="aspect-video w-full object-cover" src={img} alt="" /> */}
      <h1 className="font-bold">{title}</h1>
      <div className="w-full flex justify-start text-slate-500 flex-col ">
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <p className="text-black mt-5 text-left">{description}</p>
    </a>
  );
}
