import React from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-blue-900 h-60 flex justify-around items-center p-30">
      <div>
        <h1 className="text-4xl font-bold">EaseShop</h1>
      </div>
      <div className="flex justify-center items-start">
        <ul className="flex flex-col gap-3 ">
          <li className="text-lg cursor-pointer hover:text-gray-300 ">
            Contact Us
          </li>
          <li className="text-lg cursor-pointer hover:text-gray-300 ">
            Socials
          </li>

          {/* Social Icons */}
          <li className="flex items-center gap-3 hover:text-pink-400 transition-all duration-300 cursor-pointer">
            <FaInstagram />
            <span>Instagram</span>
          </li>
          <li className="flex items-center gap-3 hover:text-red-500 transition-all duration-300 cursor-pointer">
            <FaYoutube />
            <span>YouTube</span>
          </li>
          <li className="flex items-center gap-3 hover:text-blue-400 transition-all duration-300 cursor-pointer">
            <FaTwitter />
            <span>Twitter</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
