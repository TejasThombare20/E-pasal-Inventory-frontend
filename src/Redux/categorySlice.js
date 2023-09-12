import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios if not already imported
import api from "../utils/api";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    sections: [],
    subsections: [],
     selectedCategory: "", 
    selectedSection: "",
    selectedSubsection: "", 
  
    
    
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
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

    deleteCategoryReducer: (state, action) => {
      const categoryIdToDelete = action.payload;
      const newCategories = state.categories.filter(
        (category) => category._id !== categoryIdToDelete
      );

      return {
        ...state,
        categories: newCategories,
      };
    },

    setSectionsReducer: (state, action) => {
      console.log("setsection payload", action.payload);
      state.sections = action.payload;
    },

    addSectionReducer: (state, action) => {
      console.log("addsection payload", action.payload);
      state.sections.push(action.payload);
    },
    updateSectionReducer: (state, action) => {
      const { sectionId, newSectionName } = action.payload;
      console.log("both : ", sectionId, newSectionName);
      const sectionToUpdate = state.sections.find(
        (section) => section._id === sectionId
      );
      if (sectionToUpdate) {
        sectionToUpdate.name = newSectionName;
      }
    },
    deleteSectionReducer: (state, action) => {
      const sectionIdToDelete = action.payload;
      console.log("sectionIdToDelete", sectionIdToDelete);
      const newSections = state.sections.filter(
        (section) => section._id !== sectionIdToDelete
      );

      return {
        ...state,
        sections: newSections,
      };
    },

    setsubsectionsReducer: (state, action) => {
      console.log("setsubsection payload", action.payload);
      state.subsections = action.payload;
    },

    addsubsectionReducer: (state, action) => {
      console.log("add subsection payload", action.payload);
      state.subsections.push(action.payload);
      console.log("subsections",state.subsections)
    },

    updatesubsectionReducer: (state, action) => {
      const {subsectionId, newSubsectionName } = action.payload;
      console.log("both : ",subsectionId, newSubsectionName);

      const subsectionToUpdate = state.subsections.find(
        (subsection) => subsection._id === subsectionId
      );
      if (subsectionToUpdate) {
        subsectionToUpdate.name = newSubsectionName;
      }
    
    },

    deletesubsectionReducer: (state, action) => {
      const subsectionIdToDelete = action.payload;

      console.log("sectionIdToDelete", subsectionIdToDelete);
      const newsubSections = state.subsections.filter(
        (subsection) => subsection._id !== subsectionIdToDelete
      );

      return {
        ...state,
        subsections: newsubSections,
      };
    },
      

    setSelectedCategoryReducer: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSectionReducer: (state, action) => {
      state.selectedSection = action.payload;
    },
    setSelectedSubsectionReducer: (state, action) => {
      state.selectedSubsection = action.payload;
    },
  },
});

export const {
  setCategories,
  setSectionsReducer,
  setsubsectionsReducer,
  addCategory,
  addSectionReducer,
  addsubsectionReducer,
  updateCategoryName,
  updateSectionReducer,
  updatesubsectionReducer,
  deleteCategoryReducer,
  deleteSectionReducer,
  deletesubsectionReducer,
  setSelectedCategoryReducer,
  setSelectedSectionReducer,
  setSelectedSubsectionReducer,
  
  
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
