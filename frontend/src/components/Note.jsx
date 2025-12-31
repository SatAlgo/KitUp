import React, { useState } from "react";
import Cards from "./Cards";
import list from "../list.json";
import { Link } from "react-router-dom";

function Note() {
  // Filter out items with category "PPT" and "PDF"
  const assignFirst = list.filter((item) => item.category === "Notes1");
  const assignSecond = list.filter((item) => item.category === "Notes2");

  // State to manage visibility of sections
  const [showFirstSection, setShowFirstSection] = useState(true);
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [showSamplePapers, setShowSamplePapers] = useState(false);

  return (
    <>
      <hr />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-6 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Notes: Your Key to{" "}
            <span className="text-green-400">Academic Success</span>
          </h1>
          <p className="mt-6">
            Here, you'll find a comprehensive collection of Note designed
            to support your learning and academic journey. Whether you're
            looking for specific topics or need help with different subjects,
            we've got you covered.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Go Back
            </button>
          </Link>
        </div>

        {/* Button Container with uniform button sizes */}
        <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <button
            className={`w-full md:w-48 px-4 py-2 rounded-md duration-300 ${
              showFirstSection
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setShowFirstSection(true);
              setShowSecondSection(false);
              setShowSamplePapers(false);
            }}
          >
            For First Year
          </button>
          <button
            className={`w-full md:w-48 px-4 py-2 rounded-md duration-300 ${
              showSecondSection
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setShowFirstSection(false);
              setShowSecondSection(true);
              setShowSamplePapers(false);
            }}
          >
            For Second Year
          </button>
          <button
            className={`w-full md:w-48 px-4 py-2 rounded-md duration-300 ${
              showSamplePapers
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setShowFirstSection(false);
              setShowSecondSection(false);
              setShowSamplePapers(!showSamplePapers);
            }}
          >
            Previous Year Papers
          </button>
        </div>

        {showFirstSection && (
          <>
            <hr className="mt-8" />
            <h1 className="text-2xl md:text-4xl pt-6">
              Notes for <span className="text-yellow-400">First </span>
              year :
            </h1>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4">
              {assignFirst.map((item) => (
                <Cards key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {showSecondSection && (
          <>
            <hr className="mt-8" />
            <h1 className="text-2xl md:text-4xl pt-6">
              Notes for <span className="text-yellow-500">Second </span>
              year :
            </h1>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4">
              {assignSecond.map((item) => (
                <Cards key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {showSamplePapers && (
          <div className="mt-12 p-4 border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold">Sample Papers</h2>
            <p className="mt-4">
              Here you'll find a collection of sample papers to help you
              understand the format and content expected in your exams.
              <br />
              Use these papers as a reference to improve your own work and gain
              insights into how to approach various topics.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Note;