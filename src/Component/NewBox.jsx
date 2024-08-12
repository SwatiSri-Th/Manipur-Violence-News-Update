import { Settings } from "lucide-react";
import React, { useEffect } from "react";

import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const NewBoxData = [
  {
    id: 1,
    name: "Bishnupur",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bishnupur_in_Manipur_%28India%29.svg",
    nav: "/district/Bishnupur",
  },

  {
    id: 2,
    name: "Chandel",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chandel_in_Manipur_%28India%29.svg",
    nav: "/district/Chandel",
  },

  {
    id: 3,
    name: "Churachandpur",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxLPVboRexNBnpT6WjXitSRyJNgcPjWwKsZg&s",
    nav: "/district/Churachandpur",
  },

  {
    id: 4,
    name: "Imphal East",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Imphal_East_in_Manipur_%28India%29.svg/375px-Imphal_East_in_Manipur_%28India%29.svg.png",
    nav: "/district/Imphal East",
  },

  {
    id: 5,
    name: "Imphal West",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHYfhe7EkLitn4oWh_aJoofRYRZ33exOf82A&s",
    nav: "/district/Imphal West",
  },

  {
    id: 6,
    name: "Jiribam",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Jiribam_District_Map.png/375px-Jiribam_District_Map.png",
    nav: "/district/Jiribam",
  },

  {
    id: 7,
    name: "Kakching",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/db/Kakching_in_Manipur_%28India%29.svg",
    nav: "/district/Kakching",
  },

  {
    id: 8,
    name: "Kamjong",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kamjong_in_Manipur_%28India%29.svg/375px-Kamjong_in_Manipur_%28India%29.svg.png",
    nav: "/district/Kamjong",
  },

  {
    id: 9,
    name: "Kangpokpi",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Kangpokpi_District.png",
    nav: "/district/Kangpokpi",
  },

  {
    id: 10,
    name: "Noney",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/94/Noney_in_Manipur_%28India%29.svg",
    nav: "/district/Noney",
  },

  {
    id: 11,
    name: "Pherzawl",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Pherzawl_District.png/250px-Pherzawl_District.png",
    nav: "/district/Pherzawl",
  },

  {
    id: 12,
    name: "Senapati",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD24TA-Z0dTCLYvWlo-1XronXJPuRb9X9Wng&s",
    nav: "/district/Senapati",
  },

  {
    id: 13,
    name: "Tamenglong",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLf8rHG3iORGCYr2_ohgAuiC6QiXzSH_VtoA&s",
    nav: "/district/Tamenglong",
  },

  {
    id: 14,
    name: "Tengnoupal",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Tengnoupal_in_Manipur_%28India%29.svg",
    nav: "/district/Tengnoupal",
  },

  {
    id: 15,
    name: "Thoubal",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Thoubal_in_Manipur_%28India%29.svg/375px-Thoubal_in_Manipur_%28India%29.svg.png",
    nav: "/district/Thoubal",
  },

  {
    id: 16,
    name: "Ukhrul",
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ukhrul_in_Manipur_%28India%29.svg/250px-Ukhrul_in_Manipur_%28India%29.svg.png",
    nav: "/district/Ukhrul",
  },
];

const NewBox = () => {
  const navigate = useNavigate();

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10 bg-bl">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-purple-500"> wow news</p>
          <h1 className="text-3xl font-bold">New Box</h1>
          <p className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, vitae
            quisquam?
          </p>
        </div>

        {/* NewBox Cards */}
        <div>
          <Slider {...settings}>
            {NewBoxData.map((data, index) => (
              <div
                className="my-6 "
                key={index}
                onClick={() => navigate(data.nav)}
              >
                <div
                  key={data.id}
                  className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-yellow-200/10 relative"
                >
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className=" flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark: text-white">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ''
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default NewBox;
