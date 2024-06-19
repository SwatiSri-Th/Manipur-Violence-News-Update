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
export default function Navbar({ setSearch }) {
  const navigate = useNavigate();
  const [districts, setDistricts] = useState();
  const fetchDistrict = async () => {
    try {
      const res = await instance.get("/district");
      console.log(res.data);
      setDistricts(res.data?.data);
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
      onClick: () => setSearch("Gun Fire"),
    },
  ];

  const DropdownLinks = [
    {
      id: 1,
      name: "Trending Videos",
      link: "/#",
    },

    {
      id: 2,
      name: "Latest News",
      link: "/#",
    },

    {
      id: 3,
      name: "Top Rated",
      link: "/#",
    },
  ];

  return (
    <div className="shadow-md w-full bg-white dark:bg-indigo-900 dark:text-white duration-200 relative z-10">
      {/* Upper Navbar */}
      <div className="bg-[#e8e5e8] border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* // "bg-primary/40 py-2" */}
        <div className="container flex justify-between items-center ">
          <div>
            <a
              href="#"
              className="font-bold font-serif text-2xl sm:text-2sm flex items-center"
            >
              <div className=" w-[70px]">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-[90px] aspect-square object-cover "
                />
              </div>

              <div className=" h-[60px] flex items-center">
                <img
                  src="/images/name.png"
                  alt=""
                  className="h-[130px] w-[250px]  aspect-video object-cover "
                />
              </div>
            </a>
          </div>
          {/* search bar */}
          <div>
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
          </div>
          {/* order button */}
          {/* Darkmode Switch */}
          <div>
            <DarkMode />
          </div>
          {/* <button
            onClick={() => {
              navigate("/admin");
            }}
            className="w-[60px] h-[25px] rounded-lg cursor-pointer text-sm hover:bg-blue-900 text-center bg-blue-600 text-wrap text-white"
          >
            Admin
          </button> */}
        </div>
      </div>
      {/* Lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Category.map((data) => (
            <li key={data.id}>
              <div
                onClick={data.onClick}
                className="inline-block px-4 hover:text-purple-600 duration-200"
              >
                {data.name}
              </div>
            </li>
          ))}

          {/* Dropdown and links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending
              <span>
                <MdArrowDropDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>

            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-gray-300"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* District Dropdown */}

          <li className="group flex items-center gap-4 relative text-black cursor-pointer">
            <p>District</p>
            <Select
              className="w-36 placeholder:text-black"
              variant="unstyled"
              placeholder="All District"
              data={districts?.map((branch) => ({
                value: branch._id,
                label: branch.name,
              }))}
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
