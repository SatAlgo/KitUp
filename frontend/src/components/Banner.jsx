import React from "react";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row">
      <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-24">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-green-500">KitUp</span>
          </h1>
          <p className="text-xl">
          This platform is your one-stop destination for everything a student needs! 
          From second-hand gadgets and notes to assignments and previous year papers, 
          we make it easy for you to find the resources you need to excel in your academics and beyond.
          </p>
          <div className="mt-6 flex flex-col  space-x text-2xl md:text-4xl">
            <h2 className="text-[22px] md:text-[30px] text-purple-300">Here, you can get:</h2>
            <ReactTyped
              className="text-orange-500 font-bold"
              strings={[
                "Gadgets",
                "Assignments",
                "Projects 📽",
                "Assignments",
                "Notes 📝",
                "Previous Year Papers",
              ]}
              typeSpeed={30}
              backSpeed={50}
              loop={true}
            />
          </div>
          {/* <Link to="/signup">
            <button className="mt-12 mr-5 btn btn-secondary">Get Started</button>
          </Link> */}
          <Link to="/TT">
            <button className="mt-12 bg-teal-400 hover:bg-teal-500 text-black btn btn-secondary border-black">Time Table</button>
          </Link>
          <div className="text-xl">
            <span className="text-red-600 text-xl font-semibold">
              Note:{" "}
            </span>
            <br />
            <div className="text-[18px] text-gray-400">The content on the site is regularly updated. Please verify 
              <br/>the details for the most accurate and current information.</div>
          </div>
        </div>
      </div>
      <div className=" order-1 w-full md:w-1/2">
        {/* You can add content her if needed */}
        <img src='/banner.png' className="w-92 h-92 mt-[70px] md:mt-32 " alt="" />
      </div>
    </div>
  );
}

export default Banner;


// git add .
// git commit -m "message"
// git push