import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import "./App.css";
import NotFound from "./pages/Error/NotFound";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Loader from "../src/components/common/index";
import ECommerce from "./pages/Dashboard/ECommerce";
import DefaultLayout from "./layout/DefaultLayout";
import Form from "./pages/Forms/Form";
import QRCodeGenerator from "./test/QRCodeGenerator";
import FeedbackForm from "./components/core/Form/FeedbackForm";
import PhoneAuth from "./components/core/Form/PhoneAuth";
import AdminRoutes from "./components/Routes/AdminRoutes";
import AdminProfile from "./Admin/AdminProfile";
import Table from "./components/Table";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    alanBtn({
      key: "e00326f4c695631a53845e284342e9622e956eca572e1d8b807a3e2338fdd0dc/testing",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex min-h-screen w-screen flex-col bg-[#E0F2FE] font-inter">
      {/* <PhoneAuth/> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/feedback" element={<FeedbackForm />}></Route>
        <Route path="/feedback-portal/:qrCodeId" element={<PhoneAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/QRCode-Generator" element={<QRCodeGenerator />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<DefaultLayout />}>
            <Route index element={<ECommerce />} />
            <Route path="profile" element={<AdminProfile />}></Route>
            <Route path="Table" element={<Table />}></Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
