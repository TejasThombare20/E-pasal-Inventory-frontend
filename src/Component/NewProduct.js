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
    sub_category: "",
    sub_sub_category: "",
    image: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleUpdateClick = (product) => {
    console.log("product ", product);
    setSelectedProductId(product); // Step 2
    setIsModalOpen(true);
  };

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
    const { product_name, category,sub_category,sub_sub_category, description, quantity, image, price } =
      data;
      console.log("data", data);
    const response = await axios.post(
      `${api}/api/product/addProduct`,
      JSON.stringify({
        product_name,
        category,
        sub_category,
        sub_sub_category,
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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState("");

  const categories = ["Category 1", "Category 2", "Category 3"];
  const subcategories = {
    "Category 1": ["Subcategory 1.1", "Subcategory 1.2", "Subcategory 1.3"],
    "Category 2": ["Subcategory 2.1", "Subcategory 2.2"],
    "Category 3": ["Subcategory 3.1", "Subcategory 3.2", "Subcategory 3.3"],
  };
  const subsubcategories = {
    "Subcategory 1.1": ["Sub-Subcategory 1.1.1", "Sub-Subcategory 1.1.2"],
    "Subcategory 1.2": ["Sub-Subcategory 1.2.1"],
    // Add more sub-subcategories here
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onChange(event)
    setSelectedSubcategory("");
    setSelectedSubSubcategory("");
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
    onChange(event)
    setSelectedSubSubcategory("");
  };
  const handleSubSubcategoryChange = (event) => {
    setSelectedSubSubcategory(event.target.value);
    onChange(event)
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
          Category:
        </label>
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-slate-200 px-2 py-1 my-1"
        >
          <option disabled selected value="">
            Select an category
          </option>
          {categories.map((category) => (
            <option name="category" value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="sub_category" className="mt-1">
          Subcategory:
        </label>
        <select
          name="sub_category"
          id="sub_category"
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          disabled={!selectedCategory}
          className="bg-slate-200 px-2 py-1 my-1"
        >
          <option disabled selected value="">
            Select an subcategory
          </option>
          {subcategories[selectedCategory] &&
            subcategories[selectedCategory].map((subcategory) => (
              <option name="sub_category" value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>

        <label htmlFor="sub_sub_category" className="mt-1">
          Select Sub-Subcategory
        </label>
        <select
          name="sub_sub_category"
          id="sub_sub_category"
          value={selectedSubSubcategory}
          onChange={handleSubSubcategoryChange}
          disabled={!selectedSubcategory}
          className="bg-slate-200 px-2 py-1 my-1"
        >
         <option disabled selected value="">
            Select an  sub-subcategory
          </option>
          {selectedSubcategory &&
            subsubcategories[selectedSubcategory] &&
            subsubcategories[selectedSubcategory].map((subsubcategory) => (
              <option name="sub_sub_category" value={subsubcategory}>
                {subsubcategory}
              </option>
            ))}
        </select>

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
            <p className="text-gray-500 my-1">{product.sub_category}</p>
            <p className="text-gray-500 my-1">{product.sub_sub_category}</p>

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
