import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import { MdArrowDropDown } from "react-icons/md";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import instance from "@/Api/api_instance";

// import { data } from "autoprefixer";
// import { link } from "fs";
// import { link } from "fs";
export default function Navbar({ setSearch, setSearching }) {
  const [districts, setDistricts] = useState();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  const navigate = useNavigate();

  const fetchDistrict = async () => {
    try {
      const res = await instance.get("/district");
      console.log(res.data);
      setDistricts(res.data?.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const Category = [
    {
      id: 1,
      name: "Protest",
      // link: "/#",
      onClick: () => setSearch("Protest"),
    },

    {
      id: 2,
      name: "Murder",
      link: "/#",
      onClick: () => setSearch("Murder"),
    },

    {
      id: 3,
      name: "Elections",
      onClick: () => setSearch("Elections"),
    },

    {
      id: 4,
      name: "Accident",
      onClick: () => setSearch("Accident"),
    },

    {
      id: 5,
      name: "Gun Fire",
      onClick: () => setSearch("gun firing"),
    },

    // {
    //   id: 6,
    //   name: "Curfew",
    //   onClick: () => setSearch("Curfew"),
    // },
  ];

  // const DropdownLinks = [
  //   {
  //     id: 1,
  //     name: "Trending Videos",
  //     link: "/#",
  //   },

  //   {
  //     id: 2,
  //     name: "Latest News",
  //     link: "/#",
  //   },

  //   {
  //     id: 3,
  //     name: "Top Rated",
  //     link: "/#",
  //   },
  // ];

  return (
    <div className="shadow-md w-[100%] dark:bg-slate-800  bg-white dark:text-white duration-200 relative lg:block z-80">
      {/* Upper Navbar */}
      <div className="bg-[#e8e5e8] dark:bg-slate-600 border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* // "bg-primary/40 py-2" */}
        <div className=" flex justify-between items-center ">
          <div>
            <a
              href="#"
              className="font-bold font-serif text-2xl sm:text-2sm flex items-center"
            >
              <div className=" pl-[10px] w-[70px]">
                {darkMode ? (
                  <img
                    src="/images/darklogo.png"
                    alt="Logo"
                    className="w-[90px] aspect-square object-cover "
                  />
                ) : (
                  <img
                    src="/images/mlogo.png"
                    alt="Logo"
                    className="w-[90px] aspect-square object-cover "
                  />
                )}
              </div>

              <div className=" h-[60px] flex items-center">
                {darkMode ? (
                  <img
                    src="/images/night.png"
                    alt=""
                    className="h-[130px] w-[250px]  aspect-video object-cover "
                  />
                ) : (
                  <img
                    src="/images/name.png"
                    alt=""
                    className="h-[130px] w-[250px]  aspect-video object-cover "
                  />
                )}
              </div>
            </a>
          </div>
          {/* search bar */}
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="search"
              onChange={(e) => setSearching(e.target.value)}
              className="w-[200px] dark:text-black sm:[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-yellow-200"
            />
            <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
          </div>

          {/* order button */}
          {/* Darkmode Switch */}
          <div>
            <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </div>
      {/* Lower Navbar */}
      <div className=" flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Category.map((data) => (
            <li key={data.id}>
              <div
                onClick={data.onClick}
                className="inline-block px-4 hover:text-purple-600 cursor-pointer duration-200"
              >
                {data.name}
              </div>
            </li>
          ))}
          <li className=" flex items-center gap-4 relative text-black cursor-pointer">
            <p className="dark:text-white">District</p>
            <Select
              className="w-36 placeholder:text-black"
              variant="unstyled"
              placeholder="All District"
              data={districts?.map((branch) => ({
                value: branch._id,
                label: branch.name,
              }))}
              onChange={(_value, option) =>
                navigate(`/district/${option.label}`)
              }
              defaultValue="React"
              clearable
              allowDeselect
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
