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
import { toast } from "react-toastify";
// import { s } from "vite/dist/node/types.d-aGj9QkWt";

export default function App() {
  const [search, setSearch] = useState();
  const [searching, setSearching] = useState();
  const [loading, setLoading] = useState(false);
  const [youtubeData, setYoutubeData] = useState([]);
  const [filterYoutubeData, setFilterYoutubeData] = useState([]);
  const [filterGoogleData, setFilterGoogleData] = useState([]);
  const [filterNdtvData, setFilterNdtvData] = useState([]);
  const [filterTofIndiaData, setFilterTofIndiaData] = useState([]);
  const [filterTwitterData, setFilterTwitterData] = useState([]);
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
      setYoutubeData(sortedData?.slice(0, 9));
      setFilterYoutubeData(sortedData?.slice(0, 9));
      setGoogleData(res.data.google?.slice(0, 6));
      setFilterGoogleData(res.data.google?.slice(0, 6));
      setNdtv(res.data.ndtv?.slice(0, 9));
      setFilterNdtvData(res.data.ndtv?.slice(0, 9));
      setTofIndia(res.data.timesOfIndia?.slice(0, 6));
      setFilterTofIndiaData(res.data.timesOfIndia?.slice(0, 6));
      setTwitter(res?.data?.twitter);
      setFilterTwitterData(res?.data?.twitter);
      setLoading(true);
    } catch (error) {
      toast.error(error);
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
    const handleDataFilter = (result, setData, originalData) => {
      if (result.length === 0) {
        setData(originalData);
      } else {
        setData(result);
      }
    };

    const youtubeResult = filterByCategory(youtubeData, search);
    const ndtvResult = filterByCategory(ndtv, search);
    const tofIndiaResult = filterByCategory(tofIndia, search);
    const googleResult = filterByCategory(googleData, search);
    const twitterResult = filterByCategory(twitter, search);

    console.log(youtubeResult);
    console.log(ndtvResult);

    handleDataFilter(youtubeResult, setFilterYoutubeData, youtubeData);
    handleDataFilter(ndtvResult, setFilterNdtvData, ndtv);
    handleDataFilter(tofIndiaResult, setFilterTofIndiaData, tofIndia);
    handleDataFilter(googleResult, setFilterGoogleData, googleData);
    handleDataFilter(twitterResult, setFilterTwitterData, twitter);
  }, [search]);

  return (
    <div className="flex">
      <Sidebar search={search} setSearch={setSearch} />
      <div className=" w-full flex flex-col items-start justify-start">
        <Navbar
          search={search}
          setSearch={setSearch}
          setSearching={setSearching}
        />
        <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
          <main className="w-full">
            <Carousel />
          </main>
          <div className="mt-8">
            <div className="grid  lg:grid-cols-3 items-center justify-items-center  w-screen  sm:w-full justify-center  gap-4">
              {!loading && (
                <div className="col-span-3">
                  <OrbitProgress
                    variant="disc"
                    color="#32cd32"
                    size="medium"
                    text=""
                    textColor=""
                  />
                </div>
              )}
              {filterYoutubeData.length > 0
                ? filterYoutubeData.map((data) => (
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
                : youtubeData.map((data) => (
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
              {filterNdtvData.length > 0
                ? filterNdtvData.map((data) => (
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
                  ))
                : ndtv.map((data) => (
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
          </div>
          {/* <div className="grid  lg:grid-cols-3 items-center justify-items-center  w-screen  sm:w-full justify-center  gap-4">
            {!loading && (
              <OrbitProgress
                variant="disc"
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            )}
            {filterNdtvData.length > 0
              ? filterNdtvData.map((data) => (
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
                ))
              : ndtv.map((data) => (
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
          </div> */}

          <div className="flex mt-8 mb-8 flex-wrap place-self-start w-full justify-center  gap-5">
            {filterTofIndiaData.length > 0
              ? filterTofIndiaData.map((data) => (
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
                ))
              : tofIndia.map((data) => (
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

          <div className="flex flex-wrap mt-8 mb-8 place-self-center w-full justify-center gap-4">
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
          <div className="flex flex-wrap  place-self-center w-full gap-4 justify-center  ">
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
