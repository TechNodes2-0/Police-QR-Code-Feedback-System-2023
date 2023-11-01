import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/Error/NotFound";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Form from "./pages/Forms/Form";
import QRCodeGenerator from "./test/QRCodeGenerator";
function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        {/* ------------Test--------- */}
        <Route path="/test">
          <Route index element={<QRCodeGenerator />} />
        </Route>
        {/* ------------Test End--------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
