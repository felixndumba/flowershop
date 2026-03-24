// components/Footer.tsx
"use client";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const socialIcons = [
    { name: "Facebook", icon: <FaFacebookF /> },
    { name: "Twitter", icon: <FaTwitter /> },
    { name: "Instagram", icon: <FaInstagram /> },
  ];

  const links = ["Home", "About Us", "Catalogue", "Source Flowers", "Contact Us"];

  return (
    <footer className="bg-[#0F2E35] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-3">SUITE F&G</h2>
          <p className="text-gray-400">
            Delivering fresh flowers and beautiful gifts for every occasion.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            {socialIcons.map(({ name, icon }) => (
              <div
                key={name}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#6BC29A] transition-all duration-300 cursor-pointer"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase().replace(/\s/g, "")}`}
                  className="hover:text-[#6BC29A] transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="font-semibold text-lg mb-3">Subscribe to our newsletter</h3>
          <p className="text-gray-400 mb-4">
            Get updates on latest flowers, gifts, and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg flex-1 border border-gray-600 bg-[#0F2E35] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6BC29A]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#6BC29A] text-white font-medium rounded-lg hover:bg-[#57b286] transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} SUITE F&G. All rights reserved.<span className="mx-2">Developed by <a href="https://docs.google.com/forms/d/e/1FAIpQLSeNFGvigeXwnxiTfjRky0M0L5rw3jdMgfHd61xw4ZGIGcYj1g/viewform?usp=header" 
       target="_blank" 
       className="text-gray-700 hover:text-gray-900 underline">
       Nexa Technologies
    </a>.</span> 
      </div>
    </footer>
  );

}
