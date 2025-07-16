import React from "react";
import { Search } from "lucide-react";

function NavBar() {
  return (
    <div className="bg-white shadow-md border-b border-gray-300 h-20 flex justify-between items-center text-black px-6">
      {/* Left side:Logo*/}
      <div className="text-2xl font-bold">EaseShop</div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Nav Links */}
        <ul className="flex gap-4 items-center">
          {["Category", "Deals", "Home", "About", "Orders"].map((item) => (
            <li
              key={item}
              className="px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-black hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
