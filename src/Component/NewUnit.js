import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { NavLink } from "react-router-dom";

const AddUnit = ({ onClose }) => {
  const [unitName, setUnitName] = useState("");

  const handleAddUnit = async () => {
    try {
      const response = await axios.post(`${api}/api/unit/addUnit`, {
        name: unitName,
      });

      // Show a success toast and do other necessary actions
      toast.success("Unit added successfully");
      onClose();
      window.location.reload();
      // You might want to update your state or perform other actions after success
    } catch (error) {
      console.error("Error adding unit:", error);
      toast.error("Error adding unit");
      // Handle error appropriately (e.g., show an error toast)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Unit</h2>
        <input
          type="text"
          placeholder="New Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleAddUnit}
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

export default AddUnit;
