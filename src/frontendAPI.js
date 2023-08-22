import axios from "axios";
import api from "./utils/api";
// Replace with your backend API URL

export const fetchUnits = async () => {
  try {
    const response = await axios.get(`${api}/api/unit/getAllUnits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
};

export const updateUnit = async (unitId, newName) => {
  try {
    const response = await axios.put(
      `${api}/api/unit/updateUnit/${unitId}`,
      { name: newName },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error updating unit:", error);
    return false;
  }
};

export const deleteUnit = async (unitId) => {
  try {
    const response = await axios.delete(
      `${api}/api/unit/deleteUnit/${unitId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting unit:", error);
    return false;
  }
};

// export async function fetchAllProducts() {
//   try {
//     const response = await axios.get(`${BASE_URL}/products`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// }