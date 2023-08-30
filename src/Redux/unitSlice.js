// unitsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const unitsSlice = createSlice({
  name: "units",
  initialState: [],
  reducers: {
    setUnits: (state, action) => {
    //   console.log("action.payload", action.payload);
      return action.payload; // Overwrite the state with new unit data
    },
    addUnit: (state, action) => {
      state.push(action.payload);
    //   console.log("Added unit payload",action.payload)
    },
    updateUnit: (state, action) => {
      const updatedUnit = action.payload;
    //   console.log("Updated unit payload",updatedUnit)
      const unitIndex = state.findIndex((unit) => unit._id === updatedUnit._id);
      if (unitIndex !== -1) {
        state[unitIndex] = updatedUnit;
      }
    },
    deleteUnit: (state, action) => {
      const unitIdToDelete = action.payload;
      console.log("delete unit payload",unitIdToDelete)
      return state.filter((unit) => unit._id !== unitIdToDelete);
    },
  },
});

export const { setUnits, addUnit, updateUnit, deleteUnit } = unitsSlice.actions;
export default unitsSlice.reducer;
