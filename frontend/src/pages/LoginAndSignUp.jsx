import React, { useState } from "react";
import { FaRocket } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios library

function LoginAndSignUp() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [userDetails, setDetails] = useState({
    full_name: "",
    email: "",
    password: ""
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const isAllPresent = (str) => {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    if (!str || str.length === 0) {
      return false;
    }

    return pattern.test(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignIn) {
      // Handle Login
      if (!userDetails.password) {
        return toast.error("Please fill the password");
      } else if (!userDetails.email) {
        return toast.error("Please fill the email");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/user/login",
            userDetails
          );

          // Handle successful login
          toast.success("Login successful", {
            position: "top-center"
          });
          console.log("headline")
          navigate("/headline"); // Redirect to /headline after login
        } catch (error) {
          // Handle login error
          toast.error("Login failed. Please check your credentials.");
        }
      }
    } else {
      // Handle Sign Up
      if (isAllPresent(userDetails.password)) {
        if (userDetails.full_name && userDetails.email) {
          try {
            const response = await axios.post(
              "http://localhost:8080/user/signup",
              userDetails
            );

            // Handle successful signup
            toast.success("Successfully Registered user", {
              position: "top-center"
            });
            handleToggleSignIn(true);
          } catch (error) {
            // Handle signup error
            toast.error("Signup failed. Please try again.");
          }
        } else {
          return toast.error("Please fill all the details", {
            position: "top"
          });
        }
      } else {
        return toast.error("Please recheck your password", {
          position: "top"
        });
      }
    }
  };

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0"></div>
        <div className="bg-[#0A0A23] w-96 p-4 rounded-lg shadow-lg z-50 text-white relative">
          <button className="absolute top-2 right-2 text-gray-300 hover:text-white">
            <IoCloseSharp className="text-3x" />
          </button>
          <div className="text-center mb-4">
            <FaRocket className="text-4xl mb-2 text-blue-500" />
            <h2 className="text-2xl font-semibold">
              {isSignIn ? "Login" : "Sign Up"}
            </h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            {!isSignIn && (
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="full_name"
                  className="w-full p-2 border-none focus:border-none focus:bg-back focus:bg-opacity-40 focus:backdrop-blur-lg rounded-md bg-black bg-opacity-40 backdrop-blur-lg"
                  placeholder="Your full name"
                  onChange={(e) => handleFormInput(e)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border-none focus:border-none rounded-md bg-black bg-opacity-40 backdrop-blur-lg"
                placeholder="Your email"
                onChange={(e) => handleFormInput(e)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-2 border-none rounded-md bg-black bg-opacity-40 backdrop-blur-lg"
                placeholder="Your password"
                onChange={(e) => handleFormInput(e)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <button
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
            <p className="text-xs mb-4">
              **Password should include an uppercase and lowercase alphabet, a
              number and a special character.
            </p>
            <div className="flex justify-end">
              <button
                loadingText="Submitting"
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-full"
                // isLoading={isLoading}
              >
                {isSignIn ? "Login" : "Sign Up"}
              </button>
            </div>
            <div className="mt-4 text-center">
              {isSignIn ? (
                <div>
                  <p>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-500 hover:underline"
                      onClick={handleToggleSignIn}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={handleToggleSignIn}
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginAndSignUp;
