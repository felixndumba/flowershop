"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "254797624963";
  const message = "Hello, I would like to inquire about your products and services.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip */}
      <span className="absolute right-16 bottom-3 
  bg-white/90 backdrop-blur-md text-gray-800 text-xs font-medium
  px-4 py-2 rounded-full shadow-lg
  opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
  transition-all duration-300 whitespace-nowrap"
>
  Chat with us
</span>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}