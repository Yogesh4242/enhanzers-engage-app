"use client";

import { useState, FormEvent } from "react";
import { createClient } from '@/lib/supabase/client';

// --- Type Definitions ---
interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Beverages" | "Desserts & Snacks";
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CustomerData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}
// ------------------------

// Expanded Premium Indian Menu Items
const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  { 
    id: 101, 
    name: "Classic Masala Dosa", 
    price: 180, 
    description: "Crispy fermented crepe filled with spiced potato mash, served with coconut chutney and sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Breakfast"
  },
  { 
    id: 102, 
    name: "Chole Bhature", 
    price: 220, 
    description: "Fluffy deep-fried bread served with spicy, tangy chickpea curry and pickled onions.",
    image: "https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&w=800&q=80",
    category: "Breakfast"
  },
  { 
    id: 103, 
    name: "Kanchipuram Idli", 
    price: 150, 
    description: "Steamed savory rice cakes tempered with black pepper, cumin, and ghee.",
    image: "https://images.unsplash.com/photo-1736239093796-68c998a84b96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Breakfast"
  },

  // Lunch
  { 
    id: 201, 
    name: "Maharaja Thali", 
    price: 450, 
    description: "A grand platter featuring dal makhani, paneer subzi, seasonal veg, rice, roti, and papad.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    category: "Lunch"
  },
  { 
    id: 202, 
    name: "Chicken Chettinad", 
    price: 380, 
    description: "Fiery South Indian chicken curry made with roasted spices and fresh coconut.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    category: "Lunch"
  },
  { 
    id: 203, 
    name: "Rajma Chawal Bowl", 
    price: 250, 
    description: "Comforting red kidney bean curry slow-cooked in spices, served over steamed basmati rice.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    category: "Lunch"
  },

  // Dinner
  { 
    id: 301, 
    name: "Butter Chicken Delhi Style", 
    price: 420, 
    description: "Tender tandoori chicken simmered in a velvety tomato-butter gravy with fenugreek.",
    image: "https://images.unsplash.com/photo-1728910107534-e04e261768ae?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dinner"
  },
  { 
    id: 302, 
    name: "Awadhi Lamb Biryani", 
    price: 550, 
    description: "Fragrant basmati rice layered with slow-cooked lamb, saffron, and caramelized onions.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    category: "Dinner"
  },
  { 
    id: 303, 
    name: "Paneer Tikka Masala", 
    price: 360, 
    description: "Charcoal-smoked cottage cheese cubes tossed in a rich, spiced onion-tomato sauce.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1317&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Dinner"
  },
  { 
    id: 304, 
    name: "Garlic Butter Naan", 
    price: 80, 
    description: "Warm, pillowy Indian flatbread brushed with roasted garlic and fresh cilantro.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    category: "Dinner"
  },

  // Beverages
  { 
    id: 401, 
    name: "Madras Filter Coffee", 
    price: 120, 
    description: "Strong, frothy traditional South Indian coffee brewed in a metal filter.",
    image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=800&q=80",
    category: "Beverages"
  },
  { 
    id: 402, 
    name: "Kadak Masala Chai", 
    price: 90, 
    description: "Assam black tea brewed with milk, crushed ginger, cardamom, and cloves.",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80",
    category: "Beverages"
  },
  { 
    id: 403, 
    name: "Alphonso Mango Lassi", 
    price: 160, 
    description: "Thick, creamy yogurt drink blended with sweet Alphonso mangoes and a touch of cardamom.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Beverages"
  },

  // Desserts & Snacks
  { 
    id: 501, 
    name: "Saffron Pista Kulfi", 
    price: 180, 
    description: "Traditional creamy Indian ice cream infused with pure saffron strands and pistachios.",
    image: "https://plus.unsplash.com/premium_photo-1678198786405-28e947bb8a12?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Desserts & Snacks"
  },
  { 
    id: 502, 
    name: "Punjabi Samosa Chaat", 
    price: 140, 
    description: "Crushed potato samosas topped with spiced chickpeas, yogurt, mint, and tamarind chutney.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Desserts & Snacks"
  },
  { 
    id: 503, 
    name: "Warm Gulab Jamun", 
    price: 120, 
    description: "Soft milk-solid dumplings deep-fried and soaked in a rose-scented sugar syrup.",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
    category: "Desserts & Snacks"
  }
];

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Beverages", "Desserts & Snacks"];

export default function MenuPage() {
  const supabase = createClient();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phone: "",
    email: "",
    notes: "" 
  });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  // BACKEND LOGIC: Completely untouched
  const handleCheckoutSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Save Customer Data
      const { data: customer, error: customerError } = await supabase
        .from('menu_customers')
        .insert([{ 
          name: customerData.name, 
          phone: customerData.phone, 
          email: customerData.email,
          notes: customerData.notes 
        }])
        .select()
        .single();
        
      if (customerError) throw customerError;

      // 2. Save Order Data
      const { data: order, error: orderError } = await supabase
        .from('menu_orders')
        .insert([{ 
          customer_id: customer.id, 
          total_amount: cartTotal,
          status: 'pending_kitchen'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. Save Order Items Data
      const orderItemsToInsert = cart.map((item) => ({
        order_id: order.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('menu_order_items')
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      // Success
      setIsSuccess(true);
      setCart([]); 
      setIsCheckoutOpen(false);
      
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was an error placing your order. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full bg-[#FAF9F6] text-[#121212] font-sans flex items-center justify-center">
        <div className="p-10 max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-[#121212] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <svg className="w-12 h-12 text-[#FAF9F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black mb-4 tracking-tight">
            Order Confirmed
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            The kitchen has received your order and is preparing it with care.
          </p>
          <button 
            onClick={() => setIsSuccess(false)} 
            className="bg-[#121212] text-[#FAF9F6] border-none px-8 py-4 rounded-xl font-bold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#121212] font-sans selection:bg-[#121212] selection:text-[#FAF9F6]">
      <div className="p-6 md:p-12 flex flex-col lg:flex-row gap-12 max-w-[1500px] mx-auto">
        
        {/* Menu Section */}
        <div className="flex-1">
          <header className="mb-10">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
              The Heritage Kitchen.
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-8">
              Experience the rich, authentic flavors of our premium Indian menu. Prepared fresh daily with locally sourced ingredients and traditional spices.
            </p>

            {/* Category Filter Pills */}
            <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-[#121212] text-white shadow-md' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#121212] hover:text-[#121212]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-in fade-in zoom-in duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full font-bold shadow-sm">
                    ₹{item.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-[#121212]/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {item.category}
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{item.description}</p>
                  
                  <button 
                    onClick={() => addToCart(item)} 
                    className="w-full bg-gray-50 text-[#121212] border border-gray-200 rounded-xl px-5 py-3.5 font-bold text-sm cursor-pointer transition-all duration-300 group-hover:bg-[#121212] group-hover:text-[#FAF9F6] active:scale-[0.98]"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar Section (Dark Secondary Theme) */}
        <div className="w-full lg:w-[420px]">
          <div className="bg-[#121212] text-[#FAF9F6] rounded-[2rem] p-8 lg:sticky lg:top-12 shadow-2xl">
            <h2 className="text-2xl font-black mb-8 flex items-center justify-between">
              Your Order
              <span className="bg-white/10 text-white text-sm py-1 px-3 rounded-full font-semibold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
              </span>
            </h2>
            
            {cart.length === 0 ? (
              <div className="py-12 text-center text-gray-400 border-2 border-dashed border-white/10 rounded-2xl">
                <p>Your cart is empty.</p>
                <p className="text-sm mt-2">Add some items to get started.</p>
              </div>
            ) : (
              <div className="flex flex-col h-full max-h-[60vh] lg:max-h-none overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-6 flex-grow">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start group">
                      <div className="flex flex-col pr-4">
                        <span className="font-bold text-base leading-tight">{item.name}</span>
                        <span className="text-gray-400 text-sm mt-1">
                          {item.quantity} × ₹{item.price}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-bold text-lg">₹{item.price * item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-gray-500 text-xs font-semibold uppercase tracking-wider hover:text-white transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-gray-400 font-medium">Subtotal</span>
                    <span className="text-3xl font-black">₹{cartTotal}</span>
                  </div>
                  
                  <button 
                    onClick={() => setIsCheckoutOpen(true)} 
                    className="w-full bg-[#FAF9F6] text-[#121212] border-none p-4 rounded-xl text-lg font-black cursor-pointer transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-[#121212]/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white text-[#121212] p-8 md:p-10 rounded-[2rem] w-full max-w-[550px] shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black">Details</h2>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleCheckoutSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[#121212] transition-all focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212] focus:bg-white" 
                      placeholder="Enter name"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[#121212] transition-all focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212] focus:bg-white" 
                      placeholder="+91 ***** *****"
                      value={customerData.phone}
                      onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email (Optional)</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[#121212] transition-all focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212] focus:bg-white" 
                    placeholder="youremail@example.com"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Order Notes (Optional)</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[#121212] transition-all focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212] focus:bg-white resize-none" 
                    placeholder="Any allergies, spice level preferences, or special requests?"
                    value={customerData.notes}
                    onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#121212] text-[#FAF9F6] border-none p-4 rounded-xl font-black text-lg transition-all duration-300 hover:bg-black hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Complete Order • ₹${cartTotal}`
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}