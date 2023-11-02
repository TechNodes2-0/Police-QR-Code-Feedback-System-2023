import React from "react";
import login from "../../assets/login.png";

function Login() {
  return (
    <div className="flex justify-center items-center bg-blue-100 text-black min-h-screen py-20 ">
      <div className="flex justify-around items-center max-w-5xl">
        <div className="flex flex-col bg-white shadow-xl p-5 border-0 rounded-xl">
          <div className="mx-auto mb-8">
            <img
              className="w-20 h-20"
              src="https://img.icons8.com/?size=512&id=108652&format=png"
              alt=""
            />
            <p className="text-center font-bold text-2xl">LogIn</p>
          </div>
          <form className=" sm:w-96 ">
            <label
              htmlFor="email-address-icon"
              className="block mb-2 font-semibold text-base"
            >
              Your Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="text"
                name="email"
                value=""
                onChange=""
                id="email-address-icon"
                className=" border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-100 border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@mail.com"
              />
            </div>

            <div className="mt-5">
              <div>
                <label
                  className="block mb-2 font-semibold text-base"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-500"
                      fill="gray"
                      viewBox="0 0 50 50"
                    >
                      <path d="M42,21H8c-1.654,0-3,1.346-3,3v23c0,1.654,1.346,3,3,3h34c1.654,0,3-1.346,3-3V24C45,22.346,43.654,21,42,21z M13,38 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C15,37.105,14.105,38,13,38z M21,38c-1.105,0-2-0.895-2-2 c0-1.105,0.895-2,2-2s2,0.895,2,2C23,37.105,22.105,38,21,38z M29,38c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2 C31,37.105,30.105,38,29,38z M37,38c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C39,37.105,38.105,38,37,38z M12,19v-4.01 C12,7.827,17.827,2,24.99,2h0.02C32.173,2,38,7.827,38,14.99V19h-2v-4.01C36,8.93,31.069,4,25.01,4h-0.02C18.931,4,14,8.93,14,14.99 V19H12z"></path>
                    </svg>
                  </div>
                  <input
                    className="text-black border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-100 border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                    id="password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 ">
              <div className="flex flex-col my-5">
                <button
                  type="submit"
                  onClick=""
                  className="text-white my-1 bg-blue-800 py-2 px-4 text-sm font-semibold border-0 rounded-md   hover:bg-blue-900"
                >
                  <span className="">SignUp</span>
                </button>
                <p className="text-xs">Already have account?</p>
                <button
                  type="submit"
                  onClick=""
                  className="text-white my-1 bg-blue-800 py-2 px-4 text-sm font-semibold border-0 rounded-md   hover:bg-blue-900"
                >
                  <span className="">LogIn</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;