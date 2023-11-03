import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import {AdminProvider} from './context/AdminAuth'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <AdminProvider>
   <App />
   </AdminProvider>
  
  

  </BrowserRouter>
);
