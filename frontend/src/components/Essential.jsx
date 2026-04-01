import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards"; 
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Essentials() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [selectedItem, setSelectedItem] = useState(null); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  const categories = ["All", "Electronics", "Books", "Fashion", "Furniture", "Education", "Other"];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:4001/item/all");
        setItems(res.data);
        setFilteredItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    let result = items;
    if (selectedCategory !== "All") {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(result);
  }, [searchQuery, selectedCategory, items]);

  const openModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  return (
    // Re-enabled theme toggle classes: bg-white for light, dark:bg-slate-950 for dark
    <div className="min-h-screen transition-colors duration-300 dark:bg-slate-900 dark:text-white">
      <Navbar />
      
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter dark:text-white text-slate-900">
            Campus <span className="text-[#b4f481]">Trending</span> Picks
          </h1>
          
          {/* --- SEARCH & FILTER BAR --- */}
          <div className="mt-10 flex flex-col md:flex-row gap-0 justify-center items-center shadow-2xl">
            <div className="relative w-full md:w-96">
              <input 
                type="text"
                placeholder="Search for items..."
                className="w-full bg-slate-100 dark:bg-[#0d1526] border border-slate-200 dark:border-slate-800 py-4 px-6 outline-none focus:border-[#b4f481] transition-all font-bold text-sm dark:text-white text-slate-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="w-full md:w-48 bg-slate-100 dark:bg-[#0d1526] border border-slate-200 dark:border-slate-800 py-4 px-6 outline-none focus:border-[#b4f481] font-bold text-sm dark:text-gray-300 text-slate-700 cursor-pointer appearance-none md:border-l-0"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="dark:bg-[#0d1526] bg-white">{cat}</option>
              ))}
            </select>

            <Link to="/upload-item" className="w-full md:w-auto">
              <button className="w-full bg-[#b4f481] text-black px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                Sell +
              </button>
            </Link>
          </div>
        </div>

        {/* --- GRID --- */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-[#b4f481]"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
            {filteredItems.map((item) => (
              <div key={item._id} onClick={() => openModal(item)} className="cursor-pointer">
                <Cards item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0d1526] w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar relative border border-slate-200 dark:border-slate-800 shadow-2xl">
            
            {/* CLOSE BUTTON - Fixed overlap */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-[130] bg-slate-800 hover:bg-red-500 text-white w-10 h-10 flex items-center justify-center border border-slate-700 transition-all"
            >✕</button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 bg-slate-50 dark:bg-[#050811] flex items-center justify-center relative group min-h-[400px]">
                <img 
                  src={selectedItem.images[currentImageIndex]} 
                  className="w-full max-h-[500px] object-contain" 
                  alt="Product" 
                />
                {selectedItem.images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => prev === 0 ? selectedItem.images.length - 1 : prev - 1); }} className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#b4f481] text-white hover:text-black w-10 h-10 flex items-center justify-center text-2xl group-hover:opacity-100 transition-all">‹</button>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length); }} className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#b4f481] text-white hover:text-black w-10 h-10 flex items-center justify-center text-2xl group-hover:opacity-100 transition-all">›</button>
                  </>
                )}
              </div>

              <div className="p-10 flex flex-col">
                {/* HEADER - Added padding-right (pr-16) to prevent price hiding under X icon */}
                <div className="flex justify-between items-start mb-6 pr-16"> 
                  <h2 className="text-3xl md:text-4xl font-black dark:text-white text-slate-900 uppercase tracking-tighter">{selectedItem.title}</h2>
                  <p className="text-3xl md:text-4xl font-black text-[#b4f481]">₹{selectedItem.price}</p>
                </div>

                <div className="flex gap-2 mb-8">
                  <span className="bg-[#b4f481] text-black text-[10px] font-black px-3 py-1 uppercase">{selectedItem.condition}</span>
                  <span className={`text-[10px] font-black px-3 py-1 uppercase border ${selectedItem.isNegotiable ? 'border-blue-500 text-blue-500' : 'border-red-500 text-red-500'}`}>{selectedItem.isNegotiable ? "Negotiable" : "Fixed"}</span>
                </div>

                <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed mb-8">{selectedItem.description}</p>

                <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-200 dark:border-slate-800 mb-8">
                  <div><h4 className="text-[10px] font-black dark:text-gray-500 text-gray-400 uppercase tracking-widest mb-1">Category</h4><p className="dark:text-white text-slate-900 font-bold">{selectedItem.category}</p></div>
                  <div><h4 className="text-[10px] font-black dark:text-gray-500 text-gray-400 uppercase tracking-widest mb-1">Location</h4><p className="dark:text-white text-slate-900 font-bold">{selectedItem.pickupPoint || "MIT Campus"}</p></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <a href={`https://wa.me/${selectedItem.seller?.mobNumber || ""}`} target="_blank" rel="noreferrer" className="bg-[#2ecc71] text-white py-4 font-black text-center text-[11px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">💬 WHATSAPP</a>
                  <a href={`mailto:${selectedItem.seller?.email || ""}`} className="bg-slate-900 text-white dark:bg-white dark:text-black py-4 font-black text-center text-[11px] uppercase tracking-widest hover:opacity-80 transition-all">✉️ EMAIL SELLER</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Essentials;