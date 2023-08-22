import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios if not already imported
import api from "../utils/api";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
    setSelectedSubsection: (state, action) => {
      state.selectedSubsection = action.payload;
    },
    updateCategoryName: (state, action) => {
      const { categoryId, newName } = action.payload;
      console.log("both : ", categoryId, newName);
      const categoryToUpdate = state.categories.find(
        (category) => category._id === categoryId
      );
      if (categoryToUpdate) {
        categoryToUpdate.name = newName;
      }
    },
    updateSectionName: (state, action) => {
      const { categoryId, sectionId, newName } = action.payload;
      const categoryToUpdate = state.categories.find(
        (category) => category._id === categoryId
      );

      if (categoryToUpdate) {
        const sectionToUpdate = categoryToUpdate.sections.find(
          (section) => section._id === sectionId
        );

        if (sectionToUpdate) {
          sectionToUpdate.name = newName;
        }
      }
    },
    updateSubsectionName: (state, action) => {
      const { categoryId, sectionId, subsectionIndex, newName } =
        action.payload;
      const categoryToUpdate = state.categories.find(
        (category) => category._id === categoryId
      );

      if (categoryToUpdate) {
        const sectionToUpdate = categoryToUpdate.sections.find(
          (section) => section._id === sectionId
        );

        if (sectionToUpdate && sectionToUpdate.subsections[subsectionIndex]) {
          sectionToUpdate.subsections[subsectionIndex] = newName;
        }
      }
    },
  },
});

export const {
  setCategories,
  addCategory,
  setSelectedCategory,
  setSelectedSection,
  setSelectedSubsection,
  updateCategoryName,
  updateSectionName,
  updateSubsectionName
} = categorySlice.actions;

// Async action to fetch categories
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${api}/api/category/getcategories`);
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Handle error as needed
  }
};

export default categorySlice.reducer;
