// import React, { useState } from "react";
// import Iteam from "./Iteam";
// import list from "../list.json";
// import { Link } from "react-router-dom";

// function Essetials(){

//   const paidItems = list.filter((item) => item.category === "NEW");

//   return (
//     <>
//       <hr />
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
//         <div className="mt-8 items-center justify-center text-center">
//           <h1 className="text-2xl md:text-4xl">
//             "What's <span className="text-pink-500">Trending </span>: Top Picks
//             & Special Offers"
//           </h1>
//           <p className="mt-12 mb-3">
//             Welcome to the Trending page! Discover the latest and most popular
//             items and deals right here. From essential resources to exclusive
//             promotions, stay updated with what's currently in demand. Explore
//             top picks and special offers tailored to enhance your college
//             experience. Whether you're looking for academic support or great
//             deals, find out what's trending now.
//           </p>
//           <Link to="/">
//             <button className="mb-6 mr-3 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
//               Go Back
//             </button>
//           </Link>
//           <Link to="/Tools">
//             <button className="mt-6 ml-3 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 duration-300">
//               Tools
//             </button>
//           </Link>
//           <hr />
//         </div>
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//           {list.map((item) => (
//             <Iteam key={item.id} item={item} />
//           ))}
//         </div>
//       </div>


      
      
//     </>
//   );
// }

// export default Essetials;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards"; // Your updated Cards component
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Essentials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // For the expanded view

  // Fetch items from your real Database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:4001/item/all");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24">
        <div className="items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold dark:text-white">
            "What's <span className="text-lime-400">Trending</span> : Campus Picks"
          </h1>
          <p className="mt-6 mb-8 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time listings from your fellow students. Quality checked, 
            budget-friendly, and available for pickup on campus.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/">
              <button className="bg-gray-200 dark:bg-slate-800 dark:text-white px-6 py-2 rounded-xl hover:bg-gray-300 duration-300">
                Go Back
              </button>
            </Link>
            <Link to="/upload-item">
              <button className="bg-lime-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-lime-500 duration-300">
                Sell Something
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-lime-400"></span>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
            {items.map((item) => (
              <div key={item._id} onClick={() => setSelectedItem(item)} className="cursor-pointer">
                <Cards item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- EXPANDED MODAL VIEW --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-y-auto no-scrollbar relative shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Side: Image Gallery */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {selectedItem.images.map((img, index) => (
                    <img 
                      key={index} 
                      src={img} 
                      className={`w-full h-48 object-cover rounded-2xl ${selectedItem.images.length === 1 ? 'col-span-2 h-80' : ''}`} 
                      alt="Product"
                    />
                  ))}
                </div>
              </div>

              {/* Right Side: Info */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-lime-100 text-lime-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {selectedItem.category}
                    </span>
                    <span className="text-2xl font-black text-lime-600">₹{selectedItem.price}</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold dark:text-white mb-4">{selectedItem.title}</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{selectedItem.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Condition</h4>
                        <p className="dark:text-white">{selectedItem.condition}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pickup</h4>
                        <p className="dark:text-white">{selectedItem.pickupPoint}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t pt-6 dark:border-slate-800">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center font-bold text-black uppercase">
                        {selectedItem.seller?.name?.[0] || 'S'}
                      </div>
                      <div>
                        <p className="text-sm font-bold dark:text-white">Sold by {selectedItem.seller?.name || 'Student'}</p>
                        <p className="text-xs text-gray-400">Verified MITAOE Student</p>
                      </div>
                   </div>
                   
                   <a 
                    href={`https://wa.me/${selectedItem.seller?.mobNumber || selectedItem.seller?.whatsAppNumber}`}
                    target="_blank"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-center block transition-all shadow-lg shadow-green-500/20"
                   >
                     Message Seller on WhatsApp
                   </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Essentials;