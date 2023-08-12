import React, { useState } from "react";

import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../Redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import api from "../utils/api";
import { loginRedux } from "../Redux/userSlice";

const Header = () => {
  const [showmenu, setmenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const adminID = process.env.REACT_APP_ADMIN_EMAIL;
  const Navigate = useNavigate();

  //  console.log(userData);
  const dispatch = useDispatch();

  const handleshowmenu = () => {
    setmenu((prev) => !prev);
    console.log(userData.email);
    console.log(adminID);
  };
  const logoutClick = () => {
    dispatch(logoutRedux());
    toast("logout successfully");
    localStorage.removeItem("token");
    Navigate("/");
  };

  useEffect(() => {
    // Check for token and fetch user data
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.post(
            `${api}/api/auth/getuser`,
            {},
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                authtoken: token,
              },
            }
          );
          const json = await response.data;
          dispatch(loginRedux(json)); // Assuming this action updates the user state
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserData();
    }
  }, [dispatch]);
  const cardItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className=" shadow-md w-full h-16 px-2">
      <div className=" flex  justify-between  items-center h-full ">
        <Link to="/">
          <div className="text-black w-32 h-12 font-bold text-3xl">
            {" "}
            e-Pasal{" "}
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
         
          <div className=" cursor-pointer " onClick={handleshowmenu}>
            <div className="relative text-2xl text-slate-600 h-10 w-10 p-2 rounded-full overflow-hidden border border-black ">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt="user pic"
                  className="h-full w-full"
                />
              ) : (
                <FaUserAlt />
              )}
            </div>
            {showmenu && (
              <div className=" px-3 py-3 w-48 bg-white  text-center shadow-md absolute top-12 right-0 flex flex-col gap-3">
                {/* {userData.email === adminID && (<Link to="/NewProduct" className='whitespace-nowrap'>New Product</Link>)} */}

                {userData.image ? (
                  <button
                    className=" whitespace-nowrap rounded-sm p-1 my-1"
                    onClick={logoutClick}
                  >
                    {" "}
                    Logout {userData.first_name}
                  </button>
                ) : (
                  <Link to="/" className="whitespace-nowrap">
                    {" "}
                    Login
                  </Link>
                )}
               
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
