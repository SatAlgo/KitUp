import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// --- COMPONENTS ---
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
  
  // 1. User State
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("KitUp_User");
    return data ? JSON.parse(data) : null;
  });

  // 2. Navigation State
  const [activeTab, setActiveTab] = useState("info");

  // 3. Seller Dashboard State
  const [myItems, setMyItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // 4. Security Flow State
  const [secStep, setSecStep] = useState("init"); // init or otp
  const [secLoading, setSecLoading] = useState(false);
  const [secOtp, setSecOtp] = useState("");
  const [secNewPassword, setSecNewPassword] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch items when seller tab is active
  useEffect(() => {
    if (activeTab === "seller" && user?._id) {
      fetchUserItems();
    }
  }, [activeTab]);

  // --- SELLER LOGIC ---
  const fetchUserItems = async () => {
    setLoadingItems(true);
    try {
      // Assuming your backend supports filtering by sellerId
      const response = await axios.get(`http://localhost:4001/item/all`);
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

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Permanent Action: Delete this listing?")) return;
    try {
      await axios.delete(`http://localhost:4001/item/delete/${itemId}`);
      toast.success("Item removed from marketplace");
      setMyItems(myItems.filter(item => item._id !== itemId));
    } catch (err) {
      toast.error("Delete request failed");
    }
  };

  // --- SECURITY LOGIC (PASSWORD RESET) ---
  const handleRequestOTP = async () => {
    setSecLoading(true);
    try {
      await axios.post("http://localhost:4001/user/forgot-password", { email: user.email });
      toast.success("Verification code sent to email!");
      setSecStep("otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSecLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (secNewPassword.length < 6) return toast.error("New password too short");

    setSecLoading(true);
    try {
      await axios.post("http://localhost:4001/user/reset-password", {
        email: user.email,
        otp: secOtp,
        newPassword: secNewPassword,
      });
      toast.success("Security updated successfully!");
      setSecStep("init");
      setSecOtp("");
      setSecNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setSecLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("KitUp_User");
    toast.success("See you soon!");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border dark:border-slate-800 sticky top-32">
              <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 bg-lime-400 rounded-[2rem] flex items-center justify-center text-4xl font-black text-black shadow-xl shadow-lime-400/20 mb-4 rotate-3">
                  {user?.name?.[0]}
                </div>
                <h2 className="text-2xl font-black dark:text-white capitalize">{user?.name}</h2>
                <span className="text-[10px] bg-slate-200 dark:bg-slate-800 dark:text-gray-400 px-3 py-1 rounded-full font-bold mt-2">
                  MITAOE STUDENT
                </span>
              </div>

              <nav className="flex flex-col gap-3">
                <TabBtn label="Profile Info" active={activeTab === 'info'} onClick={() => setActiveTab("info")} icon="👤" />
                <TabBtn label="My Listings" active={activeTab === 'seller'} onClick={() => setActiveTab("seller")} icon="📦" />
                <TabBtn label="Security" active={activeTab === 'security'} onClick={() => setActiveTab("security")} icon="🔐" />
                
                <button 
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-3 py-4 px-6 rounded-2xl text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/50"
                >
                  <span>🚪</span> Logout Account
                </button>
              </nav>
            </div>
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-slate-900 min-h-[600px] rounded-[2.5rem] border dark:border-slate-800 p-8 md:p-12 shadow-sm">
              
              {/* Tab 1: Personal Info */}
              {activeTab === "info" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-3xl font-black mb-10 dark:text-white">Profile Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <InfoBox label="Full Name" value={`${user?.name} ${user?.surname || ''}`} />
                    <InfoBox label="Email Address" value={user?.email} />
                    <InfoBox label="WhatsApp Number" value={user?.mobNumber || "Not Linked"} />
                    <InfoBox label="Pickup Point" value={user?.address || "MITAOE Campus"} />
                  </div>
                </div>
              )}

              {/* Tab 2: Seller Listings */}
              {activeTab === "seller" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <h3 className="text-3xl font-black dark:text-white">Active Listings</h3>
                    <button 
                      onClick={() => navigate("/upload-item")} 
                      className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-lime-400/20 transition-all hover:-translate-y-1 active:scale-95"
                    >
                      + Sell New Item
                    </button>
                  </div>

                  {loadingItems ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <span className="loading loading-infinity loading-lg text-lime-400"></span>
                      <p className="text-gray-400 animate-pulse">Syncing your shop...</p>
                    </div>
                  ) : myItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                      {myItems.map((item) => (
                        <div key={item._id} className="bg-gray-50 dark:bg-slate-950 rounded-3xl overflow-hidden border dark:border-slate-800 group">
                          <div className="h-44 overflow-hidden relative">
                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black dark:text-white shadow-sm">
                              ₹{item.price}
                            </div>
                          </div>
                          <div className="p-5">
                            <h5 className="font-bold text-sm truncate dark:text-white mb-1">{item.title}</h5>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">{item.category}</p>
                            <button 
                              onClick={() => handleDeleteItem(item._id)}
                              className="mt-5 w-full py-3 text-[10px] font-black text-red-500 uppercase tracking-widest border border-red-100 dark:border-red-900/30 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            >
                              Remove Item
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 border-4 border-dashed border-gray-50 dark:border-slate-800/50 rounded-[2.5rem]">
                      <p className="text-gray-400 dark:text-gray-500 mb-6 font-medium">You haven't listed anything for sale yet.</p>
                      <button onClick={() => navigate("/upload-item")} className="text-lime-500 font-black text-lg hover:underline decoration-4 underline-offset-8">START EARNING CASH →</button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Security (Password Change) */}
              {activeTab === "security" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md">
                   <h3 className="text-3xl font-black mb-4 dark:text-white">Security</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
                     Update your password via email verification. We'll send a 6-digit code to protect your session.
                   </p>

                   {secStep === "init" ? (
                     <div className="p-10 bg-gray-50 dark:bg-slate-950/50 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-slate-800 text-center">
                       <div className="text-4xl mb-6">🔑</div>
                       <h4 className="font-black dark:text-white text-lg mb-2">Change Password</h4>
                       <p className="text-xs text-gray-400 mb-8 px-6">Access your email <b>{user.email}</b> to receive the OTP code.</p>
                       <button 
                         onClick={handleRequestOTP}
                         disabled={secLoading}
                         className="w-full bg-black dark:bg-white dark:text-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-80 transition-all disabled:opacity-50"
                       >
                         {secLoading ? "Dispatching OTP..." : "Get Verification Code"}
                       </button>
                     </div>
                   ) : (
                     <form onSubmit={handleUpdatePassword} className="space-y-6 p-8 bg-gray-50 dark:bg-slate-950/50 rounded-[2.5rem] border dark:border-slate-800 shadow-xl">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">OTP Code</label>
                          <input 
                            type="text" 
                            placeholder="Enter 6-digit Code"
                            value={secOtp}
                            onChange={(e) => setSecOtp(e.target.value)}
                            className="w-full mt-2 px-5 py-4 rounded-2xl border dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-lime-400 transition-all font-bold dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                          <input 
                            type="password" 
                            placeholder="Minimum 6 characters"
                            value={secNewPassword}
                            onChange={(e) => setSecNewPassword(e.target.value)}
                            className="w-full mt-2 px-5 py-4 rounded-2xl border dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-lime-400 transition-all font-bold dark:text-white"
                            required
                          />
                        </div>
                        <div className="flex gap-4 pt-4">
                           <button 
                            type="button"
                            onClick={() => setSecStep("init")}
                            className="flex-1 py-4 px-6 rounded-2xl text-xs font-black border border-gray-200 dark:border-slate-700 dark:text-white uppercase tracking-widest"
                           >
                             Back
                           </button>
                           <button 
                            type="submit"
                            disabled={secLoading}
                            className="flex-[2] bg-lime-400 text-black py-4 px-6 rounded-2xl text-xs font-black shadow-lg shadow-lime-400/20 uppercase tracking-widest"
                           >
                             {secLoading ? "Saving..." : "Update Pass"}
                           </button>
                        </div>
                     </form>
                   )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Custom Helper: Tab Button
function TabBtn({ label, active, onClick, icon }) {
  return (
    <button 
      onClick={onClick} 
      className={`group flex items-center gap-4 py-4 px-6 rounded-2xl text-sm font-black transition-all ${
        active 
        ? 'bg-lime-400 text-black shadow-xl shadow-lime-400/10 scale-[1.02]' 
        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-gray-400'
      }`}
    >
      <span className={`text-lg ${active ? 'grayscale-0' : 'grayscale'}`}>{icon}</span>
      {label}
    </button>
  );
}

// Custom Helper: Info Display Box
function InfoBox({ label, value }) {
  return (
    <div className="group">
      <label className="text-[10px] font-black text-lime-500 uppercase tracking-[3px] mb-2 block">{label}</label>
      <p className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-gray-50 dark:border-slate-800 pb-2 group-hover:border-lime-400 transition-colors duration-500">{value || "Not Set"}</p>
    </div>
  );
}

export default Profile;