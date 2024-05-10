import { IoMdSearch } from "react-icons/io";
import DarkMode from "./DarkMode";
export default function Navbar() {
  return (
    <div className="shadow-md bg-white dark:bg-indigo-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
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
        </div>
      </div>
      {/* Lower Navbar */}
      <div></div>
    </div>
  );
}
