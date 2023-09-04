import axios from "axios";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteUnit } from "../Redux/unitSlice";
import {
  deleteCategoryReducer,
  deleteSectionReducer,
  deletesubsectionReducer,
} from "../Redux/categorySlice";
import { deleteProductReducer, setProductReducer } from "../Redux/productSlice";

// Replace with your backend API URL

// Add New product

export const handleImageSubmit = async (e, file) => {
  e.preventDefault();
  console.log("file :", file);
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    console.log("formData", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/uploadimage",
        formData
      );
      // setUrl(response.data.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};
export const addProduct = async ({
  product_name,
  category,
  sub_category,
  sub_sub_category,
  description,
  quantity,
  barcode,
  image,
  price,
  file,
}) => {
  try {
    
    console.log("file :", file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file.data);

      console.log("formData", formData);

      try {
        const response = await axios.post(
          `${api}/api/uploadimage`,
          formData
        );
        // setUrl(response.data.publicUrl);
        const publicUrl = response.data.publicUrl
        console.log("publicUrl :", publicUrl);
         image  = publicUrl ; 
      
         console.log("image :", image)
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const response = await axios.post(
      `${api}/api/product/addProduct`,
      JSON.stringify({
        product_name,
        category,
        sub_category,
        sub_sub_category,
        description,
        quantity,
        image,
        barcode,
        price,
      }),
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error adding product");
  }
};

// delete Product
export const deleteProduct = async (productID, e, dispatch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product ?"
  );
  if (confirmDelete) {
    try {
      // e.preventDefault();
      const response = await axios.delete(
        `${api}/api/product/deleteProduct/${productID}`
      );
      console.log("response", response);

      if (response.status === 200) {
        dispatch(deleteProductReducer(productID));
        toast("Product deleted successfully");
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  }
};

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

// delete the category
export const deleteCategory = async (categoryId, dispatch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?"
  );
  if (confirmDelete) {
    try {
      const response = await axios.delete(
        `${api}/api/category/categories/${categoryId}`
      );
      if (response.status === 200) {
        dispatch(deleteCategoryReducer(categoryId));
        toast("Category deleted successfully");

        // window.location.reload();
        // You might want to refresh the data or update the Redux state after deletion
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  }
};

// deletion of the section
export const deleteSection = async (categoryId, sectionId, dispatch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this section?"
  );
  if (confirmDelete) {
    try {
      const response = await axios.delete(
        `${api}/api/category/${categoryId}/sections/${sectionId}`
      );
      if (response.status === 200) {
        toast("Section deleted successfully");
        dispatch(deleteSectionReducer(sectionId));
        // window.location.reload();
        // You might want to refresh the data or update the Redux state after deletion
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting section:", error.message);
    }
  }
};

//  deletion of the subsection

export const deleteSubsection = async (
  categoryId,
  sectionId,
  subsectionIndex,
  dispatch
) => {
  console.log("subsectionIndex", subsectionIndex);
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this subsection?"
  );
  if (confirmDelete) {
    try {
      const response = await axios.delete(
        `${api}/api/category/${categoryId}/sections/${sectionId}/subsections/${subsectionIndex}`
      );
      if (response.status === 200) {
        dispatch(deletesubsectionReducer(subsectionIndex));
        toast("Subsection deleted successfully");
      } else {
        console.log("Unexpected response:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting subsection:", error.message);
    }
  }
};

export const handleDeleteUnitClick = async (unitId, dispatch) => {
  // const dispatch = useDispatch();
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this unit?"
  );
  if (confirmDelete) {
    try {
      const response = await axios.delete(
        `${api}/api/unit/deleteUnit/${unitId}`
      );
      if (response.status === 200) {
        toast("Unit deleted successfully");
        dispatch(deleteUnit(unitId));
      } else {
        console.log("Unexpected response:", response.status, response.data);
        toast.error("error in delete unit");
      }
    } catch (error) {
      console.error("Error deleting unit:", error.message);
    }
  }
};

let accumulatedProducts = [];
export const fetchProducts = async (dispatch, page, productData ) => {


  try {
    const response = await axios.get(`${api}/api/product/fetchAllProduct`, {
      params: { page },
    });
    const newProducts = response.data.products;
    console.log("newProducts", newProducts);
    // const currentProducts = useSelector((state) => state.product.productList);
    // const updatedProducts = [...productData, ...newProducts];
    // setisProdctData((prevProducts) => [...prevProducts, ...newProducts]);
    // console.log("isProdctData", isProdctData);

    // accumulatedProducts.push(newProducts);
    // console.log("accumulatedProducts", accumulatedProducts)
    

    dispatch(setProductReducer([...productData, ...newProducts]));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
