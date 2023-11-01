import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/Error/NotFound";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
