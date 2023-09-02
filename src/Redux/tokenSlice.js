// unitsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    authToken: null,
  },
  reducers: {

    setAuthToken: (state, action) => {
        // console.log("set auth token payload", action.payload);
      state.authToken = action.payload;
    },
    clearAuthToken: (state) => {
      state.authToken = null;
    },
  },
});

export const {setAuthToken,clearAuthToken} = tokenSlice.actions;
export default tokenSlice.reducer;
