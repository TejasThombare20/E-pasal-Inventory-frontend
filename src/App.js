import "./App.css";
import Header from "./Component/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewProduct from "./Component/NewProduct";
import Signup from "./Component/SignUp";
import Login from "./Component/login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  setProductReducer } from "./Redux/productSlice";
import api from "./utils/api";
import ProductList from "./Component/Productlist";
import Modal from "./Component/Modal";
import Category from "./Component/Category";
import { fetchCategories } from "./Redux/categorySlice";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  console.log(productData);

  useEffect(() => {
    (async () => {
      try {
        console.log("fetch all products");
        const response = await axios.get(`${api}/api/product/fetchAllProduct`, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
        console.log("fetch all products2");
        const responseData = response.data;
        
        dispatch(setProductReducer(response.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories()); // Dispatch the async action to fetch categories
  }, [dispatch]);

  return (
    <div>
      <>
        <Router>
          <Toaster />
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/NewProduct" element={<NewProduct />} />
            <Route exact path="/Signup" element={<Signup />} />

            <Route exact path="/productlist" element={<ProductList />} />
            <Route exact path="/updateMenu" element={<Modal />} />
            <Route exact path="/category" element={<Category />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
