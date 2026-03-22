"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaShoppingCart,
} from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const socialIcons = [
    { name: "Facebook", icon: <FaFacebookF /> },
    { name: "Twitter", icon: <FaTwitter /> },
    { name: "Instagram", icon: <FaInstagram /> },
  ];

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about-us" },
    { name: "CATALOGUE", path: "/catalogue" },
    { name: "SOURCE FLOWERS", path: "/source" },
    { name: "CONTACT US", path: "/contact-us" },
  ];

  return (
    <nav className="bg-[#6BC29A] h-[80px] px-6 md:px-8 flex items-center justify-between shadow-lg relative">

      {/* LOGO */}
      <Link href="/">
        <Image
          src="/flowers/logo.png"
          alt="Logo"
          width={120}
          height={60}
          className="h-12 w-auto object-contain cursor-pointer"
        />
      </Link>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center space-x-10">

        {/* SOCIAL ICONS */}
        <div className="flex space-x-4">
          {socialIcons.map(({ name, icon }) => (
            <div
              key={name}
              className="w-10 h-10 text-white bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#6BC29A] transition-all duration-300 hover:scale-110"
            >
              {icon}
            </div>
          ))}
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center space-x-4">
          {menuItems.map(({ name, path }) => (
            <Link key={name} href={path}>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-all text-white hover:bg-white/20 ${
                  pathname === path
                    ? "relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-white after:rounded-full"
                    : ""
                }`}
              >
                {name}
              </button>
            </Link>
          ))}
        </div>

        {/* CART ICON */}
        <Link href="/cart" className="relative"> 
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10  hover:text-[#6BC29A] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95">
            <FaShoppingCart className="text-white text-lg" />
          </div>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-[10px] shadow">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* MOBILE BUTTONS - Hamburger + Cart */}
      <div className="md:hidden flex items-center space-x-3">
        {/* Hamburger */}
        <button
          className="text-white p-2"
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

        {/* Cart Icon */}
        <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="relative">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-[#6BC29A] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95">
            <FaShoppingCart className="text-white text-lg" />
          </div>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-[10px] shadow">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#6BC29A] flex flex-col px-6 py-6 space-y-4 md:hidden shadow-2xl z-50">

          {/* LINKS */}
          {menuItems.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button
                className={`px-4 py-3 rounded-xl font-semibold text-left w-full ${
                  pathname === path
                    ? "bg-white text-[#6BC29A]"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {name}
              </button>
            </Link>
          ))}

          {/* CART (MOBILE) */}
          <Link
            href="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 text-white">
              <span className="font-semibold">Cart</span>

              <div className="relative">
                <FaShoppingCart />

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* SOCIAL ICONS */}
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