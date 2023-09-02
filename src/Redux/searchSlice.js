// unitsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    productList: [],
  },
  reducers: {

    setSearchDataReducer: (state, action) => {
      console.log("setSearchDataReducer payload: ", action.payload);
      state.productList = action.payload;
    },
  },
});

export const { setSearchDataReducer } = searchSlice.actions;
export default searchSlice.reducer;
