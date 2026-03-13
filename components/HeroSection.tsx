"use client";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] bg-[#0F2E35] flex items-center overflow-hidden">

      {/* Container */}
      <div className="max-w-7xl mx-auto w-full px-12 py-20 flex items-center justify-between">

        {/* LEFT CONTENT */}
        <div className="flex-1 max-w-md">

          {/* Tagline */}
            <div className="uppercase tracking-widest text-sm text-[#6BC29A] mb-8 font-light">
            NATURE'S PERFECT GIFT
            </div>

          {/* Heading */}
          <div className="mb-8 relative">

            <div className="absolute -top-4 left-0 w-24 h-px bg-gradient-to-r from-transparent via-[#6BC29A] to-transparent"></div>

            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-tight mb-4">
              <span className="text-white block">SUITE</span>
              <span className="text-[#6BC29A] block">
                FLOWERS
              </span>
              <span className="text-[#6BC29A] block">
                &amp; GIFTS
              </span>
            </h1>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#6BC29A] to-transparent"></div>

          </div>

          {/* Paragraph */}
         <p className="text-gray-300 leading-relaxed mb-10 text-lg">
  Discover beautifully crafted floral arrangements and thoughtful gifts 
  designed to brighten every moment. From romantic bouquets to special 
  occasion flowers, we help you express your feelings in the most 
  beautiful way.
</p>
          {/* Button */}
          <button className="border border-white text-white px-8 py-4  font-medium hover:bg-white hover:text-[#0F2E35] transition-all duration-300 uppercase tracking-wide text-sm">
           ORDER NOW
          </button>

        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="flex-1 flex justify-end">

          <div className="relative w-[500px] h-[600px] lg:w-[600px] lg:h-[700px]">

            <svg viewBox="0 0 400 500" className="w-full h-full">

              <path
                d="M300 400 Q 280 300 250 200 Q 240 150 220 100"
                stroke="#E8F5E8"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />

              <circle cx="220" cy="100" r="30" fill="#FF8C42" />
              <circle cx="210" cy="85" r="25" fill="#FFAB73" />
              <circle cx="235" cy="105" r="22" fill="#FFB366" />

              <path
                d="M200 150 Q 190 140 180 150 Q 170 160 180 170"
                fill="#6BC29A"
                stroke="#4CAF50"
                strokeWidth="2"
              />

              <path
                d="M350 450 Q 330 350 300 250 Q 290 200 270 150"
                stroke="#B2EBF2"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />

              <circle cx="270" cy="150" r="35" fill="#FFF176" />
              <circle cx="260" cy="135" r="28" fill="#FFE082" />
              <circle cx="285" cy="155" r="26" fill="#FFED69" />

              <path
                d="M100 380 Q 120 280 150 180"
                stroke="#6BC29A"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              <circle cx="150" cy="180" r="25" fill="#81C784" />
              <circle cx="140" cy="165" r="20" fill="#AED581" />
              <circle cx="165" cy="185" r="18" fill="#C8E6C9" />

              <circle cx="320" cy="300" r="8" fill="#FF5722" />
              <circle cx="180" cy="250" r="6" fill="#FFC107" />
              <circle cx="280" cy="350" r="5" fill="#4CAF50" />

            </svg>

          </div>

        </div>

      </div>

      {/* SLIDER INDICATOR */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/20 backdrop-blur-sm px-8 py-3 rounded-full">

        <span className="text-white text-sm font-mono">01</span>

        <div className="w-20 h-1 bg-gray-500 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-[#6BC29A] rounded-full"></div>
        </div>

        <span className="text-white text-sm font-mono">02</span>

      </div>

    </section>
  );
};

export default HeroSection;