import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/Error/NotFound";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Form from "./pages/Forms/Form";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
