import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import NotFound from "./pages/Error/NotFound";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import Loader from "../src/components/common/index";
import { Toaster } from "react-hot-toast";
import ECommerce from "./pages/Dashboard/ECommerce";
import DefaultLayout from "./layout/DefaultLayout";

import Form from "./pages/Forms/Form";
import QRCodeGenerator from "./test/QRCodeGenerator";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import FeedbackForm from "./components/core/Form/FeedbackForm";
import PhoneAuth from "./components/core/Form/PhoneAuth";
import Login from "./pages/Login/login";
<<<<<<< HEAD
import Map from "./pages/map/Map";
=======
import Admin from "./pages/Admin/Admin";
>>>>>>> 8d62af7f27833c8bb9479c4720ccc012ba13a400

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex min-h-screen w-screen flex-col bg-blue-100 font-inter">
      {/* <PhoneAuth/> */}

      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/feedback" element={<FeedbackForm />}></Route>
        <Route path="/" element={<PhoneAuth />} />
<<<<<<< HEAD
        <Route path="/login" element={<Login/>} />
        <Route path="/map" element={<Map/>} />
=======
        <Route path="/login" element={<Login />} />
        {/*Don't Touch this Route*/}
        
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
        </Route>

>>>>>>> 8d62af7f27833c8bb9479c4720ccc012ba13a400
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
