import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
// import { link } from "fs";
export default function Navbar() {
  const navigate = useNavigate();

  const Category = [
    {
      id: 1,
      name: "Protest",
      link: "/#",
    },

    {
      id: 2,
      name: "Murder",
      link: "/#",
    },

    {
      id: 3,
      name: "Violence",
      link: "/#",
    },

    {
      id: 4,
      name: "Death",
      link: "/#",
    },

    {
      id: 5,
      name: "Threaten",
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
              <span>Manipur Violence News</span>
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
          <button
            onClick={() => {
              navigate("/admin");
            }}
            className="w-[60px] h-[25px] rounded-lg cursor-pointer text-sm hover:bg-blue-900 text-center bg-blue-600 text-wrap text-white"
          >
            Admin
          </button>
        </div>
      </div>
      {/* Lower Navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Category.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-purple-600 duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
