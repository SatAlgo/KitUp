import React from "react";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Footer from "../components/Footer";
import Freebook from "../components/Freebook";

function Notes() {
  return (
    <>
      <Navbar />
      <div className="">
      <Freebook />
      </div>
      <div className="min-h-screen">
        <Note />
      </div>
      <Footer />
    </>
  );
}

export default Notes;