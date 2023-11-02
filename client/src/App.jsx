import React ,{useState,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NotFound from "./pages/Error/NotFound";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';

import Form from "./pages/Forms/Form";
import QRCodeGenerator from "./test/QRCodeGenerator";
import { onAuthStateChanged, signOut,getAuth } from "firebase/auth";
import FeedbackForm from "./components/core/Form/FeedbackForm";
import PhoneAuth from "./components/core/Form/PhoneAuth";
import Login from "./pages/Login/login";
import Admin from "./pages/Admin/Admin";
import DefaultLayout from "./layout/DefaultLayout";
import ECommerce from "./pages/Dashboard/ECommerce";
function App() {

 
  

  return (
    <div className="flex min-h-screen w-screen flex-col bg-blue-100 font-inter">
      {/* <PhoneAuth/> */}
     
     
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/feedback" element={<FeedbackForm/>} ></Route>
        <Route path="/" element={<PhoneAuth />} />
        <Route path="/login" element={<Login/>} />
        {/*Don't Touch this Route*/}
        <Route path="/dashboard" element={<DefaultLayout />} />
        {/* ------------Test--------- */}
        <Route path="/test">
          <Route index element={<QRCodeGenerator />} />
        </Route>
        {/* ------------Test End--------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
