import { useEffect, useState } from "react";
import { format } from "date-fns";
import instance from "./Api/api_instance";
import News from "./Component/News";
import Google from "./Component/Google";
import Navbar from "./Component/Navbar";
import Ndtv from "./Component/Ndtv";
import TimesOfIndia from "./Component/TimesOfIndia";
import Sidebar from "./Component/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrbitProgress } from "react-loading-indicators";
import Footer from "./Component/Footer";
import Twitter from "./Component/Twitter";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [youtubeData, setYoutubeData] = useState([]);
  const [googleData, setGoogleData] = useState([]);
  const [ndtv, setNdtv] = useState([]);
  const [tofIndia, setTofIndia] = useState([]);
  const [twitter, setTwitter] = useState([]);

  // const fetchYoutube = () => {
  //   fetch(`https://flaskappmanipur.onrender.com/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setYoutubeData(data.slice(0, 8));
  //     });
  // };

  const fetchYoutube = async () => {
    try {
      const res = await instance.get("/latest");
      console.log(res.data);
      const sortedData = res?.data?.youtube?.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      // setYoutubeData(res.data.youtube?.slice(0, 6));
      setYoutubeData(sortedData?.slice(0, 8));
      setGoogleData(res.data.google?.slice(0, 6));
      setNdtv(res.data.ndtv?.slice(0, 8));
      setTofIndia(res.data.timesOfIndia?.slice(0, 6));
      setTwitter(res?.data?.twitter);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchYoutube();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-full flex flex-col items-start justify-start">
        <Navbar />
        <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
          <div>
            <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
              YouTube
            </h1>
            <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
              {!loading && (
                <OrbitProgress
                  variant="disc"
                  color="#32cd32"
                  size="medium"
                  text=""
                  textColor=""
                />
              )}
              {youtubeData?.map((data) => (
                <News
                  video_id={data._id}
                  key={data._id}
                  title={data.title}
                  channel={data.channelTitle}
                  file_id={data.file_id}
                  publishedAt={format(
                    new Date(data.publishedAt),
                    "dd-MMMM-yyyy h:mm:a"
                  )}
                  link={data.video_link}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-[#792d2d] text-center mb-8 mt-8">
            NDTV
          </h1>
          <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
            {!loading && (
              <OrbitProgress
                variant="disc"
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            )}
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

          <h1 className="text-3xl font-extrabold text-[#6e276f] text-center mb-8 mt-8">
            Times Of India
          </h1>
          <div className="flex  flex-wrap place-self-start w-full justify-center  gap-5">
            {!loading && (
              <OrbitProgress
                variant="disc"
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            )}
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

          <h1 className="text-3xl font-extrabold text-[hsl(220,90%,67%)] text-center mt-8 mb-8">
            Google
          </h1>
          <div className="flex flex-wrap place-self-center w-full justify-center gap-4">
            {!loading && (
              <OrbitProgress
                variant="disc"
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            )}
            {googleData?.map((data, index) => (
              <Google
                key={index}
                title={data.title}
                link={data.link}
                source={data.source}
                desc={data.desc}
              />
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-[#000] text-center mb-8 mt-8">
            Twitter
          </h1>
          <div className="flex flex-wrap  place-self-center w-full gap-4 justify-center  ">
            {!loading && (
              <OrbitProgress
                variant="disc"
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            )}
            {twitter?.map((data) => (
              <Twitter
                key={data._id}
                text={data.text}
                link={data.url}
                author={data.user_name}
                date={data.created_at}
                type={data.type}
                media={data.media}
                // img={data.img}
              />
            ))}
          </div>

          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
}
