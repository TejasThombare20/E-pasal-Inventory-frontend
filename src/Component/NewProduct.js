import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { imageToBase64 } from "../Utility/ImageToBase64";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import Modal from "../Component/Modal";
import { useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NewProduct = () => {
  const productData = useSelector((state) => state.product.productList);
  const reversedProductData = [...productData].reverse();
  // console.log("productData", productData);
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
    // console.log("product ", product);
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
    const {
      product_name,
      category,
      sub_category,
      sub_sub_category,
      description,
      quantity,
      image,
      price,
    } = data;
    // console.log("data", data);
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

  const [categories, setCategories] = useState([
    "Groceries",
    "Bakery and Dairy",
    "Egg and Meat",
    "Beverages",
    "Packaged Foods",
  ]);
  const [subcategories, setSubcategories] = useState({
    "Groceries": [
      "Rice & Rice Products",
      "Atta, Flour & Suji",
      "Cooking Oil & Ghee",
      "Dal & Pulses",
    ],
    "Bakery and Dairy": [
      "Bread and Croissants",
      "Dairy",
      "Home Making",
      "Icecream & Desserts",
      "Muffins & Cookies",
    ],
    "Egg and Meat": [
      "Eggs",
      "Frozen Meet",
      "Frozen Snacks",
      "Sausage Ham & Salami",
    ],
    "Beverages": [
      "Cocktail Mixes",
      "Coffee",
      "Energy And Health drinks",
      "Fruit Juice and Drinks",
      "Soft drinks",
      "Tea",
      "Water",
      "Alcohol",
    ],
    "Packaged Foods": [
      "Biscuits & Cookies",
      "Breakfast Cereals",
      " Canned & Processed food",
      "Chocolates and Candies",
      "Frozen Meal & snacks",
      "Noodles & Pasta",
      "Pickles & Chutney",
      "Ready to cook Mixes",
      "Snacks",
      "Spreads, Sauce & Ketchup",
    ],
  });
  const [subsubcategories, setSubsubcategories] = useState({
    "Rice & Rice Products": [
      "Beaten Rice",
      "Boiled Rice",
      "Brown Rice",
      "Jeera Masino Rice",
      "Long Grain rice",
      "Premium Basmati rice",
      "Sona Mansuli Rice",
      "Premium Rice from Nepal",
      "Other Rice Products	",
    ],
    "Atta, Flour & Suji": ["Atta", "Besan & Suji", " Maida", "Other Flours"],

    "Cooking Oil & Ghee": [
      "Corn oil & others",
      "Ghee",
      "Olive oil",
      "Sunflower cooking oil",
      "Soya & Mustard oil",
    ],
    "Dairy": [
      "Butter",
      "Cheese & Tofu",
      "Creamer & Whitener",
      "Milk & Milk Products",
    ],

    // Add more sub-subcategories here
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [newSection, setNewSection] = useState("");
  const [newSubSection, setNewSubSection] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onChange(event);
    setSelectedSubcategory("");
    setSelectedSubSubcategory("");
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
    onChange(event);
    setSelectedSubSubcategory("");
  };
  const handleSubSubcategoryChange = (event) => {
    const selectedSubcategoryValue = event.target.value;
    setSelectedSubSubcategory(event.target.value);
    onChange(event);
    console.log("selectedCategory:", selectedCategory);
    console.log("selectedSubcategory:", selectedSubcategory);
    console.log("selectedSubcategory:", selectedSubcategoryValue);
    console.log(
      "subsubcategories[selectedSubcategory]:",
      subsubcategories[selectedSubcategory]
    );
  };

  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  const handleAddNewToggle = () => {
    setIsAddNewOpen(!isAddNewOpen);
  };

  const handleSaveNew = () => {
    console.log("newCategory:", newCategory);
    console.log("newSection:", newSection);
    console.log("newSubSection:", newSubSection);
    console.log("categories:", categories);
    console.log("subcategories:", subcategories);
    console.log("subsubcategories:", subsubcategories);
    if (newCategory.trim() !== "") {
      console.log("categories", categories);
      if (!categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
      }
    }

    if (newCategory.trim() !== "" && newSection.trim() !== "") {
      if (!subcategories[newCategory]) {
        setSubcategories({
          ...subcategories,
          [newCategory]: [],
        });
      }
      if (!subcategories[newCategory].includes(newSection)) {
        setSubcategories({
          ...subcategories,
          [newCategory]: [...subcategories[newCategory], newSection],
        });
      }
    }

    if (newSection.trim() !== "" && newSubSection.trim() !== "") {
      if (!subsubcategories[newSection]) {
        setSubsubcategories({
          ...subsubcategories,
          [newSection]: [],
        });
      }
      if (!subsubcategories[newSection].includes(newSubSection)) {
        setSubsubcategories({
          ...subsubcategories,
          [newSection]: [...subsubcategories[newSection], newSubSection],
        });
      }
    }

    setNewCategory("");
    setNewSection("");
    setNewSubSection("");
    setIsAddNewOpen(false);
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
        <div className="flex justify-start items-center gap-[250px] my-2">
          <label htmlFor="category" className="mt-1">
            Category:
          </label>

          <NavLink
            onClick={handleAddNewToggle}
            className="bg-cyan-500 rounded-md px-2 text-white "
          >
            {" "}
            add new
          </NavLink>
        </div>

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
              Category : {category}
            </option>
          ))}
        </select>

        <label htmlFor="sub_category" className="mt-1">
          Section:
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
            Select an section
          </option>
          {subcategories[selectedCategory] &&
            subcategories[selectedCategory].map((subcategory) => (
              <option name="sub_category" value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>

        <label htmlFor="sub_sub_category" className="mt-1">
          Sub-section :
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
            Select an sub-section
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
              <div className="w-50 h-40  overflow-hidden backdrop-blur-md">
                <img
                  className="w-full h-full object-cover border border-black"
                  src={product.image}
                  alt="no internet"
                />
              </div>
            </div>

            <p className="text-xl font-semibold my-1 max-w-[200px]  break-words">
              {product.product_name}
            </p>

            <p className="text-gray-500 my-1">
              <p className="text-black">Category</p>
              {product.category}
            </p>
            <p className="text-gray-500 my-1">
              <p className="text-black">Section</p>
              {product.sub_category}
            </p>
            <p className="text-gray-500 my-1">
              <p className="text-black">Sub-section</p>
              {product.sub_sub_category}
            </p>

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
      <AnimatePresence>
        {isAddNewOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center"
          >
            <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
              <label htmlFor="newCategory" className="mt-1">
                New Category:
              </label>
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-slate-200 px-2 py-1 my-1"
              />
              <label htmlFor="newSection" className="mt-1">
                New Section:
              </label>
              <input
                type="text"
                id="newSection"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="bg-slate-200 px-2 py-1 my-1"
              />
              <label htmlFor="newSubSection" className="mt-1">
                New Sub-section:
              </label>
              <input
                type="text"
                id="newSubSection"
                value={newSubSection}
                onChange={(e) => setNewSubSection(e.target.value)}
                className="bg-slate-200 px-2 py-1 my-1"
              />
              <button
                className="bg-red-500 text-white px-4 py-2 mt-2 mx-2 rounded"
                onClick={handleAddNewToggle}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                onClick={handleSaveNew}
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewProduct;
