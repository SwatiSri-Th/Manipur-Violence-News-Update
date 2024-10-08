import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { GiNewspaper } from "react-icons/gi";
import { FaGoogle } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { ImNewspaper } from "react-icons/im";
const MobileNavbar = () => {
  const menus = [
    { name: "Home", link: "/", icon: IoMdHome },
    { name: "YouTube", link: "/youtube", icon: IoLogoYoutube },
    { name: "NDTV", link: "/ndtv", icon: PiTelevisionSimpleFill, margin: true },
    { name: "Times Of India", link: "/tofIndia", icon: GiNewspaper },
    { name: "Google", link: "/google", icon: FaGoogle, margin: true },
    { name: "Twitter", link: "/twitter", icon: RiTwitterXFill },
    { name: "Express", link: "/express", icon: ImNewspaper, margin: true },
  ];
  return (
    <div
    // className={`bg-[#e8e5e8] border shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-slate-600 dark:text-white min-h-screen ${
    //   open ? "w-72" : "w-[68px]"
    // } duration-500 text-black px-4`}
    >
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <NavLink
            to={menu?.link}
            key={i}
            onClick={menu?.onClick}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center p-2 text-sm gap-3.5 font-medium  hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
              rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              // style={{
              //   transitionDelay: `${i + 3}00ms`,
              // }}
              style={{ transitionDelay: `${i + 2}00 ms` }}
              className={`whitespace-pre duration-500`}
            >
              {menu?.name}
            </h2>

            <h2
              className={` absolute left-48 bg-black text-white text-sm font-normal whitespace-pre marker:rounded-lg  py-0 w-0 overflow-hidden group-hover:py-1 group-hover:px-4 group-hover:rounded-lg group-hover:left-14 group-hover:duration-300 group-hover:w-fit group-hover:text-sm`}
            >
              {menu?.name}
            </h2>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
