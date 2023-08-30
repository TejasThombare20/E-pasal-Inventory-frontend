import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../Redux/categorySlice"; // Import your Redux action
import api from "../utils/api";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddCategory = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${api}/api/category/categories`, {
        name: newCategoryName,
      });

      // Add the new category to Redux store
      const responseData = response.data;
      console.log("response add category", response.data);
      toast.success("Category added successfully");
      dispatch(addCategory(responseData));

      // Close the modal or perform any other action after adding
      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add
          </NavLink>
          <NavLink
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
