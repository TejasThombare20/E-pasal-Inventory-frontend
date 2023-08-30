import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux";
import { addSectionReducer } from "../Redux/categorySlice";

const AddSection = ({ categoryId, onClose }) => {
  const dispatch  = useDispatch()
  // const [newSectionName, setNewSectionName] = useState("");
  const [sectionName, setSectionName] = useState("");

  const handleAddSection = async () => {
    try {                        
      const response = await axios.post(`${api}/api/category/addSection/${categoryId}`, {
        sectionName: sectionName,
      });
     
      const newSection = response.data.sections.find(
        (section) => section.name === sectionName
      );
      console.log("newSection",newSection)
      // Show a success toast and do other necessary actions
     if (response.status === 200 )
     {
       dispatch(addSectionReducer(newSection ))
       toast.success("Section added successfully");       
      }
      onClose();      
      // window.location.reload();

    } catch (error) {
      console.error("Error adding section:", error);
      toast.error("Error adding section");
      
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Section</h2>
        <input
          type="text"
          placeholder="New Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleAddSection}
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

export default AddSection;
