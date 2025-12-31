import React from "react";
import Navbar from "../Navbar";
import Freebook from "../Freebook";
import Essential from "../Essential";
import Footer from "../Footer";
import Tools from "../Tools";

function Essentials() {
    return (
        <>

            <Navbar />
            <Freebook />
            <div className="min-h-screen">
                <Essential />
            </div>
            <Tools />
            <Footer />
        </>
    );
}

export default Essentials;