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
      <div className="py-2 relative right-0 w-full flex justify-end px-5">
        <button  onClick={handleLogout} className="border-0 rounded-lg py-1 px-3 translate transition duration-200 bg-blue-2 hover:bg-blue-3 hover:shadow-xl text-white font-bold">
          logout
        </button>
      </div>
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
