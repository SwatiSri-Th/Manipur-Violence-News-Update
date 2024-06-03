import React from "react";
export default function DarkMode() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;
  // console.log(element);

  return (
    <div className="relative">
      <img
        src="/images/light-mode-button.png"
        alt="Light Mode Button"
        className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 "
      />
      <img
        src="/images/dark-mode-button.png"
        alt="Dark Mode Button"
        className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
      />
    </div>
  );
}
