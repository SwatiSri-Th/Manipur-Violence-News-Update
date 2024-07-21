import React from "react";
import { useState, useEffect } from "react";
export default function DarkMode() {
  // const [theme, setTheme] = React.useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );

  // const element = document.documentElement;
  // console.log(element);

  // return (
  // <div className="relative">
  //   <img
  //     src="/images/light-mode-button.png"
  //     alt="Light Mode Button"
  //     className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 "
  //   />
  //   <img
  //     src="/images/dark-mode-button.png"
  //     alt="Dark Mode Button"
  //     className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
  //   />
  // </div>

  // );

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h1>{darkMode ? "Dark Mode" : "Light Mode"}</h1>
      <button
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white dark:bg-yellow-500"
      >
        Toggle Theme
      </button>
    </div>
  );
}
