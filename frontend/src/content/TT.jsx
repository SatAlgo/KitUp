
import React from "react";
import Navbar from "../components/Navbar";
import Timetable from "../components/Timetable";
import TableTT from "../components/TableTT";
import Footer from "../components/Footer";

function TT() {
    return (
        <>
            <Navbar />
            <Timetable />
            <TableTT/>
            <Footer />
        </>
    );
}

export default TT;
