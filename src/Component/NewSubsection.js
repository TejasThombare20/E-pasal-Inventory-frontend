import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addsubsectionReducer } from "../Redux/categorySlice";

const AddSubsection = ({ selectedCategory, selectedSection, onClose }) => {
  const [newSubsectionName, setNewSubsectionName] = useState("");
  const dispatch = useDispatch();

  const handleAddSubsection = async () => {
    try {
      const response = await axios.post(
        `${api}/api/category/categories/${selectedCategory}/sections/${selectedSection}/subsections`,
        {
          subsection: newSubsectionName,
        }
      );

      if (response.status === 200) {
        console.log("response: ", response);
        const newSubsection = response.data.subsection;

        dispatch(addsubsectionReducer({ subsection: newSubsection }));
       

        toast.success("Subsection added successfully");
      }

      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Error adding subsection:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Subsection</h2>
        <input
          type="text"
          placeholder="New Subsection Name"
          value={newSubsectionName}
          onChange={(e) => setNewSubsectionName(e.target.value)}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleAddSubsection}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add Subsection
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

export default AddSubsection;
