import React, { useState, useEffect } from 'react';

function Cards({ item }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Image rotation logic for multiple images
    useEffect(() => {
        if (item.images && item.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [item.images]);

    return (
        <div className="h-full">
            {/* Main Card Container */}
            <div className="group relative flex flex-col w-full h-[520px] dark:bg-slate-900 dark:text-white hover:border-lime-400 transition-all duration-300 shadow-2xl overflow-hidden">
                
                {/* 1. IMAGE SECTION (Fixed Height) */}
                <div className="relative h-64 w-full overflow-hidden bg-[#050811]">
                    <img 
                        src={item.images?.[currentImageIndex] || item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* TOP LEFT: Negotiable Tag */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className={`text-[10px] font-black px-2 py-1 border backdrop-blur-md uppercase tracking-widest ${
                            item.isNegotiable 
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                            : 'border-red-500 bg-red-500/10 text-red-500'
                        }`}>
                            {item.isNegotiable ? "Negotiable" : "Fixed Price"}
                        </span>
                    </div>

                    {/* TOP RIGHT: Condition Tag */}
                    <div className="absolute top-3 right-3 z-10">
                        <div className="bg-[#b4f481] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-tighter shadow-lg">
                            {item.condition || "Used"}
                        </div>
                    </div>
                </div>

                {/* 2. CONTENT SECTION (Fixed Height/Flex Grow) */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Title - Normal Casing */}
                    <h2 className="text-2xl font-bold text-white leading-tight mb-3 line-clamp-1 group-hover:text-lime-400 transition-colors">
                        {item.title}
                    </h2>

                    {/* Description - Normal style (not italic/tilted) */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 font-medium mb-4">
                        {item.description}
                    </p>

                    {/* 3. FOOTER SECTION (Pinned to Bottom) */}
                    <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase font-black tracking-[2px]">Value</span>
                            <span className="text-3xl font-black text-white">₹{item.price}</span>
                        </div>
                        
                        {/* Hovering Buy/View Button */}
                        <div className="bg-white text-black h-12 px-6 flex items-center justify-center font-black text-xs uppercase tracking-widest group-hover:bg-[#b4f481] transition-all duration-300 transform group-hover:translate-y-[-2px]">
                            Buy Now
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;