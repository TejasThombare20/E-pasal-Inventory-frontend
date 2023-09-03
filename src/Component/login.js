import React, { useState } from "react";
import loginGif from "../assets/login-animation.gif";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { loginRedux } from "../Redux/userSlice";
import { useEffect } from "react";
import api from "../utils/api.js";
import Loader from "../Loader";
import GoogleLogin from "./GoogleLogin";
import { setAuthToken } from "../Redux/tokenSlice";

const Login = () => {
  let Navigate = useNavigate();
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleShowFunc = () => {
    setShowPass((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        `${api}/api/auth/getuser`,
        {},
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("token"),
          },
        }
      );
      const json = await response.data;
      // console.log("data :",json);
      dispatch(loginRedux(json));
      // console.log("userData", userData)
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    // console.log("userData", userData);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${api}/api/auth/login`,
        JSON.stringify({ email: info.email, password: info.password }),
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.data;
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        dispatch(setAuthToken(json.authtoken));
        fetchUserData();
        toast("Successfully logged in");
        setTimeout(() => {
          Navigate("/NewProduct");
        }, 1000);
      } else {
        toast("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const [accessToken, setAccessToken] = useState("");

  const handleLoginSuccess = (response) => {
    // Get the access token from the response
    const accessToken = response.accessToken;
    setAccessToken(accessToken);
  };
  const handleLoginFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100">
      <div className="p-3 md:p-5">
        <div className=" flex flex-col item justify-center items-center p-4 ">
          <div className="w-28 overflow-hidden rounded-full drop-shadow-lg shadow-lg my-2 ">
            <img src={loginGif} className="w-full" alt=" login logo" />
          </div>
          {/* form */}
          <div className=" bg-slate-50 rounded-md  flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
            <div className="  mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={info.email}
                      type="email"
                      onChange={handleOnChange}
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="/"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2  flex w-full justify-between items-center rounded-md border-gray-200  border-2  shadow-sm py-1 outline-gray-200 outline-[0.5px] outline focus-within:outline-indigo-700 focus-within:outline-2  sm:text-sm sm:leading-6">
                    <input
                      id="password"
                      name="password"
                      value={info.password}
                      type={showPass ? "password" : "text"}
                      onChange={handleOnChange}
                      autoComplete="current-password"
                      required
                      className=" block text-gray-900 pl-2 border-none outline-none placeholder:text-gray-400  "
                    />
                    <div
                      className="flex flex-col mr-1 cursor-pointer"
                      onClick={handleShowFunc}
                    >
                      {showPass ? <BiSolidShow /> : <BiSolidHide />}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    login
                  </button>
                </div>
                <p>
                  don't have a account ?{" "}
                  <Link to="/Signup" className="text-blue-600 hover:underline">
                    Signup
                  </Link>
                </p>
              </form>
              <div>
                <h1>Google Login Example</h1>
                {accessToken ? (
                  <div>
                    <p>Access Token: {accessToken}</p>
                    {/* Call your backend API with the obtained access token */}
                  </div>
                ) : (
                  <GoogleLogin
                    onLoginSuccess={handleLoginSuccess}
                    onLoginFailure={handleLoginFailure}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Login;
