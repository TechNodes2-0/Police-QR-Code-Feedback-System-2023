import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/core/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import {useAdminAuth} from "../context/AdminAuth"
function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const[adminAuth, setAdminAuth]=useAdminAuth();
  const handleLogout=()=>{
    setAdminAuth({
      ... adminAuth,
      user:null,
      token:''
    });
    localStorage.removeItem("adminAuth");
    console.log("logout successfully")

  }
  return (
    <div className="">
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
      </div>
  );
}

export default DefaultLayout;
