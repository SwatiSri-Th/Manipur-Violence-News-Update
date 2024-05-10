export default function TimesOfIndia({
  title,
  description,
  link,
  date,
  image,
}) {
  return (
    <a
      href={link}
      className="w-[90%] max-h-30 p-4 text-wrap text-black  rounded-xl flex flex-row items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all"
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
          src={`https://drive.google.com/thumbnail?id=${image}`}
        />
      )}

      {/* <img className="aspect-video w-full object-cover" src={image} alt="" /> */}
      <div className="m-6">
        <div className="flex flex-col ">
          <h1 className="font-bold ">{title}</h1>
          <div className="w-full flex justify-start text-slate-500 flex-col ">
            <p>{date}</p>
          </div>
        </div>
        <p className="text-black mt-5 text-left">{description}</p>
      </div>
    </a>
  );
}
