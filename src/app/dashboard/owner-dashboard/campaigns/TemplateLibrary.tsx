// src/components/campaigns/TemplateLibrary.tsx
"use client";

import { useState } from "react";
import { Plus, HelpCircle, ChevronRight, X } from "lucide-react";

interface TemplateLibraryProps {
  onSelectTemplate: (template: any) => void;
  onStartFromScratch: () => void;
}

// Category tabs across the bottom stream
const categories = ["All", "No Discount", "Free Item", "₹ discount", "% discount"];

// Comprehensive list of templates mapped to real background image URLs and explicit occasions
const templates = [
  {
    id: 1,
    title: "We're bringing the joy of food & 25% Off",
    discount: "25% Off",
    category: "% discount",
    occasion: "Summer Specials",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80", // Premium Burger
  },
  {
    id: 2,
    title: "This summer grab mango specials at 30% Off",
    discount: "30% Off",
    category: "% discount",
    occasion: "Summer Specials",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80", // Mango Special dessert
  },
  {
    id: 3,
    title: "Come chill out with a FREE Chocolate Shake",
    discount: "Free Item",
    category: "Free Item",
    occasion: "Summer Specials",
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", // Chocolate Milkshake
  },
  {
    id: 4,
    title: "This Summer enjoy a FREE Mango Icecream",
    discount: "Free Item",
    category: "Free Item",
    occasion: "Summer Specials",
    imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80", // Mango Ice Cream / Summer Popsicle
  },
  {
    id: 5,
    title: "Treat your mom to a luxurious brunch & 20% Off",
    discount: "20% Off",
    category: "% discount",
    occasion: "Celebrate Mother's Day",
    imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80", // Mother's Day Pancakes Breakfast
  },
  {
    id: 6,
    title: "Make Mom smile with a FREE gourmet dessert",
    discount: "Free Item",
    category: "Free Item",
    occasion: "Celebrate Mother's Day",
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80", // High-end Pastry Dessert
  },
  {
    id: 7,
    title: "Rock out with live music performance & 15% off drinks",
    discount: "15% Off",
    category: "% discount",
    occasion: "Live Events & Entertainment",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80", // Concert Stage / Nightlife
  },
  {
    id: 8,
    title: "An unforgettable candle-lit dining experience",
    discount: "Special Pricing",
    category: "No Discount",
    occasion: "Romantic Dinner",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80", // Romantic Table Set dinner
  }
];

// Carousel cards data configuration with specific image backgrounds matching screenshots
const occasionsList = [
  { 
    name: "Celebrate Mother's Day", 
    imageUrl: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&w=300&q=80", // Soft elegant floral
    overlayColor: "bg-pink-900/40"
  },
  { 
    name: "Summer Specials", 
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80", // Clean sun beach vibe
    overlayColor: "bg-amber-900/40"
  },
  { 
    name: "Live Events & Entertainment", 
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80", // Moody DJ venue setup
    overlayColor: "bg-purple-900/50"
  },
  { 
    name: "Romantic Dinner", 
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80", // Warm restaurant mood
    overlayColor: "bg-red-900/40"
  },
];

export default function TemplateLibrary({ onSelectTemplate, onStartFromScratch }: TemplateLibraryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(true);

  // Advanced filtration engine parsing both upper carousel choices and bottom discount subtabs
  const filteredTemplates = templates.filter(template => {
    const matchesOccasion = selectedOccasion ? template.occasion === selectedOccasion : true;
    const matchesCategory = activeCategory === "All" ? true : template.category === activeCategory;
    return matchesOccasion && matchesCategory;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-2 font-sans antialiased text-slate-800">
      
      {/* How it works banner */}
      {showHowItWorks && (
        <div className="relative bg-[#FAF9F5] border border-[#EBE9E0] rounded-2xl p-8 transition-all">
          <button 
            onClick={() => setShowHowItWorks(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
          <h2 className="text-lg font-bold text-slate-900 mb-6">How it works?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 bg-[#F0EDE4] rounded-full flex items-center justify-center font-bold text-slate-700 text-sm mb-3">👋</div>
              <p className="font-semibold text-sm text-slate-900 mb-1">Select Template</p>
              <p className="text-xs text-slate-500 leading-relaxed">from our pre-built library or Start from scratch</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 bg-[#F0EDE4] rounded-full flex items-center justify-center font-bold text-slate-700 text-sm mb-3">📝</div>
              <p className="font-semibold text-sm text-slate-900 mb-1">Customize Details</p>
              <p className="text-xs text-slate-500 leading-relaxed">like offers, free items, purchases and messages</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-10 h-10 bg-[#F0EDE4] rounded-full flex items-center justify-center font-bold text-slate-700 text-sm mb-3">🚀</div>
              <p className="font-semibold text-sm text-slate-900 mb-1">Send Campaign</p>
              <p className="text-xs text-slate-500 leading-relaxed">to all customers or filter them based on their spendings</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#EBE9E0]/60 flex justify-end">
            <button className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <HelpCircle size={14} /> Watch Tutorial
            </button>
          </div>
        </div>
      )}

      {/* Hero Occasion Selector Cards with Real Images */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">What would you like to send today?</h3>
            <p className="text-xs text-slate-400">Choose an occasion below to filter your ready-made templates immediately.</p>
          </div>
          {selectedOccasion && (
            <button 
              onClick={() => setSelectedOccasion(null)}
              className="text-xs font-bold text-red-500 hover:underline mb-1"
            >
              Clear Occasion Filter (Show All)
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          
          {/* Start from Scratch Base Trigger */}
          <button onClick={onStartFromScratch} className="flex flex-col items-center justify-center text-center p-6 bg-[#EFEFEF] hover:bg-[#E5E5E5] rounded-2xl min-h-[160px] transition group border border-transparent">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 mb-4 shadow-sm group-hover:scale-105 transition">
              <Plus size={20} />
            </div>
            <span className="text-xs font-bold text-slate-800 tracking-tight">Start from Scratch</span>
          </button>

          {/* Image-Based Occasion Filters */}
          {occasionsList.map((occ) => {
            const isSelected = selectedOccasion === occ.name;
            return (
              <button
                key={occ.name}
                onClick={() => setSelectedOccasion(isSelected ? null : occ.name)}
                className={`flex flex-col justify-end text-left p-4 rounded-2xl min-h-[160px] relative overflow-hidden group transition-all duration-200 border-2 ${
                  isSelected ? "border-[#00A79D] scale-[1.02] shadow-md" : "border-transparent shadow-sm hover:scale-[1.01]"
                }`}
              >
                {/* Background Image Setup */}
                <img 
                  src={occ.imageUrl} 
                  alt={occ.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Color Treatment Tint Shader Layer */}
                <div className={`absolute inset-0 transition-colors duration-200 ${isSelected ? "bg-[#00A79D]/30" : occ.overlayColor}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Text Placement */}
                <span className="text-xs font-extrabold text-white tracking-tight relative z-10 leading-snug drop-shadow-sm">
                  {occ.name}
                </span>
                {isSelected && (
                  <span className="absolute top-2 right-2 bg-[#00A79D] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Filtered Templates Feed */}
      <div className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              {selectedOccasion ? `${selectedOccasion} Templates` : "All Campaign Templates"}
            </h3>
            <span className="bg-[#FFF8E5] text-[#FFB800] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {filteredTemplates.length} Available
            </span>
          </div>
          
          {/* Discount Categories Filter Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#D4F3F1] text-[#00A79D]"
                    : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Feed Output Grid Rendering Premium Media */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="bg-white rounded-2xl border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full text-left group"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 relative overflow-hidden">
                  <img 
                    src={template.imageUrl} 
                    alt={template.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{template.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 bg-[#EEFAF9] text-[#00A79D] text-xs font-semibold rounded-lg">
                      {template.discount}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{template.occasion}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
            <p className="text-sm text-slate-400 font-medium">No templates match this specific filter combination.</p>
            <button 
              onClick={() => { setSelectedOccasion(null); setActiveCategory("All"); }}
              className="text-xs text-[#00A79D] font-bold underline mt-2"
            >
              Reset all selection filters
            </button>
          </div>
        )}
        
        <div className="flex justify-end mt-6">
          <button className="text-xs font-bold text-[#00A79D] flex items-center gap-1 hover:underline">
            View All <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}