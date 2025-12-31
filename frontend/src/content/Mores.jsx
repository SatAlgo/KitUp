import React from "react";
import Navbar from "../components/Navbar";
import Freebook from "../components/Freebook";
import More from "../components/More";
import Footer from "../components/Footer";


function Mores() {
  return (
    <>
      <Navbar />
      <div className="">
      <Freebook />
      </div>
      <div className="min-h-screen">
        <More />
      </div>     
      <Footer />
    </>
  );
}

export default Mores;