import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const changeToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="fixed w-full z-10">
      <div className="px-5 flex justify-between items-center bg-white shadow-sm text-black h-12">
        <div className="flex font-bold cursor-default select-none">
          <Link to="/">
          <img
            className="h-5 w-5 mx-2 my-auto"
            src="https://img.icons8.com/?size=512&id=104233&format=png"
            alt=""
          />
          </Link>
          <p className="my-auto">Gujrat Police</p>
        </div>
        <div className="font-semibold capitalize max-md:hidden">
          <div className="flex justify-center cursor-pointer">
            <Link to="/" className="mx-3 hover:text-gray-800">
              Home
            </Link>
            <a to="/about" className="mx-3 hover:text-gray-800">
              about
            </a>
            <a to="/contact" className="mx-3 hover:text-gray-800 ">
            contact us
            </a>
            <div className="mx-3 hover:text-gray-800 ">Dashboard</div>
          </div>
        </div>
        <div className="relative flex">
          <div className="md:hidden my-auto">
            <button
              onClick={changeToggle}
              className="border border-gray-600 rounded-lg h-8 w-8 p-1 mx-2 transition duration-200 hover:scale-110"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#607D8B"
                  d="M6 22H42V26H6zM6 10H42V14H6zM6 34H42V38H6z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="my-auto py-1 px-3 border-0 rounded-lg transition duration-300 hover:bg-gray-400 bg-gray-300">
            <p className="">Login</p>
          </div>
        </div>
      </div>
      {toggle && (
        <div className="absolute w-full bg-gray-100 text-black font-semibold md:hidden py-5">
          <div className="capitalize flex flex-col">
            <Link to="/" className="px-3 py-1 hover:text-gray-900 hover:bg-gray-300">
              Home
            </Link>
            <a to="/about" className="px-3 py-1 hover:text-gray-900 hover:bg-gray-300">
              about{" "}
            </a>
            <Link to="/contact" className="px-3 py-1 hover:text-gray-900 hover:bg-gray-300">contact us</Link>
            <div className="px-3 py-1 hover:text-gray-900 hover:bg-gray-300">Dashboard</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;