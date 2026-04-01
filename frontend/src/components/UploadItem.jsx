import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiCheckCircle, FiX } from "react-icons/fi"; // Install react-icons

function UploadItem() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("KitUp_User"));
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    title: "", description: "", price: "",
    category: "Academic Books", condition: "Gently Used",
    pickupPoint: "", isNegotiable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 4) {
      return toast.error("Max 4 images allowed");
    }
    
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);

    // Generate previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const setAsCover = (index) => {
    // Move the selected image to index 0 (The Cover)
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...previews];
    
    const [file] = updatedFiles.splice(index, 1);
    const [prev] = updatedPreviews.splice(index, 1);
    
    updatedFiles.unshift(file);
    updatedPreviews.unshift(prev);
    
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
    toast.success("Cover image updated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return toast.error("Add at least one image");

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append("seller", user._id);
    selectedFiles.forEach(file => data.append("images", file));

    try {
      const load = toast.loading("Posting...");
      await axios.post("http://localhost:4001/item/add", data);
      toast.dismiss(load);
      toast.success("Listed!");
      navigate("/profile");
    } catch (err) {
      toast.dismiss();
      toast.error("Upload failed");
    }
  };

  return (
    <div className="h-screen bg-white dark:bg-slate-950 md:pt-20 flex flex-col overflow-hidden">
      <Toaster />
      
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 overflow-y-auto no-scrollbar">
        <header className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">List an Item</h2>
          <span className="text-xs text-gray-400 font-medium">Step 1 of 1</span>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <input name="title" placeholder="Title (e.g. Lab Coat)" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 dark:text-white text-sm" onChange={handleChange} required />
              
              <div className="flex gap-2">
                <input name="price" type="number" placeholder="Price ₹" className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 dark:text-white text-sm" onChange={handleChange} required />
                <div className="flex items-center gap-2 px-3 bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 rounded-xl">
                    <input name="isNegotiable" type="checkbox" className="w-4 h-4 accent-lime-400" onChange={handleChange} />
                    <label className="text-[10px] uppercase font-bold text-gray-500">Negotiable</label>
                </div>
              </div>

              <select name="category" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 dark:text-white text-sm" onChange={handleChange}>
                <option value="Academic Books">Academic Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Hostel Essentials">Hostel Essentials</option>
                <option value="Lab Gear">Lab Gear</option>
              </select>
            </div>

            <div className="space-y-4">
              <select name="condition" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 dark:text-white text-sm" onChange={handleChange}>
                <option value="Brand New">Brand New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Well Used">Well Used</option>
              </select>
              <input name="pickupPoint" placeholder="Pickup (e.g. Hostel A)" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 dark:text-white text-sm" onChange={handleChange} required />
              <textarea name="description" placeholder="Short description..." rows="1" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border dark:border-slate-800 dark:text-white text-sm" onChange={handleChange} required></textarea>
            </div>
          </div>

          {/* Image Upload Area at the End */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Images ({selectedFiles.length}/4)</label>
               {selectedFiles.length > 0 && <span className="text-[10px] text-lime-500 font-bold">First image is Cover</span>}
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {/* Add Button */}
              {selectedFiles.length < 4 && (
                <label className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 transition">
                  <FiCamera className="text-gray-400 text-xl" />
                  <span className="text-[10px] text-gray-400 mt-1">Add Photo</span>
                  <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
                </label>
              )}

              {/* Previews */}
              {previews.map((src, index) => (
                <div key={index} className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden relative border-2 ${index === 0 ? 'border-lime-400' : 'border-transparent'}`}>
                  <img src={src} alt="preview" className="w-full h-full object-cover" />
                  
                  {/* Delete Button */}
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full text-xs">
                    <FiX />
                  </button>

                  {/* Set Cover Button */}
                  <button 
                    type="button" 
                    title="Set as cover image"
                    onClick={() => setAsCover(index)} 
                    className={`absolute bottom-1 right-1 p-1 rounded-full shadow-md transition ${index === 0 ? 'bg-lime-400 text-black' : 'bg-white text-gray-400'}`}
                  >
                    <FiCheckCircle size={14} />
                  </button>

                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-lime-400 text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase">Cover</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-lime-400/20 active:scale-95">
            Post Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadItem;