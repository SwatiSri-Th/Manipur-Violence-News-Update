import React from "react";

const Footer = () => {
  return (
    <footer className="w-full  p-[10%] bg-[rgb(79,77,77)] font-segoe mt-5">
      <div className="w-full pt-[30px] pb-[30px] pr-0 pl-0 mt-[30px] flex gap-x-[4%]">
        <div className="w-[22%] pt-5 pb-5 pr-[50px] pl-[50px] flex flex-col gap-y-[10px] text-white">
          <h3 className="underline">QUICK LINKS </h3>

          <ul className="flex flex-col gap-y-[7px] text-white list-none">
            <li>Home</li>
            <li>Youtube</li>
            <li>Ndtv</li>
            <li>Times Of India</li>
            <li>Google</li>
            <li>Clients</li>
            <li>Subscription</li>
          </ul>
        </div>

        <div className="w-[30%] pt-5 pb-5 pr-[50px] pl-[50px] flex flex-col gap-y-[10px] text-white">
          <h3 className="underline">CONTACT</h3>
          <ul className="flex flex-col gap-y-[7px] text-white list-none">
            <li>Manipur Violence News</li>
            <li>Imphal-795001 </li>
            <li>Tel:+91-6009989935</li>
            <li>manipurvnews@gmail.com</li>
          </ul>
        </div>

        <div className="border border-black ml-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d452.8393520981812!2d93.92767551447436!3d24.77096529396387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749266d41e20f53%3A0xdcc2f85fd6c40821!2sKorou%20Technologies!5e0!3m2!1sen!2sin!4v1717571617711!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
