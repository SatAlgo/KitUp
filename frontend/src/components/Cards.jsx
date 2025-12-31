import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

function Cards({ item }) {
    return (

        <>
            <div className="mt-4 my-3 p-3">
                <div className="card w-92 h-[420px] shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure>
                        <img src={item.image} alt={item.title} />
                    </figure>
                    <div className="card-body p-5">
                        <h2 className="card-title justify-between text-violet-500">
                            {item.name}
                            <div
                                className={`badge ${item.category === 'For Sale'
                                    ? 'bg-lime-400 text-black'
                                    : item.category === 'Flex'
                                        ? 'bg-rose-400 text-black'
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
                        <div className="card-actions justify-between">

                            {item.category === 'For Sale' && (
                                <div className="px-2 py-3 badge badge-outline">Rs. {item.price}</div>
                            )}
                            {item.category === 'For Sale' && (
                                <a
                                    href={`https://wa.me/${item.contact}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer px-3 py-3 rounded-full border-[1px] badge badge-outline hover:bg-green-500 hover:text-white duration-200"
                                >
                                    Buy Now
                                    <FaWhatsapp className="h-5 w-5 pl-1 text-green-600 hover:text-green-800 transition-all duration-200" />

                                </a>
                            )}

                            {/* {item.category === 'Flex' && (
                                <a
                                    href={`tel:${item.contact}`}
                                    className="cursor-pointer px-2 py-1 rounded-full border-[1px] badge badge-outline hover:bg-green-600 hover:text-white duration-200"
                                >
                                    Contact: 7822099563
                                </a>
                            )} */}

                            {item.category === 'Flex' && (
                                <a
                                    href={`tel:${item.contact}`}
                                    className="cursor-pointer flex items-center  hover:scale-110 transition-all duration-200"
                                >

                                    <FaPhoneAlt className="h-5 w-5 text-green-600 hover:text-green-500 transition-all duration-200" />

                                </a>
                            )}

                            {/* {item.category === 'For Sale' && (
                                <a
                                    href={`https://wa.me/${item.contact}`}
                                    className="cursor-pointer flex items-between hover:scale-110 transition-all duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaWhatsapp className="h-6 w-6 text-green-600 hover:text-green-500 transition-all duration-200" />
                                </a>
                            )} */}



                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards
