import React, { useState } from "react";
import axios from "axios";
import api from "../utils/api";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

const FloatingWindow2 = ({ isOpen, onClose }) => {
  const [newCategory, setNewCategory] = useState("");
  const [newSection, setNewSection] = useState("");
  const [newSubsection, setNewSubsection] = useState("");

  const handleSave = async () => {
    try {
      // Prepare data for creating the new category
      const newCategoryData = {
        name: newCategory,
        sections: [
          {
            name: newSection,
            subsections: [newSubsection],
          },
        ],
      };

      const response = await axios.post(
        `${api}/api/category/categories`,
        newCategoryData
      );
      console.log("New category created:", response.data);
      toast.success("category created successfully")
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating new category:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-1/4 right-4 transform translate-x-full translate-y-1/2 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl mb-4">Add New Category</h2>
      <div className="mb-2">
        <label htmlFor="newCategory" className="block font-medium">
          New Category:
        </label>
        <input
          type="text"
          id="newCategory"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="newSection" className="block font-medium">
          New Section:
        </label>
        <input
          type="text"
          id="newSection"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newSubsection" className="block font-medium">
          New Subsection:
        </label>
        <input
          type="text"
          id="newSubsection"
          value={newSubsection}
          onChange={(e) => setNewSubsection(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <NavLink
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save
      </NavLink>
      <NavLink
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
      >
        Cancel
      </NavLink>
    </div>
  );
};

export default FloatingWindow2;
