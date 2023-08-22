import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCategoryName } from "../Redux/categorySlice"; // Import your Redux action
import api from "../utils/api";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateCategory = ({ categoryId, onClose }) => {
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.put(`${api}/api/category/updateCategory/${categoryId}`, {
        name: newCategoryName,
      
      });

      // Update Redux store with the new category name
      toast.success("category updated successfully");
      dispatch(updateCategoryName({ categoryId, newName: newCategoryName }));

      // Close the modal or perform any other action after update
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating category name:", error);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Category Name</h2>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleUpdateCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Update
          </NavLink>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;

