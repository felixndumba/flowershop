"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ChevronDown, Funnel, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useCart } from "@/contexts/CartContext";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
};

type CurrentFilters = {
  categories: string[];
  minPrice: string;
  maxPrice: string;
  search: string;
  category: string;
};

interface Props {
  products: Product[];
  categories: string[];
  currentFilters?: Partial<CurrentFilters>;
}

const defaultFilters: CurrentFilters = {
  categories: [],
  minPrice: "",
  maxPrice: "",
  search: "",
  category: "",
};

export default function ProductsList({
  products,
  categories,
  currentFilters,
}: Props) {
  const router = useRouter();

  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

const [localFilters, setLocalFilters] = useState<CurrentFilters>({
    ...defaultFilters,
    ...currentFilters,
    categories: currentFilters?.categories || [],
    category: currentFilters?.category || '',
  });

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getQty = (id: number) => quantities[id] || 1;
  const setQty = (id: number, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, value) }));
  };

  useEffect(() => {
    setLocalFilters({
      ...defaultFilters,
      ...currentFilters,
      categories: currentFilters?.categories || [],
      category: currentFilters?.category || '',
    });
  }, [currentFilters]);

  const handleFilterChange = (filters: CurrentFilters) => {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') 
      params.set("category", filters.category);
    if (filters.categories.length > 0)
      params.set("categories", filters.categories.join(","));
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.search) params.set("search", filters.search);

    router.push(`/catalogue?${params.toString()}`);
  };

  const serverFilteredProducts = products.filter((p) => {
    const matchesCategory =
      localFilters.category === 'All' || localFilters.category === '' || p.category === localFilters.category;
    const matchesPrice =
      (!localFilters.minPrice || p.price >= Number(localFilters.minPrice)) &&
      (!localFilters.maxPrice || p.price <= Number(localFilters.maxPrice));
    return matchesCategory && matchesPrice;
  });

  // Client-side additional filtering
  const filteredProducts = serverFilteredProducts.filter((p) => {
    const matchesCategory =
      localFilters.categories.length === 0 ||
      localFilters.categories.includes(p.category);
    const matchesSearch =
      !localFilters.search ||
      p.name.toLowerCase().includes(localFilters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto bg-[#0F2E35]">

      {/* Category bar + Filter button */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => {
            const isActive = localFilters.categories.includes(cat);
            const isOpen = openDropdowns[cat] || false;

            return (
              <div key={cat} className="relative">
                <div
                  onClick={() => {
                    // Close all other dropdowns
                    setOpenDropdowns(prev => {
                      const newState = { ...prev };
                      Object.keys(newState).forEach(key => {
                        if (key !== cat) newState[key] = false;
                      });
                      newState[cat] = !prev[cat];
                      return newState;
                    });
                    if (cat === 'All') {
                      setLocalFilters({
                        ...localFilters,
                        categories: [],
                      });
                    } else {
                      setLocalFilters({
                        ...localFilters,
                        categories: [cat],
                      });
                    }
                  }}
                  className={`px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer hover:text-[#6BC29A] min-w-[120px] ${
                    isActive ? "border-b-2 border-[#6BC29A]" : ""
                  }`}
                >
                  {cat}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
{isOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px] py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
                      Select {cat}
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-50 border-t border-gray-100">
                      View all {cat}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border border-gray-300/50 text-gray-200 rounded-xl hover:border-[#6BC29A] hover:text-[#6BC29A] hover:shadow-lg transition-all duration-300 flex items-center gap-1 cursor-pointer font-medium backdrop-blur-sm group"
        >
          <Funnel className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Filter</span>
        </div>
      </div>

      {/* Filter panel */}
{showFilters && (
        <div ref={filterRef} className="bg-white  text-black rounded-2xl p-5 px-5 py-6 shadow-lg mb-8 ">

          {/* Search */}
          <div className="mb-4 mt-4">
            <label className="text-sm text-gray-600 block mb-1">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={localFilters.search}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, search: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#6BC29A]"
            />
          </div>

         {/* Multi-category */}
<div className="mb-4 p-3 bg-gray-50 rounded-xl">
  <label className="text-sm text-gray-600 block mb-2">Categories</label>
<div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const selected = localFilters.categories.includes(cat);
              return (
                <div 
                  onClick={() => {
                    const updated = selected
                      ? localFilters.categories.filter((c) => c !== cat)
                      : [...localFilters.categories, cat];
                    setLocalFilters({
                      ...localFilters,
                      categories: updated,
                    });
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer hover:opacity-80 ${
                    selected
                      ? "text-[#6BC29A] border-2 border-[#6BC29A] bg-[#6BC29A]/10"
                      : "text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </div>
              );
            })}
          </div>
</div>

          {/* Price */}
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, minPrice: e.target.value })
              }
              className="p-2 border rounded-lg w-32"
            />
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, maxPrice: e.target.value })
              }
              className="p-2 border rounded-lg w-32"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => handleFilterChange(localFilters)}
              className="px-4 py-2 bg-[#6BC29A] text-white rounded-lg hover:bg-green-600"
            >
              Apply
            </button>

            <button
              onClick={() => {
                setLocalFilters(defaultFilters);
                router.push("/catalogue");
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Sort + Count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400">{sortedProducts.length} products</p>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 rounded-lg"
        >
          <option value="default">Best selling</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{selectedProduct && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-in fade-in zoom-in duration-200" onClick={(e) => e.target === e.currentTarget && setSelectedProduct(null)}>
            <div className="bg-[#6BC29A]  max-w-2xl mx-auto max-h-[70vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
className="w-full h-full max-h-[50vh] object-contain mb-6"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedProduct.name}</h2>
                <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">{selectedProduct.category}</h3>
                <div className="prose prose-sm max-w-none mb-6 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedProduct.description}
                </div>
                <div className="flex gap-3 mb-4">
                
                  
                  <a 
                    href={`https://wa.me/254797624963?text=Hi! I%20want%20to%20order%20${encodeURIComponent(selectedProduct.name)}%20KES%20${selectedProduct.price}%20Qty:1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all duration-200 text-center flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 0 0 1-1.51-5.26c.001-.003.112-.037 .013.041l.773 1.793 1.563-.443c.545-.153 1.179-.44 1.613-.812.434-.372 1.076-.737 1.614-.937l.003-.001c.896-.4 1.534-.769 2.126-.873l.004-.001c.472-.053 .975.115 1.371.56.396.445 .715.959 .953 1.487.238.529 .425 1.124 .571 1.742 .146.619 .291 1.301 .404 1.915 .113 .614 .182 1.168 .221 1.652 .039 .484 .061 .81 .061 .81v.001z"/>
                    </svg>
                    WhatsApp Order
                  </a>
                </div>
                 
              </div>
            </div>
            </div>
        )}
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <img
              src={product.image}
className="w-full h-72 object-contain"
              alt={product.name}
            />
            <div className="p-4">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <span className="text-[#6BC29A] font-bold">
                  KES {product.price}
                </span>
              <button 
                onClick={() => setSelectedProduct(product)}
                className="text-sm text-blue-400 hover:underline mt-1 block"
              >
                View Description
              </button>
              <div className="flex justify-between mt-3">
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white/20  p-1">
                    <button
                      onClick={() => setQty(product.id, getQty(product.id) - 1)}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/30 transition-all text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-white px-2">
                      {getQty(product.id)}
                    </span>
                    <button
                      onClick={() => setQty(product.id, getQty(product.id) + 1)}
                      className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/30 transition-all text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(product, getQty(product.id));
                      setQty(product.id, 1);
                      toast.success(`${product.name} (${getQty(product.id)}) added to cart!`, {
                        duration: 2500,
                        style: {
                          borderRadius: '10px',
                          background: '#6BC29A',
                          color: '#fff',
                        },
                      });
                    }}
                    className="bg-[#6BC29A] hover:bg-green-600 text-white px-4 py-1.5 font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}