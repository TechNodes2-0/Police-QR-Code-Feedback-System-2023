import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import {AdminProvider} from './context/AdminAuth'
import { AuthProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <AdminProvider>
    <AuthProvider>   <App /></AuthProvider>

   </AdminProvider>
  
  

  </BrowserRouter>
);
