"use client";

export default function SourceFlowerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2E35] to-[#1a3d4a] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center bg-white/10 backdrop-blur-xl rounded-xl p-12 border border-white/20 shadow-2xl">
       
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-[#6BC29A] to-green-500 bg-clip-text text-transparent">
          Source Flower
        </h1>
        
        <p className="text-xl md:text-2xl font-semibold text-gray-300 mb-8">
          Currently Unavailable
        </p>
        
        <p className="text-gray-400 text-lg mb-12 max-w-sm mx-auto leading-relaxed">
          This feature is coming soon! Check back later for flower sourcing options.
        </p>
        
        <a 
          href="/catalogue"
          className="inline-block bg-[#6BC29A] hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold  transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          Browse Catalogue
        </a>
      </div>
    </div>
  );
}

