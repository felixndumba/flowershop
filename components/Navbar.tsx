"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const socialIcons = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
    },
  ];

  const menuItems = ["HOME", "ABOUT US","CATALOGUE", "SOURCE FLOWERS", "CONTACT US"];

  return (
    <nav className="bg-[#6BC29A] h-[80px] px-8 flex items-center justify-between shadow-lg relative">

      {/* Logo */}
      <div className="text-white text-xl font-light tracking-widest">
        YOURLOGO
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-10">

        {/* Social Icons */}
        <div className="flex space-x-4">
          {socialIcons.map(({ name, icon }) => (
            <div
              key={name}
              className="w-10 h-10 text-white bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#6BC29A] transition-all duration-300 hover:scale-110"
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                item === "HOME"
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#6BC29A] flex flex-col items-end px-8 py-6 space-y-4 md:hidden shadow-lg">

          {menuItems.map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-right w-full ${
                item === "HOME"
                  ? "bg-gray-900 text-white"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {item}
            </button>
          ))}

          {/* Mobile Social Icons */}
          <div className="flex space-x-4 pt-4">
            {socialIcons.map(({ name, icon }) => (
              <div
                key={name}
                className="w-10 h-10 text-white bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#6BC29A] transition-all"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;