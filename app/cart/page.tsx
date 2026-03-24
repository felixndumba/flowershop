"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const {
    state,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleOrderWhatsApp = () => {
    const phoneNumber = "254797624963";
    
    const orderItems = state.items.map(item => 
      `${item.name} (${item.category}) x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const orderMessage = `*Hello*\n\n` +
      ` *Order Details:*\n${orderItems}\n\n` +
      ` *Total: KES ${totalPrice.toLocaleString()}*\n\n` +
      ` Please provide delivery details & payment info.\n\n` +
      `Thank you for choosing us!Your order will be processed shortly.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // EMPTY CART
  if (state.items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-6 md:px-12 bg-[#0F2E35]">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl text-gray-500">🛒</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Your cart is empty
          </h2>

          <p className="text-gray-400 mb-8 max-w-md">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>

          <Link
            href="/catalogue"
            className="bg-[#6BC29A] text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-10  mx-auto bg-[#0F2E35]">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>

        <button
          onClick={clearCart}
          className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_350px]">
        
        {/* CART ITEMS */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex gap-4">

                {/* IMAGE */}
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-white/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-lg mb-1 truncate">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 mb-2">{item.category}</p>

                  <p className="text-2xl font-bold text-[#6BC29A]">
                    KES {item.price.toLocaleString()}
                  </p>
                </div>

                {/* CONTROLS */}
                <div className="flex flex-col items-center gap-3 ml-4">

                  {/* QUANTITY */}
                  <div className="flex items-center bg-white/20 rounded-lg p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-white/30 transition"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-5 h-5 text-white" />
                    </button>

                    <span className="w-12 text-center text-xl font-bold text-white">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-white/30 transition"
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* SUBTOTAL */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-white font-semibold">
                  Subtotal: KES{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 sticky top-8 h-fit">
          
          <h3 className="text-xl font-bold text-white mb-6">
            Order Summary
          </h3>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-lg">
              <span className="text-gray-300">Total Items:</span>
              <span className="font-bold text-white">
                {totalItems}
              </span>
            </div>

            <div className="flex justify-between text-2xl font-bold text-[#6BC29A]">
              <span>Total:</span>
              <span>
                KES {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

<button 
            onClick={handleOrderWhatsApp}
            className="w-full bg-[#6BC29A] text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <svg className="w-5 h-5 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-2-5l-2 2 2.5 2.5L16 7l-2-2  -3.5 3.5z"/>
            </svg>
            Send Order via WhatsApp
          </button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Shipping &amp; taxes calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}