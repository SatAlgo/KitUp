import React, { useState } from "react";
import Cards from "./Cards";
import list from "../list.json";
import { Link } from "react-router-dom";

function Assignments() {
  // Filter out items with category "PPT" and "PDF"
  const assignFirst = list.filter((item) => item.category === "Asgn1");
  const assignSecond = list.filter((item) => item.category === "Asgn3");

  // State to manage visibility of sections
  const [showFirstSection, setShowFirstSection] = useState(true);
  const [showSecondSection, setShowSecondSection] = useState(false);

  return (
    <>
      <hr />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-6 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Assignments: Your Key to{" "}
            <span className="text-green-400">Academic Success</span>
          </h1>
          <p className="mt-9">
            Here, you'll find a comprehensive collection of assignments designed
            to support your learning and academic journey. Whether you're
            looking for specific topics or need help with different subjects,
            we've got you covered.
          </p>
          <Link to="/">
            <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Go Back
            </button>
          </Link>
        </div>

        <div className="flex justify-center mt-1 space-x-4">
          <button
            className={`mt-6 px-4 py-2 rounded-md duration-300 ${
              showFirstSection
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setShowFirstSection(true);
              setShowSecondSection(false);
            }}
          >
            For First Year
          </button>
          <button
            className={`mt-6 px-4 py-2 rounded-md duration-300 ${
              showSecondSection
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setShowFirstSection(false);
              setShowSecondSection(true);
            }}
          >
            For Second Year
          </button>
        </div>

        {showFirstSection && (
          <>
            <hr className="mt-8" />
            <h1 className="text-2xl md:text-4xl pt-6">
              Assignments for <span className="text-yellow-500">First </span>
              year students :
            </h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
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
              Assignments for <span className="text-yellow-500">Second </span>
              year students :
            </h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              {assignSecond.map((item) => (
                <Cards key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Assignments;
