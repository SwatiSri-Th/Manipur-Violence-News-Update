import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { GiNewspaper } from "react-icons/gi";
import { FaGoogle } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { MdPeople } from "react-icons/md";

export default function AdminSidebar() {
  const history = useNavigate();
  const role = window.localStorage.getItem("role");
  const menus = [
    { name: "Home", link: "/admin/dashboard", icon: IoMdHome },
    { name: "YouTube", link: "/admin/youtube", icon: IoLogoYoutube },
    {
      name: "NDTV",
      link: "/admin/ndtv",
      icon: PiTelevisionSimpleFill,
      margin: true,
    },
    { name: "Times Of India", link: "/admin/tofIndia", icon: GiNewspaper },
    { name: "Google", link: "/admin/google", icon: FaGoogle, margin: true },
    { name: "Twitter", link: "/admin/twitter", icon: RiTwitterXFill },
    {
      name: "Category",
      link: "/admin/category",
      icon: BiCategoryAlt,
      margin: true,
    },

    ...(role === "admin"
      ? [
          {
            name: "Moderator",
            link: "/admin/moderator",
            icon: MdPeople,
          },
          { name: "Register", link: "/admin/register", icon: IoPersonAddSharp },
        ]
      : []),
    {
      name: "Logout",
      icon: IoLogOutSharp,
      onClick: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    window.localStorage.clear();
    history("/admin");
  };

  const [open, setOpen] = useState(false);
  return (
    <section
      className={` flex gap-6 z-20  ${open ? "w-60" : "w-16"} duration-500`}
    >
      <div
        className={`bg-[#e8e5e8] border shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-screen ${
          open ? "w-72" : "w-[70px]"
        } duration-500 text-black px-4`}
      >
        <div className="py-3  flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
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
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>

              <h2
                className={` ${
                  open && "hidden"
                } absolute left-48 bg-black text-white text-sm font-normal whitespace-pre marker:rounded-lg  py-0 w-0 overflow-hidden group-hover:py-1 group-hover:px-4 group-hover:rounded-lg group-hover:left-14 group-hover:duration-300 group-hover:w-fit group-hover:text-sm`}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>

      {/* <div className="m-3 text-xl text-gray-900 font-semibold">Side Bar</div> */}
    </section>
  );
}
