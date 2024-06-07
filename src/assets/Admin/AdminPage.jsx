import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import instance from "@/Api/api_instance";
import AdminGoogle from "./AdminGoogle";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Footer from "@/Component/Footer";
import AdminYoutube from "./AdminYoutube";
// import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminNdtv from "./AdminNdtv";
import AdminTimesOfIndia from "./AdminTimesOfIndia";

export default function AdminPage() {
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
      // const res = await instance({
      //   url: "/latest",
      // });

      const res = await instance.get("/latest");
      console.log(res.data);
      const sortedData = res?.data?.youtube?.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      // setYoutubeData(res.data.youtube?.slice(0, 6));
      setYoutubeData(sortedData?.slice(0, 6));
      setGoogleData(res.data.google?.slice(0, 6));
      setNdtv(res.data.ndtv?.slice(0, 6));
      setTofIndia(res.data.timesOfIndia?.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchYoutube();
    // fetchNdtv();
    // fetchGoogle();
    // fetchTimesOfIndia();
    // fetch(`https://flaskappmanipur.onrender.com/google`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setGoogleData(data.slice(0, 4));
    //   });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(new Date(dateString), "dd-MMMM-yyyy h:mm:a");
  };
  return (
    <div className="flex">
      <AdminSidebar />
      <div className=" w-full flex flex-col items-start justify-start">
        <AdminNavbar />
        <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md  ">
          <div>
            <h1 className="text-3xl font-extrabold text-red-600 text-center mb-8 mt-8">
              YouTube
            </h1>
            <div className="flex  flex-wrap place-self-center w-full justify-center  gap-4">
              {youtubeData?.map((data) => (
                <AdminYoutube
                  key={data._id}
                  video_id={data._id}
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
            {ndtv?.map((data) => (
              <AdminNdtv
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
            {tofIndia?.map((data) => (
              <AdminTimesOfIndia
                key={data._id}
                title={data.title}
                description={data.description}
                link={data.link}
                date={data.date}
                image={data.image}
              />
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-blue-900 text-center mt-8 mb-8">
            Google
          </h1>
          <div className="flex flex-wrap place-self-center w-full justify-center gap-4">
            {googleData?.map((data, index) => (
              <AdminGoogle
                key={index}
                title={data.title}
                link={data.link}
                source={data.source}
                desc={data.desc}
              />
            ))}
          </div>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
}
