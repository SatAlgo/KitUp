import React, { useState } from 'react';

function Cards({ item }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className="mt-4 my-3 p-[2px]">
                <div className="card w-92 h-[420px] shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure>
                        <img
                            src={item.image}
                            alt={item.title}
                            onClick={() => openModal(item.image)}
                            className="cursor-pointer"
                        />
                    </figure>
                    <div className="card-body p-5">
                        <h2 className="card-title justify-between">
                            {item.name}
                            {/* <div className="badge badge-secondary">{item.category}</div> */}

                            <div
                                className={`badge ${item.category === 'For Sale'
                                    ? 'bg-lime-400 text-black'
                                    : item.category === 'Fashion'
                                        ? 'bg-green-500 text-white'
                                        : item.category === 'Books'
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-500 text-white'
                                    } rounded-md`}
                            >
                                {item.category}
                            </div>
                        </h2>
                        <p className="text-left text-[12px]">{item.description}</p>
                        <div className="card-actions justify-center">
                            {/* <div className="badge badge-outline">Rs. {item.price}</div> */}
                            {item.category === 'For Sale' && (
                                <div className="px-3 py-3 badge badge-outline">Rs. {item.price}</div>
                            )}
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer px-3 py-3 rounded-full border-[1px] badge badge-outline bg-green-500 hover:bg-green-600 hover:text-white duration-200"
                            >
                                Check
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white p-4 rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-1 right-1 px-1 text-xl font-bold dark:bg-slate-900 dark:text-white rounded-full"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full max-w-lg rounded-md"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Cards;
