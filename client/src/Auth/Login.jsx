import React, { useState, useContext } from "react";
// import AuthContext from "../../Context/AuthProvider"
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { useAdminAuth } from "../context/AdminAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EcommerceLoginPage() {
  const location = useLocation();
  const Navigate = useNavigate();
  const [adminAuth, setAdminAuth] = useAdminAuth();
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          ...formData,
        }
      );

      if (response) {
        console.log(response.data);
        const { user, token } = response.data;
        setAdminAuth({ ...adminAuth, user, token });
        localStorage.setItem("adminAuth", JSON.stringify(response.data));
        toast.success("Login Successfull");
        Navigate("/Admin/dashboard");
      }
    } catch (err) {
      console.log("Catch", err.response);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("called");
        toast.error(err.response.data.message);
      } else {
        toast.error("Login Failed");
      }
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 max-sm:px-3 border-0 rounded-xl shadow-xl">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="https://gujhome.gujarat.gov.in/portal/images/Home/gujaratpolice.png" // Replace with your logo image path
              alt="E-commerce Logo"
            />
            <h2 className="mt-6 text-center text-3xl max-sm:text-xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-xl shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {<h1 className="text-red-500">{errMsg}</h1>}
            <div className="flex max-xs:flex-col max-sm:items-left items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm max-sm:text-xs text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgotpassword"
                  className="font-medium max-sm:text-xs text-blue-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="border-2 w-full rounded-xl  py-2 mx-auto bg-primary hover:bg-blue-600 text-md text-white font-bold hover:-translate-y-1 duration-200 hover:shadow-xl"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EcommerceLoginPage;
