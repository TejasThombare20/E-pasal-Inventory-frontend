import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { FaUpload } from "react-icons/fa";
import { imageToBase64 } from "../Utility/ImageToBase64";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProductReducer } from "../Redux/productSlice";
import { NavLink } from "react-router-dom";

function Modal({ product, onClose }) {
  console.log("product", product);
  const productData = useSelector((state) => state.product.productList);
  const CategoryData = useSelector((state) => state.category.categories);
  const unitData = useSelector((state) => state.units);
  console.log("unitData", unitData);
  const dispatch = useDispatch();

  const [data, setdata] = useState({
    u_product_name: "",
    u_category: "",
    u_sub_category: "",
    u_sub_sub_category: "",
    u_description: "",
    u_image: "",
    u_barcode: "",
    u_quantity: "",
    u_price: "",
  });

  const handleClose = () => {
    window.location.reload();
    setOpen(false);
    setdata({
      u_product_name: "",
      u_category: "",
      u_sub_category: "",
      u_sub_sub_category: "",
      u_description: "",
      u_image: "",
      u_barcode: "",
      u_quantity: "",
      u_price: "",
    });
  };

  const uploadImage = async (e) => {
    const data1 = await imageToBase64(e.target.files[0]);
    setdata((preve) => {
      return {
        ...preve,
        u_image: data1,
      };
    });
  };

  const [subCategories, setSubCategories] = useState([]);
  const [subSubSections, setSubSubSections] = useState([]);

  const handleChange = (name, selectedValue) => {
    console.log("selectedValue: " + selectedValue);
    if (name === "category") {
      const selectedCategory = CategoryData.find(
        (category) => category.name === selectedValue
      );

      // Update the sub-categories based on the selected category
      setdata((prevData) => ({
        ...prevData,
        u_category: selectedCategory._id,
        u_sub_category: "", // Reset sub-category when category changes
      }));
      console.log("selectedCategoryid", selectedCategory._id);

      if (selectedCategory) {
        setSubCategories(selectedCategory.sections || []);
      }
      console.log("subCategories", subCategories);
    } else if (name === "sections") {
      const selectedSubCategory = subCategories.find(
        (subCategory) => subCategory.name === selectedValue
      );
      console.log("selectedSubCategory", selectedSubCategory);

      // Update the sub-categories based on the selected category
      setdata((prevData) => ({
        ...prevData,
        u_sub_category: selectedSubCategory._id,
        u_sub_sub_category: "", // Reset sub-sub-category when sub-category changes
      }));
      console.log("selectedSubCategory._id", selectedSubCategory._id);

      if (selectedSubCategory) {
        const subsectionsForSection = selectedSubCategory.subsections;
        console.log(subsectionsForSection);
        setSubSubSections(subsectionsForSection || []);
        console.log(subSubSections);
        console.log("hello");
      }
    } else if (name === "subsections") {
      const selectedSubsubCategory = subCategories.find(
        (subCategory) => subCategory.name === selectedValue
      );

      // Update the sub-categories based on the selected category
      setdata((prevData) => ({
        ...prevData,
        u_sub_sub_category: selectedSubsubCategory._id, // Reset sub-sub-category when sub-category changes
      }));
    } else {
      setdata((prevData) => ({
        ...prevData,
        [name]: selectedValue,
      }));
    }
  };

  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  var [products, setproducts] = useState(product);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const id = product._id;
      const {
        u_product_name,
        u_category,
        u_sub_category,
        u_sub_sub_category,
        u_description,
        u_quantity,
        u_image,
        u_barcode,
        u_price,
      } = data;
      const updatedProduct = {};
      if (u_product_name) updatedProduct.u_product_name = u_product_name;
      if (u_category) updatedProduct.u_category = u_category;
      if (u_sub_category) updatedProduct.u_sub_category = u_sub_category;
      if (u_sub_sub_category)
        updatedProduct.u_sub_sub_category = u_sub_sub_category;
      if (u_description) updatedProduct.u_description = u_description;
      if (u_quantity) updatedProduct.u_quantity = u_quantity;
      if (u_image) updatedProduct.u_image = u_image;
      if (u_price) updatedProduct.u_price = u_price;
      if (u_barcode) updatedProduct.u_barcode = u_barcode;
      console.log("updatedProduct", updatedProduct);

      // Send the PUT request to update the product
      const response = await axios.put(
        `${api}/api/product/updateProduct/${id}`,
        updatedProduct
      );

      if (response.status === 200) {
        const updatedProduct = response.data.product;
        console.log("updatedProduct", updatedProduct);
        dispatch(updateProductReducer({ id, updatedProduct }));
        // dispatch(updateProductReducer( ))
        console.log("Product updated:");
        // setOpen(false); // Close the modal after successful update
        // window.location.reload();
        onClose();
      } else {
        console.error("Product update failed:", response.data.Message);
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
          <div className="max-h-screen overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form
              className=" m-auto bg-white w-full max-w-md p-4 shadow-lg drop-shadow-md flex flex-col"
              action=""
              // onSubmit={handleUpdate}
            >
              <label htmlFor="u_product_name" className="mt-1">
                Name :
              </label>
              <input
                id="u_product_name"
                type="text"
                name="u_product_name"
                value={data.u_product_name}
                placeholder={product.product_name}
                onChange={(e) => {
                  handleChange("product_name", e.target.value);
                }}
                className="bg-slate-200 px-2 py-1 my-1"
              />
              <label htmlFor="u_category" className="mt-1">
                Category:
              </label>
              <select
                name="u_category"
                id="u_category"
                onChange={(selectedOption) => {
                  console.log("selectedOption", selectedOption);
                  handleChange("category", selectedOption.target.value);
                }}
                value={data.u_category}
                className="bg-slate-200 px-2 py-1 my-1"
              >
                <option value="">Select a category</option>
                {CategoryData.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label htmlFor="u_sub_category" className="mt-1">
                Sections:
              </label>
              <select
                name="u_sub_category"
                id="u_sub_category"
                onChange={(selectedOption) => {
                  handleChange("sections", selectedOption.target.value);
                }}
                value={data.u_sub_category}
                className="bg-slate-200 px-2 py-1 my-1"
              >
                <option value="">Select a section</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory.name}>
                    {subCategory.name}
                  </option>
                ))}
              </select>

              <label htmlFor="u_sub_sub_category" className="mt-1">
                Subsection:
              </label>
              <select
                name="u_sub_sub_category"
                id="u_sub_sub_category"
                onChange={(selectedOption) =>
                  handleChange("subsections", selectedOption.target.value)
                }
                value={data.u_sub_sub_category}
                className="bg-slate-200 px-2 py-1 my-1"
              >
                <option value="">Select a subsection</option>
                {subSubSections.map((subSubSection) => (
                  <option key={subSubSection} value={subSubSection}>
                    {subSubSection}
                  </option>
                ))}
              </select>

              <label htmlFor="u_image" className="mt-1 cursor-pointer">
                Image :
                <div className="h-40 w-full bg-slate-200  my-1 py-1 flex items-center justify-center">
                  {data.u_image ? (
                    <img
                      src={data.u_image}
                      className="h-full"
                      alt="productImage"
                    />
                  ) : (
                    <span className="text-5xl">
                      <FaUpload />
                    </span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    id="u_image"
                    onChange={(e) => {
                      handleChange("image", e.target.files[0]);
                    }}
                    className="hidden"
                    placeholder={product.image}
                  />
                </div>
              </label>

              <label htmlFor="u_barcode" className="mt-1">
                Barcode :
              </label>
              <input
                type="text"
                name="u_barcode"
                id="u_barcode"
                value={data.u_barcode}
                onChange={(e) => {
                  handleChange("barcode", e.target.value);
                }}
                placeholder={product.barcode}
                className="bg-slate-200 px-2 py-1 my-1"
              />
              <label htmlFor="u_price" className="mt-1">
                Price :
              </label>
              <input
                type="text"
                name="u_price"
                id="u_price"
                value={data.u_price}
                onChange={(e) => {
                  handleChange("barcode", e.target.value);
                }}
                placeholder={product.price}
                className="bg-slate-200 px-2 py-1 my-1"
              />
              <label htmlFor="u_price" className="mt-1">
                Unit :
              </label>
              <select
                name="u_quantity"
                id="u_quantity"
                onChange={(selectedOption) =>
                  // onChange("unit", selectedOption.label.props.children[0])
                  handleChange("unit", selectedOption.value)
                }
                defaultValue={product.quantity}
                className="bg-slate-200 px-2 py-1 my-1"
              >
                <option value="">Select a unit</option>
                {unitData.map((Unit) => (
                  <option key={Unit._id} value={Unit.name}>
                    {Unit.name}
                  </option>
                ))}
              </select>
              <label htmlFor="description" className="mt-1">
                Description :
              </label>
              <textarea
                name="u_description"
                id="u_description"
                rows="3"
                value={data.u_description}
                onChange={(e) => {
                  handleChange("description", e.target.value);
                }}
                className="bg-slate-200 px-2 py-1 my-1 resize-none"
                placeholder={product.description}
              ></textarea>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={(e) => handleUpdate(e)}
                >
                  save
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  // onClick={() => handleClose()}
                  // ref={cancelButtonRef}
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
