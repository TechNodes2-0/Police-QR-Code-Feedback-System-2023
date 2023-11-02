import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NotFound from "./pages/Error/NotFound";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import Form from "./pages/Forms/Form";
import QRCodeGenerator from "./test/QRCodeGenerator";
import PhoneAuth from "./PhoneAuth";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCbxIXw-pXevk9nmq2MEonu86uemZCjvCk",
    authDomain: "policefeedbacksystem-5e031.firebaseapp.com",
    projectId: "policefeedbacksystem-5e031",
    storageBucket: "policefeedbacksystem-5e031.appspot.com",
    messagingSenderId: "641111786552",
    appId: "1:641111786552:web:80f40c0c4098317280d2cd",
    measurementId: "G-1MPYYGTN5S"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      {/* <PhoneAuth/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form" element={<PhoneAuth />} />
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
