import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Admin from "./adminpage.js";
import Detail from "./detailpage.js";

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/detail" element={<Detail />} />
        </Routes>
    );
};

export default Main;
