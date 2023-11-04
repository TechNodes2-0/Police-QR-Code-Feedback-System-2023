import React from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/core/Home/HeroSection";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <HeroSection />
      <Footer/>
    </div>
  );
}
