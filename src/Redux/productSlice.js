import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
    productList : [],
   

     
};

export const productSlice = createSlice({
    name: 'product',
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
            console.log("deleteProductReducer paylod",action.payload)
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
            
                const { categoryId, newName } = action.payload;
                console.log("both : ", categoryId, newName);
                const productToUpdate = state.productList.find(
                  (product) => product._id === product
                );
                if (productToUpdate) {
                    productToUpdate.product_name = newName;
                }
              
          }

 
       


        
    },
})
export const {addProductReducer,setProductReducer,deleteProductReducer,updateProductReducer } = productSlice.actions

export default productSlice.reducer