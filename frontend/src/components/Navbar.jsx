import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenuLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaCar, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://headline-api.onrender.com/user/login");

      setIsAuth(false);
      toast.success("Logout successful", {
        position: "top-center"
      });
      navigate("/headline");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <nav className="bg-gray-900 py-2 px-4 flex flex-row justify-between items-center shadow-md">
        <div className="flex items-center">
          <Link to="/" className="ml-4 text-center">
            <div className="flex items-center">
              <h1 className="text-white ml-2 text-xl font-semibold">
                Newspaper
              </h1>
            </div>
          </Link>
        </div>
        <div className="sm:hidden relative">
          <button onClick={toggleMenu} className="text-orange-300">
            {isOpen ? (
              <IoClose className="h-7 w-7" />
            ) : (
              <RiMenuLine className="h-7 w-7" />
            )}
          </button>
          {isOpen && (
            <div className="absolute right-0 top-12 bg-gray-900 text-white p-2">
              <Link
                to="/headline"
                className="block text-white p-2 flex items-center"
              >
                <FaCar className="mr-2 text-orange-300 text-2xl" />
              </Link>

              {!isAuth ? (
                <Link
                  to="/signin"
                  className="block text-white p-2 flex items-center"
                >
                  <FaSignOutAlt className="mr-2 text-orange-300 text-2xl" />
                </Link>
              ) : (
                <button
                  className="bg-[#282c34] text-orange-400 hover:bg-orange-300 hover:text-black"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
        <div className={`hidden sm:flex justify-center bg-gray-900`}>
          <Link
            to="/headline"
            className="text-orange-400 hover:text-orange-300 ml-4"
          >
            Headline
          </Link>
          {!isAuth ? (
            <Link
              to="/signin"
              className="text-orange-400 hover:text-orange-300 ml-4"
            >
              Signup/Login
            </Link>
          ) : (
            <button
              className="text-orange-400 hover:text-orange-300 ml-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
