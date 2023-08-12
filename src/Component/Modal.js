import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FaUpload } from "react-icons/fa";
import { imageToBase64 } from "../Utility/ImageToBase64";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { useSelector } from "react-redux";

function Modal({ product, onClose }) {
  console.log("product", product);
  const productData = useSelector((state) => state.product.productList);

  const [data, setdata] = useState({
    u_product_name: "",
    u_category: "",
    u_description: "",
    u_image: "",
    u_quantity: "",
    u_price: "",
  });

  const handleClose = () => { 
    window.location.reload()
    setOpen(false);
    setdata({
      u_product_name: "",
      u_category: "",
      u_description: "",
      u_image: "",
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

  const onChange = async (e) => {
    const { name, value } = e.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
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
        u_description,
        u_quantity,
        u_image,
        u_price,
      } = data;
      const updatedProduct = {};
      if (u_product_name) updatedProduct.u_product_name = u_product_name;
      if (u_category) updatedProduct.u_category = u_category;
      if (u_description) updatedProduct.u_description = u_description;
      if (u_quantity) updatedProduct.u_quantity = u_quantity;
      if (u_image) updatedProduct.u_image = u_image;
      if (u_price) updatedProduct.u_price = u_price;
      console.log("updatedProduct", updatedProduct);

      // Send the PUT request to update the product
      const response = await axios.put(
        `${api}/api/product/updateProduct/${id}`,
        updatedProduct
      );

      if (response.status === 200) {
        console.log("Product updated:", response.data.product);
        setOpen(false); // Close the modal after successful update
        window.location.reload();
      } else {
        console.error("Product update failed:", response.data.Message);
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative flex flex-col justify-center items-center transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Update Menu
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              <form
                                className=" m-auto bg-white w-full max-w-md p-4 shadow-lg drop-shadow-md flex flex-col"
                                action=""
                                // onSubmit={handleUpdate}
                              >
                                <label
                                  htmlFor="u_product_name"
                                  className="mt-1"
                                >
                                  Name :
                                </label>
                                <input
                                  id="u_product_name"
                                  type="text"
                                  name="u_product_name"
                                  value={data.u_product_name}
                                  placeholder={product.product_name}
                                  onChange={onChange}
                                  className="bg-slate-200 px-2 py-1 my-1"
                                />

                                {/* <label htmlFor="category" className="mt-1">
                                  Category :
                                </label>
                                <input
                                  id="u_category"
                                  type="text"
                                  name="u_category"
                                  value={data.u_category}
                                  placeholder={product.category}
                                  onChange={onChange}
                                  className="bg-slate-200 px-2 py-1 my-1"
                                /> */}

                                <label htmlFor="u_category" className="mt-1">
                                  Category :
                                </label>
                                <select
                                  name="u_category"
                                  id="u_category"
                                  onChange={onChange}
                                  defaultValue={product.category}
                                  className="bg-slate-200 px-2 py-1 my-1"
                                >
                                  <option disabled selected value=""    >Select an category</option>
                                 
                                  <option name="u_category" value={"category1"}>
                                    category1
                                  </option>
                                  <option name="u_category" value={"category2"}>
                                    category2
                                  </option>
                                  <option name="u_category" value={"category3"}>
                                    category3
                                  </option>
                                  <option name="u_category" value={"category4"}>
                                    category4
                                  </option>
                                  <option name="u_category" value={"category5"}>
                                    category5
                                  </option>
                                  <option name="u_category" value={"category6"}>
                                    category6
                                  </option>
                                  <option name="u_category" value={"category7"}>
                                    category7
                                  </option>
                                  <option name="u_category" value={"category8"}>
                                    category8
                                  </option>
                                  <option name="u_category" value={"category9"}>
                                    category9
                                  </option>
                                  <option name="u_category" value={"category10"}>
                                    category10
                                  </option>
                                  <option name="u_category" value={"category11"}>
                                    category11
                                  </option>
                                  <option name="u_category" value={"category12"}>
                                    category12
                                  </option>
                                  <option name="u_category" value={"category13"}>
                                    category13
                                  </option>
                                  <option name="u_category" value={"category14"}>
                                    category14
                                  </option>
                                  <option name="u_category" value={"category15"}>
                                    category15
                                  </option>
                                  
                                </select>

                                <label
                                  htmlFor="u_image"
                                  className="mt-1 cursor-pointer"
                                >
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
                                      onChange={uploadImage}
                                      className="hidden"
                                      placeholder={product.image}
                                    />
                                  </div>
                                </label>

                                <label htmlFor="u_price" className="mt-1">
                                  Price :
                                </label>
                                <input
                                  type="text"
                                  name="u_price"
                                  id="u_price"
                                  value={data.u_price}
                                  onChange={onChange}
                                  placeholder={product.price}
                                  className="bg-slate-200 px-2 py-1 my-1"
                                />

                                <label htmlFor="u_price" className="mt-1">
                                  Quantity :
                                </label>
                                <select
                                  name="u_quantity"
                                  id="u_quantity"
                                  onChange={onChange}
                                  defaultValue={product.quantity}
                                  className="bg-slate-200 px-2 py-1 my-1"
                                >
                                  <option disabled selected value="">
                                    Select an quantity type
                                  </option>
                                  <option
                                    name="u_quantity"
                                    value={" per piece"}
                                  >
                                    per piece
                                  </option>
                                  <option name="u_quantity" value={" per box"}>
                                    per box
                                  </option>
                                  <option name="u_quantity" value={"per KG"}>
                                    per KG
                                  </option>
                                </select>

                                <label htmlFor="description" className="mt-1">
                                  Description :
                                </label>
                                <textarea
                                  name="u_description"
                                  id="u_description"
                                  rows="3"
                                  value={data.u_description}
                                  onChange={onChange}
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
                                    onClick={() => handleClose()}
                                    ref={cancelButtonRef}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
