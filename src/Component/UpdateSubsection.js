import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Import your Redux action
import api from "../utils/api";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { updatesubsectionReducer } from "../Redux/categorySlice";

const UpdateSubsection = ({
  categoryId,
  sectionId,
  subsectionIndex,
  onClose,
}) => {
  console.log("sectionId : ", sectionId);
  console.log("subsectionIndex :", subsectionIndex);
  const dispatch = useDispatch();
  const [newSubsectionName, setNewSubsectionName] = useState("");

  const handleUpdateSubsection = async () => {
    console.log("newSubsectionName", newSubsectionName);
    console.log("subsectionIndex", subsectionIndex);

    try {
      const response =  await axios.put(
        `${api}/api/category/${categoryId}/updateSubsection/${sectionId}/${subsectionIndex}`,
        {
          newSubsectionName,
        }
      );
      if (response.status  === 200) {
          dispatch(updatesubsectionReducer({sectionId,subsectionIndex, newSubsectionName}))
        toast.success("Subsection updated successfully");
      }

      // Close the modal or perform any other action after update
      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Error updating subsection name:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Subsection Name</h2>
        <input
          type="text"
          placeholder="New Subsection Name"
          value={newSubsectionName}
          onChange={(e) => setNewSubsectionName(e.target.value)}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleUpdateSubsection}
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

export default UpdateSubsection;
