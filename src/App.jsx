import { useEffect, useState } from "react";
import { format } from "date-fns";
import instance from "./Api/api_instance";
import News from "./Component/News";
import Google from "./Component/Google";
import Navbar from "./Component/Navbar";
import Ndtv from "./Component/Ndtv";
import TimesOfIndia from "./Component/TimesOfIndia";
import Sidebar from "./Component/Sidebar";
import Express from "./Component/Express";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrbitProgress } from "react-loading-indicators";
import Footer from "./Component/Footer";
import Twitter from "./Component/Twitter";
import Carousel from "./Component/Carousel";
import { toast } from "react-toastify";
import { useDebouncedValue } from "@mantine/hooks";

// import { s } from "vite/dist/node/types.d-aGj9QkWt";

export default function App() {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState("");
  const [loading, setLoading] = useState(false);
  const [youtubeData, setYoutubeData] = useState([]);
  const [filterYoutubeData, setFilterYoutubeData] = useState([]);
  const [filterGoogleData, setFilterGoogleData] = useState([]);
  const [filterNdtvData, setFilterNdtvData] = useState([]);
  const [filterTofIndiaData, setFilterTofIndiaData] = useState([]);
  const [filterTwitterData, setFilterTwitterData] = useState([]);
  const [filterExpress, setFilterExpress] = useState([]);
  const [expressData, setExpressData] = useState([]);
  const [googleData, setGoogleData] = useState([]);
  const [ndtv, setNdtv] = useState([]);
  const [tofIndia, setTofIndia] = useState([]);
  const [twitter, setTwitter] = useState([]);
  const [debounced] = useDebouncedValue(searching, 200);

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
      console.log(res.data.google);
      setExpressData(res.data.indianExpress);
      setYoutubeData(sortedData?.slice(0, 6));
      setFilterYoutubeData(sortedData?.slice(0, 6));
      setGoogleData(res.data.google?.slice(0, 6));
      setFilterGoogleData(res.data.google?.slice(0, 6));
      setNdtv(res.data.ndtv?.slice(0, 6));
      setFilterNdtvData(res.data.ndtv?.slice(0, 6));
      setTofIndia(res.data.timesOfIndia?.slice(0, 6));
      setFilterTofIndiaData(res.data.timesOfIndia?.slice(0, 6));
      setTwitter(res?.data?.twitter);
      setFilterTwitterData(res?.data?.twitter);
      setFilterExpress(res.data?.indianExpress);
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

  const filterByTitle = (data, title) => {
    return data.filter((item) =>
      item.title?.toLowerCase().includes(title?.toLowerCase())
    );
  };

  useEffect(() => {
    fetchYoutube();
  }, []);

  useEffect(() => {
    if (debounced.length === 0) {
      return;
    }
    const handleDataFilter = (result, setData, originalData) => {
      if (result.length === 0) {
        setData(originalData);
      } else {
        setData(result);
      }
    };

    const youtubeResult = filterByTitle(youtubeData, debounced);
    // const youtubeSearchResult = filterByTitle(youtubeData, searching);
    const ndtvResult = filterByTitle(ndtv, debounced);
    const tofIndiaResult = filterByTitle(tofIndia, debounced);
    const googleResult = filterByTitle(googleData, debounced);
    const twitterResult = filterByTitle(twitter, debounced);
    const expressResult = filterByTitle(filterExpress, debounced);

    console.log(youtubeResult);
    console.log(ndtvResult);

    if (
      youtubeResult.length === 0 &&
      twitterResult.length === 0 &&
      ndtvResult.length === 0 &&
      tofIndiaResult.length === 0 &&
      googleResult.length === 0 &&
      expressData.length === 0
    ) {
      toast.error("No results found for the given search query");
    }

    handleDataFilter(youtubeResult, setFilterYoutubeData, youtubeData);
    // handleDataFilter(youtubeSearchResult, setFilterYoutubeData, youtubeData);
    handleDataFilter(ndtvResult, setFilterNdtvData, ndtv);
    handleDataFilter(tofIndiaResult, setFilterTofIndiaData, tofIndia);
    handleDataFilter(googleResult, setFilterGoogleData, googleData);
    handleDataFilter(twitterResult, setFilterTwitterData, twitter);
    handleDataFilter(expressResult, setFilterExpress, filterExpress);
  }, [debounced]);

  useEffect(() => {
    if (search.length === 0) {
      return;
    }
    const handleDataFilter = (result, setData, originalData) => {
      if (result.length === 0) {
        setData(originalData);
      } else {
        setData(result);
      }
    };

    const youtubeResult = filterByCategory(youtubeData, search);
    // const youtubeSearchResult = filterByTitle(youtubeData, searching);
    const ndtvResult = filterByCategory(ndtv, search);
    const tofIndiaResult = filterByCategory(tofIndia, search);
    const googleResult = filterByCategory(googleData, search);
    const twitterResult = filterByCategory(twitter, search);
    const expressResult = filterByCategory(filterExpress, search);

    console.log(youtubeResult);
    console.log(ndtvResult);

    if (
      youtubeResult.length === 0 &&
      twitterResult.length === 0 &&
      ndtvResult.length === 0 &&
      tofIndiaResult.length === 0 &&
      googleResult.length === 0 &&
      expressResult.length === 0
    ) {
      toast.error("No results found for the given search query");
    }

    handleDataFilter(youtubeResult, setFilterYoutubeData, youtubeData);
    // handleDataFilter(youtubeSearchResult, setFilterYoutubeData, youtubeData);
    handleDataFilter(ndtvResult, setFilterNdtvData, ndtv);
    handleDataFilter(tofIndiaResult, setFilterTofIndiaData, tofIndia);
    handleDataFilter(googleResult, setFilterGoogleData, googleData);
    handleDataFilter(twitterResult, setFilterTwitterData, twitter);
    handleDataFilter(expressResult, setFilterExpress, filterExpress);
  }, [search]);

  return (
    <div className="flex dark:bg-slate-600 dark:text-white">
      <Sidebar search={search} setSearch={setSearch} />
      <div className="flex-1 w-[80%] flex flex-col items-start justify-start">
        <Navbar
          search={search}
          setSearch={setSearch}
          setSearching={setSearching}
        />
        <ScrollArea className="h-[calc(100vh)] w-[100%] dark:bg-slate-800 rounded-md">
          <main className="w-full dark:bg-slate-800">
            <Carousel />
          </main>
          <div className="mt-8 dark:bg-slate-800 ">
            <h1 className="text-3xl w-[50%] font-extrabold ml-4 dark:text-white  text-blue-900 text-left mt-8 mb-8">
              News From Youtube
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-2  justify-items-start  w-full dark:text-white sm:w-[97%] justify-center  gap-0">
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
                      embed={data.embed}
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
                      embed={data.embed}
                    />
                  ))}

              <h1 className="text-3xl col-span-1 lg:col-span-3 md:col-span-2 sm:col-span-2 justify-self-start  font-extrabold ml-8 text-blue-900 text-left dark:text-white ">
                News From NDTV
              </h1>
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
          <section className="w-full aspect-video object-cover bg-center bg-news flex  items-center ">
            <div className="w-full h-full bg-black opacity-[0.7] flex items-center">
              {
                <div className="w-full pt-[30px] pb-[30px] flex flex-col items-center">
                  <input
                    type="text"
                    className="w-[70%] h-[60px] border border-solid border-white text-[18px] indent-[20px] rounded-[10px] bg-transparent outline-none text-white "
                    placeholder="Enter Your Email"
                  />
                  <button className="p-[15px 40px] text-[20px] mt-[35px] bg-purple-400 text-white border border-solid rounded-[15px] cursor-pointer transition-[.3s] ">
                    Get to Know
                  </button>
                </div>
              }
            </div>
          </section>
          <h1 className="text-3xl w-1/2 font-extrabold ml-8 text-blue-900 dark:text-white text-left mt-8 mb-8">
            News From Times Of India
          </h1>
          <div className="flex dark:text-white mt-8 mb-8 flex-wrap place-self-start w-full justify-center sm:w-full  gap-5">
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
          </div>
          <h1 className="text-3xl w-1/2 dark:text-white font-extrabold ml-8 text-blue-900 text-left mt-8 mb-8">
            News From Google
          </h1>
          <div className="flex flex-wrap mt-8 mb-8 place-self-center w-full sm:w-full justify-center gap-4">
            {!loading && (
              <div className="grid grid-cols-1 lg:grid-cols-3  sm:items-center sm:justify-items-center justify-items-start  w-full  sm:w-full justify-center  gap-4">
                <OrbitProgress
                  variant="disc"
                  color="#32cd32"
                  size="medium"
                  text=""
                  textColor=""
                />
              </div>
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
          <h1 className="text-3xl w-1/2 dark:text-white font-extrabold ml-8 text-blue-900 text-left mt-8 mb-8">
            News From Twitter
          </h1>
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
          <h1 className="text-3xl w-1/2 font-extrabold ml-8 text-blue-900 text-left mt-8 mb-8">
            News From Indian Express
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-2  justify-items-start  w-full dark:text-white sm:w-[97%] justify-center  gap-0">
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
            {filterExpress.length > 0
              ? filterExpress.map((data) => (
                  <Express
                    //mg, link, paragraph, time, title, district, category
                    key={data._id}
                    img={data.img}
                    link={data.link}
                    time={data.time}
                    paragraph={data.paragraph}
                    district={data.district}
                    category={data.category}
                    title={data.title}
                  />
                ))
              : expressData?.map((data, index) => (
                  <Express
                    //mg, link, paragraph, time, title, district, category
                    key={data._id}
                    img={data.img}
                    link={data.link}
                    time={data.time}
                    paragraph={data.paragraph}
                    district={data.district}
                    category={data.category}
                    title={data.title}
                  />
                ))}
          </div>{" "}
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
}
