import React from "react";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Companies from "./components/companies/Companies";


import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        
        <>
        <Header />
        <Routes>
            <Route path="/"  element={<Home />}  />
            <Route path="/companies" element={<Companies />} />
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>

    </>
     
    )
}