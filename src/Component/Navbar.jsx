import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="shadow-md w-full bg-white dark:bg-indigo-900 dark:text-white duration-200 relative z-10">
      {/* Upper Navbar */}
      <div className="bg-[#551252]">
        {/* // "bg-primary/40 py-2" */}
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src="logo.png" alt="Logo" className="w-[120px]" />
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
      <div></div>
    </div>
  );
}
