import React from "react";

const Footer = () => {
  return (
    <footer className="w-full  p-[10%] bg-[rgb(79,77,77)] font-segoe">
      <div className="w-full pt-[30px] pb-[30px] pr-0 pl-0 mt-[30px] flex gap-x-[4%]">
        <div className="w-[22%] pt-5 pb-5 pr-[50px] pl-[50px] flex flex-col gap-y-[10px] text-white">
          <h3>Quick Links</h3>

          <ul className="flex flex-col gap-y-[7px] text-white list-none">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Portfolio</li>
            <li>Pricing</li>
            <li>Clients</li>
            <li>Subscription</li>
          </ul>
        </div>

        <div className="w-[22%] pt-5 pb-5 pr-[50px] pl-[50px] flex flex-col gap-y-[10px] text-white">
          <h3>Contact</h3>
          <ul className="flex flex-col gap-y-[7px] text-white list-none">
            <li>Seawoods,Sector 100,Navi Mumbai, Maharastra,India 478968</li>
            <li>+91 8974091275</li>
            <li>+91 6009989935</li>
            <li>luedu@gmail.com</li>
          </ul>
        </div>

        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7543.91504266413!2d73.0142209348877!3d19.021593400000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c20c57446235%3A0xf2065ffad82ad892!2sNexus%20Seawoods!5e0!3m2!1sen!2sin!4v1711445959588!5m2!1sen!2sin"
            width="100%"
            height="100%"
            // style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
