import "./App.css";
import Header from "./Component/Header";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NewProduct from "./Component/NewProduct";
import Signup from "./Component/SignUp";
import Login from "./Component/login";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import api from "./utils/api";
import ProductList from "./Component/Productlist";
import Modal from "./Component/Modal";
import Category from "./Component/Category";

import { setAuthToken } from "./Redux/tokenSlice";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  console.log(productData);
  const authToken = localStorage.getItem("token");
  if (authToken) {
    dispatch(setAuthToken(authToken));
  }
  const tokenData = useSelector((state) => state.token.authToken);
  // console.log("tokenData", tokenData);

  function AuthGuard({ children }) {
    // Check if the user is authenticated
    if (!tokenData) {
      // Redirect to the login page if not authenticated
      return <Navigate to="/" replace />;
    }

    // Render the protected route if authenticated
    return children;
  }

  return (
    <>
      <div className="">
        <Router>
          <Toaster />
          <div className=" sticky w-full top-0 right-0 left-0 z-50">
            <Header />
          </div>
          <div>
            <Routes>
              <Route
                path="/"
                element={tokenData ? <Navigate to="/NewProduct" /> : <Login />}
              />
              {/* <Route exact path="/" element={<Login />} /> */}
              
              {/* <Route exact path="/NewProduct" element={<AuthGuard>
                <Navigate to="/NewProduct" />
              </AuthGuard>} /> */}
              <Route exact path="/NewProduct" element={tokenData ?<NewProduct /> :<Login /> } />
              <Route exact path="/Signup" element={<Signup />} />

              <Route exact path="/productlist" element={<ProductList />} />
              <Route exact path="/updateMenu" element={<Modal />} />
              <Route exact path="/category" element={<Category />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
