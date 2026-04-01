import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// --- IMPORT YOUR COMPONENTS ---
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("KitUp_User");
    return data ? JSON.parse(data) : null;
  });

  const [activeTab, setActiveTab] = useState("info");
  const [myItems, setMyItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // States for Security tab
  const [showResetOtpField, setShowResetOtpField] = useState(false);
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Fetch items when seller tab is active
  useEffect(() => {
    if (activeTab === "seller" && user?._id) {
      fetchUserItems();
    }
  }, [activeTab]);

  const fetchUserItems = async () => {
    setLoadingItems(true);
    try {
      const response = await axios.get(`http://localhost:4001/item/all?sellerId=${user._id}`);
      // Filter logic in case backend returns all items
      const filtered = response.data.filter(item => 
        (item.seller?._id || item.seller) === user._id
      );
      setMyItems(filtered);
    } catch (err) {
      toast.error("Failed to load your listings");
    } finally {
      setLoadingItems(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("KitUp_User");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:4001/item/delete/${itemId}`);
      toast.success("Item removed");
      setMyItems(myItems.filter(item => item._id !== itemId));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar /> {/* --- NAVBAR ADDED HERE --- */}
      
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-10 px-4 transition-colors duration-300">
        <Toaster />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
          
          {/* Left Sidebar */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm text-center border dark:border-slate-700">
              <div className="w-20 h-20 bg-lime-400 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-white dark:border-slate-700 shadow-sm text-black">
                {user?.name?.[0]}
              </div>
              <h2 className="font-bold text-xl dark:text-white capitalize">{user?.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 break-all px-2 mt-1">{user?.email}</p>
              
              <div className="mt-8 flex flex-col gap-2">
                <TabBtn label="Personal Info" active={activeTab === 'info'} onClick={() => setActiveTab("info")} />
                <TabBtn label="Seller Dashboard" active={activeTab === 'seller'} onClick={() => setActiveTab("seller")} />
                <TabBtn label="Security" active={activeTab === 'security'} onClick={() => setActiveTab("security")} />
                
                <button 
                  onClick={handleLogout}
                  className="mt-4 py-3 px-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border border-transparent hover:border-red-100"
                >
                  Logout Account
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-8 lg:col-span-9 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border dark:border-slate-700 overflow-hidden min-h-[500px]">
            <div className="p-6 md:p-10">
              {activeTab === "info" && (
                <div className="animate-fadeIn">
                  <h3 className="text-2xl font-bold mb-8 dark:text-white">Profile Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
                    <InfoItem label="Full Name" value={`${user?.name} ${user?.surname || ''}`} />
                    <InfoItem label="Email Address" value={user?.email} />
                    <InfoItem label="WhatsApp Number" value={user?.mobNumber || "Not Linked"} />
                    <InfoItem label="Campus Address" value={user?.address || "MITAOE Campus"} />
                  </div>
                </div>
              )}

              {activeTab === "seller" && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h3 className="text-2xl font-bold dark:text-white">My Listings</h3>
                    <button 
                      onClick={() => navigate("/upload-item")} 
                      className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-lime-400/20 transition-all active:scale-95"
                    >
                      + List New Item
                    </button>
                  </div>

                  {loadingItems ? (
                    <div className="flex justify-center py-20">
                      <span className="loading loading-spinner loading-lg text-lime-400"></span>
                    </div>
                  ) : myItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myItems.map((item) => (
                        <div key={item._id} className="bg-gray-50 dark:bg-slate-900 rounded-2xl overflow-hidden border dark:border-slate-700 group">
                          <div className="h-40 overflow-hidden relative">
                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded-lg text-[10px] font-bold dark:text-white">
                              ₹{item.price}
                            </div>
                          </div>
                          <div className="p-4">
                            <h5 className="font-bold text-sm truncate dark:text-white mb-1">{item.title}</h5>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.category}</p>
                            <button 
                              onClick={() => handleDeleteItem(item._id)}
                              className="mt-4 w-full py-2 text-xs font-bold text-red-500 border border-red-100 dark:border-red-900/30 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                            >
                              Delete Listing
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-3xl">
                      <p className="text-gray-400 dark:text-gray-500 mb-4">No items listed on the marketplace yet.</p>
                      <button onClick={() => navigate("/upload-item")} className="text-lime-500 font-bold hover:underline">Start Selling Now</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "security" && (
                <div className="animate-fadeIn max-w-md">
                   <h3 className="text-2xl font-bold mb-8 dark:text-white">Account Security</h3>
                   {/* Password Reset Logic */}
                   <p className="text-sm text-gray-500 mb-4 italic">Password features are coming soon to your profile dashboard.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* --- FOOTER ADDED HERE --- */}
    </>
  );
}

// Sidebar Button Component
function TabBtn({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`py-3.5 px-5 rounded-2xl text-sm font-bold text-left transition-all ${
        active 
        ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/10' 
        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50 dark:text-gray-400'
      }`}
    >
      {label}
    </button>
  );
}

// Data Row Component
function InfoItem({ label, value }) {
  return (
    <div>
      <label className="text-[10px] font-black text-lime-500 uppercase tracking-[2px]">{label}</label>
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">{value || "Not Set"}</p>
    </div>
  );
}

export default Profile;