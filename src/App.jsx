import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import instance from "./Api/api_instance";
import News from "./Component/News";
import Google from "./Component/Google";
import Navbar from "./Component/Navbar";
import Ndtv from "./Component/Ndtv";
import TimesOfIndia from "./Component/TimesOfIndia";
export default function App() {
  const [youtubeData, setYoutubeData] = useState([]);
  const [googleData, setGoogleData] = useState([]);
  const [ndtv, setNdtv] = useState([]);
  const [tofIndia, setTofIndia] = useState([]);

  // const fetchYoutube = () => {
  //   fetch(`https://flaskappmanipur.onrender.com/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setYoutubeData(data.slice(0, 8));
  //     });
  // };

  const fetchYoutube = async () => {
    try {
      const res = await instance({
        url: "/",
      });
      setYoutubeData(res.data.slice(0, 12));
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchSangai = () => {
  //   fetch(`https://flaskappmanipur.onrender.com/state`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSangaiData(data.slice(0, 4));
  //     });
  // };/

  const fetchNdtv = async () => {
    try {
      const res = await instance({
        url: "ndtv/data",
      });
      setNdtv(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimesOfIndia = async () => {
    try {
      const res = await instance({
        url: "/timeOfIndia/data",
      });
      setTofIndia(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGoogle = async () => {
    try {
      const res = await instance({
        url: "/google",
      });
      setGoogleData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchYoutube();
    fetchNdtv();
    fetchGoogle();
    fetchTimesOfIndia();
    // fetch(`https://flaskappmanipur.onrender.com/google`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setGoogleData(data.slice(0, 4));
    //   });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MMMM-yyyy h:mm:a");
  };
  return (
    <div className="">
      <Navbar />
      <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
        YouTube
      </h1>
      <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
        {youtubeData?.map((data) => (
          <News
            key={data._id}
            title={data.title}
            channel={data.channelTitle}
            file_id={data.file_id}
            publishedAt={formatDate(data.publishedAt)}
          />
        ))}
      </div>

      <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
        NDTV
      </h1>
      <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
        {ndtv?.map((data) => (
          <Ndtv
            key={data._id}
            title={data.title}
            description={data.desc}
            link={data.link}
            author={data.author}
            date={data.date}
            img={data.img}
          />
        ))}
      </div>

      <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
        Times Of India
      </h1>
      <div className="flex  flex-wrap place-self-start w-full justify-center  gap-5">
        {tofIndia?.map((data) => (
          <TimesOfIndia
            key={data._id}
            title={data.title}
            description={data.description}
            link={data.link}
            date={data.date}
            image={data.image}
          />
        ))}
      </div>

      <h1 className="text-3xl font-extrabold text-red-600 text-center mt-8 mb-8">
        Google
      </h1>
      <div className="flex flex-wrap place-self-center w-full justify-center gap-4">
        {googleData?.map((data, index) => (
          <Google key={index} title={data.title} link={data.link} />
        ))}
      </div>
    </div>
  );
}
