import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUnit } from "../Redux/unitSlice";

const UpdateUnit = ({ unitId, onClose }) => {
  const [newUnitName, setNewUnitName] = useState("");
  const dispatch = useDispatch()

  const handleUpdateUnit = async () => {
    try {
      const response = await axios.put(
        `${api}/api/unit/updateUnit/${unitId}`,
        {
          name: newUnitName,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Update the unit name in the parent component's state
       const responseData  = response.data
       console.log("responseData", responseData);
       dispatch(updateUnit(responseData))
        toast.success("Unit updated successfully");
        onClose();
        // window.location.reload();
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error updating unit name:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Unit Name</h2>
        <input
          type="text"
          placeholder="New Unit Name"
          value={newUnitName}
          onChange={(e) => setNewUnitName(e.target.value)}
          className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-end mt-4">
          <NavLink
            onClick={handleUpdateUnit}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Update
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

export default UpdateUnit;
