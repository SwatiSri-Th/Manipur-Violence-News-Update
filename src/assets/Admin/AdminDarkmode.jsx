import React from "react";
export default function AdminDarkMode() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;
  // console.log(element);

  return (
    <div className="relative">
      <img
        src="light-mode-button.png"
        alt="Light Mode Button"
        className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 "
      />
      <img
        src="dark-mode-button.png"
        alt="Dark Mode Button"
        className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
      />
    </div>
  );
}
