import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setDataProduct : (state,action)=>{
    //     // console.log("actionData",action);
    //     state.productList = [...action.payload];

    // },

    setProductReducer: (state, action) => {
      console.log("setProductReducer payload: ", action.payload);
      // state.productList.unshift(action.payload);
      state.productList = action.payload;
    },

    addProductReducer: (state, action) => {
      console.log("addProductReducer payload: ", action.payload);
      // state.productList.push(action.payload);
      state.productList.unshift(action.payload);
    },

    deleteProductReducer: (state, action) => {
      console.log("deleteProductReducer paylod", action.payload);
      const productId = action.payload;
      const newProducts = state.productList.filter(
        (product) => product._id !== productId
      );

      return {
        ...state,
        productList: newProducts,
      };
    },
    updateProductReducer: (state, action) => {
      const { id, updatedProduct } = action.payload;

      return {
        ...state,
        productList: state.productList.map((product) =>
          product._id === id ? updatedProduct : product
        ),
      };
    },
  },
});
export const {
  addProductReducer,
  setProductReducer,
  deleteProductReducer,
  updateProductReducer,
} = productSlice.actions;

export default productSlice.reducer;
