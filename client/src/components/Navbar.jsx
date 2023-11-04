import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed w-full z-10">
      <div className="px-5 flex justify-between items-center bg-white shadow-sm text-black h-12">
        <div className="flex font-bold cursor-default select-none">
          <Link to="/">
          <img
            className="h-6 w-5 mx-2 my-auto"
            src="https://gujhome.gujarat.gov.in/portal/images/Home/gujaratpolice.png"
            alt=""
          />
          </Link>
          <p className="my-auto">Gujrat Police</p>
        </div>
        <div className="font-semibold capitalize max-md:hidden">
          <div className="flex justify-center cursor-pointer">
            <Link to="/login" className="mx-3 hover:text-gray-800">
              Admin Login
            </Link>
            <Link to='/admin/dashboard' className="mx-3 hover:text-gray-800 " >Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;