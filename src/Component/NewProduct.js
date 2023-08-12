import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { imageToBase64 } from "../Utility/ImageToBase64";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { HiCurrencyRupee } from "react-icons/hi";
import Modal from "../Component/Modal";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const productData = useSelector((state) => state.product.productList);
  const userData = useSelector((state) => state.user);
  const Navigate = useNavigate();

  const reversedProductData = [...productData].reverse();
  console.log("productData", productData);
  const [data, setdata] = useState({
    product_name: "",
    category: "",
    image: "",
    price: "",
    quantity: "",
    description: "",
  });

  // const [products, setProducts] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleUpdateClick = (product) => {
    console.log("product ", product);
    setSelectedProductId(product); // Step 2
    setIsModalOpen(true);
  };

  // const closeModal = () => {
  //   setSelectedProduct(null);
  //   setIsModalOpen(false);
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(`${api}/api/product/fetchAllProduct`); // Make sure the URL matches your backend route
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const uploadImage = async (e) => {
    const data1 = await imageToBase64(e.target.files[0]);
    // console.log(data1);

    setdata((preve) => {
      return {
        ...preve,
        image: data1,
      };
    });
  };

  const [expandedProducts, setExpandedProducts] = useState([]);

  const toggleDescription = (productId) => {
    if (expandedProducts.includes(productId)) {
      setExpandedProducts(expandedProducts.filter((id) => id !== productId));
    } else {
      setExpandedProducts([...expandedProducts, productId]);
    }
  };

  const onChange = async (e) => {
    const { name, value } = e.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { product_name, category, description, quantity, image, price } =
      data;
    const response = await axios.post(
      `${api}/api/product/addProduct`,
      JSON.stringify({
        product_name,
        category,
        description,
        quantity,
        image,
        price,
      }),
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    toast("product added successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const deleteProduct = async (productID, e) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product ?"
    );
    if (confirmDelete) {
      try {
        e.preventDefault();
        const response = await axios.delete(
          `${api}/api/product/deleteProduct/${productID}`
        );
        window.location.reload(true);

        if (response.status === 204) {
          console.log("Product deleted successfully");
        } else {
          console.log("Unexpected response:", response.status, response.data);
        }
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    }
  };

  const categorySubcategoryMap = {
    category1: ["subcategory1_1", "subcategory1_2"],
    category2: ["subcategory2_1", "subcategory2_2"],
    category3: ["subcategory3_1", "subcategory3_2"],
    category4: ["subcategory4_1", "subcategory4_2"],
    category5: ["subcategory5_1", "subcategory5_2"],
    category6: ["subcategory6_1", "subcategory6_2"],
    category7: ["subcategory7_1", "subcategory7_2"],
    category8: ["subcategory8_1", "subcategory8_2"],
    category9: ["subcategory9_1", "subcategory9_2"],
    category10: ["subcategory10_1", "subcategory10_2"],
    category11: ["subcategory11_1", "subcategory11_2"],
    category12: ["subcategory12_1", "subcategory12_2"],
    category13: ["subcategory13_1", "subcategory13_2"],
    category14: ["subcategory14_1", "subcategory14_2"],
    category15: ["subcategory15_1", "subcategory15_2"],
    
  };

  return (
    <div className="  p-4 ">
      <form
        className=" m-auto bg-white w-full max-w-md p-4 shadow-lg drop-shadow-md flex flex-col"
        action=""
        onSubmit={handleSubmit}
      >
        <label htmlFor="product_name" className="mt-1">
          Name :
        </label>
        <input
          id="product_name"
          type="text"
          name="product_name"
          value={data.product_name}
          onChange={onChange}
          className="bg-slate-200 px-2 py-1 my-1"
        />

        <label htmlFor="category" className="mt-1">
          Category :
        </label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          placeholder="choose category"
          className="bg-slate-200 px-2 py-1 my-1"
        >
          <option disabled selected value="">
            Select an category
          </option>
          
          <option name="category" value={"category1"}>
            category1
          </option>
          <option name="category" value={"category2"}>
            category2
          </option>
          <option name="category" value={"category3"}>
            category3
          </option>
          <option name="category" value={"category4"}>
            category4
          </option>
          <option name="category" value={"category5"}>
            category5
          </option>
          <option name="category" value={"category6"}>
            category6
          </option>
          <option name="category" value={"category7"}>
            category7
          </option>
          <option name="category" value={"category8"}>
            category8
          </option>
          <option name="category" value={"category9"}>
            category9
          </option>
          <option name="category" value={"category10"}>
            category10
          </option>
          <option name="category" value={"category11"}>
            category11
          </option>
          <option name="category" value={"category12"}>
            category12
          </option>
          <option name="category" value={"category13"}>
            category13
          </option>
          <option name="category" value={"category14"}>
            category14
          </option>
          <option name="category" value={"category15"}>
            category15
          </option>
        </select>
        <label htmlFor="category" className="mt-1">
          Category:
        </label>
        {/* <select
          name="category"
          id="category"
          onChange={onChange}
          placeholder="choose category"
          className="bg-slate-200 px-2 py-1 my-1"
        >
          <option disabled selected value="">
            Select a category
          </option> */}

          {/* Render main categories */}
          {/* {Object.keys(categorySubcategoryMap).map((mainCategory) => (
            <optgroup label='category'>
              {categorySubcategoryMap[mainCategory].map((subcategory) => (
                <option name="category" value={subcategory} key={subcategory}>
                  {subcategory}
                </option>
              ))}
            </optgroup>
          ))} */}
        {/* </select> */}

        <label htmlFor="image" className="mt-1 cursor-pointer">
          Image :
          <div className="h-40 w-full bg-slate-200  my-1 py-1 flex items-center justify-center">
            {data.image ? (
              <img src={data.image} className="h-full" alt="productImage" />
            ) : (
              <span className="text-5xl">
                <FaUpload />
              </span>
            )}

            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="mt-1">
          Price :
        </label>
        <input
          type="text"
          name="price"
          id="price"
          value={data.price}
          onChange={onChange}
          className="bg-slate-200 px-2 py-1 my-1"
        />
        <label htmlFor="quantity" className="mt-1">
          Quantity :
        </label>
        <select
          name="quantity"
          id="quantity"
          onChange={onChange}
          placeholder="choose Quantity"
          className="bg-slate-200 px-2 py-1 my-1"
        >
          <option disabled selected value="">
            Select an quantity type
          </option>
          <option name="quantity" value={" per piece"}>
            per piece
          </option>
          <option name="quantity" value={" per box"}>
            per box
          </option>
          <option name="quantity" value={"per KG"}>
            per KG
          </option>
        </select>

        <label htmlFor="description" className="mt-1">
          Description :
        </label>
        <textarea
          name="description"
          id="description"
          rows="3"
          value={data.description}
          onChange={onChange}
          className="bg-slate-200 px-2 py-1 my-1 resize-none"
        ></textarea>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" w-fit  bg-blue-500 px-2 py-1 my-1 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>

      <p className="text-3xl font-semibold py-10">Product List : </p>

      <div className="flex flex-wrap gap-6 pt-6">
        {reversedProductData.map((product) => (
          <div
            key={product._id}
            className="bg-slate-200 p-4 rounded-lg shadow-md flex flex-col justify-start items-start "
          >
            <div className="w-full flex justify-center items-center mb-4">
              <div className="w-50 h-40  overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt="no internet"
                />
              </div>
            </div>

            <p className="text-xl font-semibold my-1">{product.product_name}</p>

            <p className="text-gray-500 my-1">{product.category}</p>

            <div className="flex justify-start items-center gap-4 my-1">
              <p className="text-xl font-semibold text-red-500">
                {parseFloat(product.price).toFixed(2)}
              </p>
              <p className="text-xl font font-semibold">{product.quantity}</p>
            </div>
            <div className="my-1">
              {expandedProducts.includes(product._id) ? (
                <div>
                  <p className="text-gray-600 max-w-xs  break-words ">
                    {product.description}
                  </p>
                  <a
                    className=" text-blue-600 cursor-pointer  px-4 py-2 mt-2 "
                    onClick={() => toggleDescription(product._id)}
                  >
                    Hide Description
                  </a>
                </div>
              ) : (
                <a
                  className="text-blue-600 cursor-pointer  px-4 py-2 mt-2"
                  onClick={() => toggleDescription(product._id)}
                >
                  Show Description
                </a>
              )}
            </div>
            <div className="my-1">
              <button
                className="bg-red-500 text-white px-4 py-2 mt-2 mx-2 rounded"
                onClick={(e) => deleteProduct(product._id, e)}
              >
                Delete
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
                onClick={() => handleUpdateClick(product)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          onClose={isModalOpen}
          product={selectedProductId}
          // Pass product ID to Modal component
        />
      )}
    </div>
  );
};

export default NewProduct;
