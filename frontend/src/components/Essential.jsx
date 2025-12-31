import React, { useState } from "react";
import Iteam from "./Iteam";
import list from "../list.json";
import { Link } from "react-router-dom";

function Essetials(){

  const paidItems = list.filter((item) => item.category === "NEW");

  return (
    <>
      <hr />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-8 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            "What's <span className="text-pink-500">Trending </span>: Top Picks
            & Special Offers"
          </h1>
          <p className="mt-12 mb-3">
            Welcome to the Trending page! Discover the latest and most popular
            items and deals right here. From essential resources to exclusive
            promotions, stay updated with what's currently in demand. Explore
            top picks and special offers tailored to enhance your college
            experience. Whether you're looking for academic support or great
            deals, find out what's trending now.
          </p>
          <Link to="/">
            <button className="mb-6 mr-3 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Go Back
            </button>
          </Link>
          <Link to="/Tools">
            <button className="mt-6 ml-3 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 duration-300">
              Tools
            </button>
          </Link>
          <hr />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {list.map((item) => (
            <Iteam key={item.id} item={item} />
          ))}
        </div>
      </div>


      
      
    </>
  );
}

export default Essetials;