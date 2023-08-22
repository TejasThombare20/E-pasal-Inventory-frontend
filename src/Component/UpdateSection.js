import React, { useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import {  updateSectionName } from "../Redux/categorySlice"; // Or use the appropriate action
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateSection = ({ categoryId, sectionId, onClose }) => {
  const [newSectionName, setNewSectionName] = useState("");
  const dispatch = useDispatch();

  const handleUpdateSection = async () => {
    try {
      await axios.put(
        `${api}/api/category/${categoryId}/updateSection/${sectionId}`,
        {
          name: newSectionName,
        }
      );
      toast.success("section updated successfully");


      // Fetch the updated categories to refresh the data in Redux store
      dispatch(
        updateSectionName({
          categoryId: categoryId,
          sectionId: sectionId,
          newName: newSectionName,
        })
      )
      
      // Close the modal or perform any other action after update
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Section Name</h2>
        <input
          type="text"
          placeholder="New Section Name "
          value={newSectionName}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => setNewSectionName(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleUpdateSection}
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

export default UpdateSection;
