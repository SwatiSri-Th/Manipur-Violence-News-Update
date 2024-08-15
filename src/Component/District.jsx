// import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import instance from "@/Api/api_instance";
import { OrbitProgress } from "react-loading-indicators";
import News from "./News";
import Ndtv from "./Ndtv";
import TimesOfIndia from "./TimesOfIndia";
import Google from "./Google";
import Twitter from "./Twitter";
import Express from "./Express";
import { format } from "date-fns";

const District = () => {
  const { id } = useParams();
  const [search, setSearch] = useState();
  const [youtubeData, setYoutubeData] = useState([]);
  const [filterExpress, setFilterExpress] = useState([]);
  const [expressData, setExpressData] = useState([]);
  const [googleData, setGoogleData] = useState([]);
  const [ndtv, setNdtv] = useState([]);
  const [tofIndia, setTofIndia] = useState([]);
  const [twitter, setTwitter] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (id) => {
    try {
      const res = await instance.get(`/district/data/${id}`);
      // const res = await instance.get("/latest");
      console.log(res.data);
      setExpressData(res.data.indianExpress);
      setYoutubeData(res.data.youtube?.slice(0, 6));
      setGoogleData(res.data.google?.slice(0, 6));
      setNdtv(res.data.ndtv?.slice(0, 6));
      setTofIndia(res.data.timesOfIndia?.slice(0, 6));
      setTwitter(res?.data?.twitter);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const [searching, setSearching] = useState("");
  return (
    <div className=" flex dark:bg-slate-800">
      <Sidebar />
      <ScrollArea className="h-[calc(100vh-2rem)] w-full pl-2 rounded-md  ">
        <Navbar
          search={search}
          setSearch={setSearch}
          setSearching={setSearching}
        />

        <h1 className="font-sans text-xl font-bold pl-8 pt-8 ">
          Search : <span className="font-semibold text-gray-800">{id}</span>{" "}
        </h1>
        {youtubeData.length === 0 &&
          twitter.length === 0 &&
          ndtv.length === 0 &&
          tofIndia.length === 0 &&
          googleData.length === 0 && (
            <h1
              className={`text-red-500 text-center text-2xl font-bold ${
                loading ? "hidden" : "block"
              } animate-pulse pb-10 mt-32`}
            >
              Data not available
            </h1>
          )}
        <div className="mt-8 dark:bg-slate-800 ">
          {youtubeData.length > 0 && (
            <h1
              data-aos="fade-up"
              className="text-3xl w-[50%] font-extrabold ml-4 dark:text-white  text-blue-900 text-left mt-8 mb-8"
            >
              News From Youtube
            </h1>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2  sm:items-center sm:justify-items-center  justify-items-start  w-screen  sm:w-[94%] justify-center  gap-0">
            {loading && (
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
                embed={data.embed}
              />
            ))}

            {ndtv.length > 0 && (
              <h1 className="text-3xl col-span-1 lg:col-span-3 md:col-span-2 sm:col-span-2 justify-self-start  font-extrabold ml-8 text-blue-900 text-left dark:text-white ">
                News From NDTV
              </h1>
            )}
            {/* {loading && (
              <div className="col-span-3">
                <OrbitProgress
                  variant="disc"
                  color="#32cd32"
                  size="medium"
                  text=""
                  textColor=""
                />
              </div>
            )} */}
            {ndtv.map((data) => (
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
            <div className=" w-full col-span-1 sm:col-span-2 lg:col-span-3">
              {tofIndia.length > 0 && (
                <h1 className="text-3xl w-full font-extrabold ml-8 text-blue-900 dark:text-white text-left mt-8 mb-8">
                  News From Times Of India
                </h1>
              )}
              <div className="flex dark:text-white mt-8 mb-8 flex-wrap place-self-center w-full justify-center  sm:w-full gap-5">
                {/* {loading && (
                  <div className="col-span-3">
                    <OrbitProgress
                      variant="disc"
                      color="#32cd32"
                      size="medium"
                      text=""
                      textColor=""
                    />
                  </div>
                )} */}
                {tofIndia.map((data) => (
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
            </div>
          </div>
          {googleData.length > 0 && (
            <h1 className="text-3xl w-1/2 dark:text-white font-extrabold ml-8 text-blue-900 text-left mt-8 mb-8">
              News From Google
            </h1>
          )}
          <div className="flex flex-wrap mt-8 mb-8 place-self-center w-full sm:w-full justify-center gap-4">
            {/* {loading && (
              <div className="grid grid-cols-1 lg:grid-cols-3  sm:items-center sm:justify-items-center justify-items-start  w-full  sm:w-full justify-center  gap-4">
                <OrbitProgress
                  variant="disc"
                  color="#32cd32"
                  size="medium"
                  text=""
                  textColor=""
                />
              </div>
            )} */}
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
          {twitter.length > 0 && (
            <h1 className="text-3xl w-1/2 dark:text-white font-extrabold ml-8 text-blue-900 text-left mt-8 mb-8">
              News From Twitter
            </h1>
          )}
          {/* {loading && (
            <div className="col-span-3">
              <OrbitProgress
                variant="disc"
                color="#32cd32"
                size="medium"
                text=""
                textColor=""
              />
            </div>
          )} */}
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
          {expressData.length > 0 && (
            <h1 className="text-3xl w-1/2 font-extrabold ml-8 text-blue-900 text-left mt-8 mb-8">
              News From Indian Express
            </h1>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-2  justify-items-start  w-full dark:text-white sm:w-[97%] justify-center  gap-0">
            {/* {loading && (
              <div className="col-span-3">
                <OrbitProgress
                  variant="disc"
                  color="#32cd32"
                  size="medium"
                  text=""
                  textColor=""
                />
              </div>
            )} */}
            {expressData?.map((data, index) => (
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
          </div>
        </div>
        {/* <NewBox /> */}
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default District;
