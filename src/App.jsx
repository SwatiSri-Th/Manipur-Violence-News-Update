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
import Carousel from "./Component/Carousel";
// import { s } from "vite/dist/node/types.d-aGj9QkWt";

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [youtubeData, setYoutubeData] = useState([]);
  const [filterYoutubeData, setFilterYoutubeData] = useState([]);
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
      const sortedData = res?.data?.youtube?.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      console.log(sortedData);
      // setYoutubeData(res.data.youtube?.slice(0, 6));
      setYoutubeData(sortedData?.slice(0, 8));
      setFilterYoutubeData(sortedData?.slice(0, 8));
      setGoogleData(res.data.google?.slice(0, 6));
      setNdtv(res.data.ndtv?.slice(0, 8));
      setTofIndia(res.data.timesOfIndia?.slice(0, 6));
      setTwitter(res?.data?.twitter);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const filterByCategory = (data, category) => {
    return data.filter(
      (item) => item.category?.toLowerCase() === category?.toLowerCase()
    );
  };

  useEffect(() => {
    fetchYoutube();
  }, []);

  useEffect(() => {
    const result = filterByCategory(youtubeData, search);
    if (!result) {
      setDataResult(false);
      setFilterYoutubeData(youtubeData);
    }
    setFilterYoutubeData(result);
  }, [search]);

  return (
    <div className="flex">
      <Sidebar search={search} setSearch={setSearch} />
      <div className=" w-full flex flex-col items-start justify-start">
        <Navbar search={search} setSearch={setSearch} />
        <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
          <main className="w-full">
            <Carousel />
          </main>
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
              {filterYoutubeData.length > 0 ? (
                filterYoutubeData.map((data) => (
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
                    district={data.district}
                    category={data.category}
                  />
                ))
              ) : (
                <div className="flex flex-col">
                  {loading && (
                    <p className="text-center text-xl px-4 py-2 border border-slate-200 mb-4">
                      No data available for {search}
                    </p>
                  )}
                  <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
                    {youtubeData.map((data) => (
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
                        district={data.district}
                        category={data.category}
                      />
                    ))}
                  </div>
                </div>
              )}
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
                district={data.district}
                category={data.category}
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
                district={data.district}
                category={data.category}
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
                district={data.district}
                category={data.category}
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
