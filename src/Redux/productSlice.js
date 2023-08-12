import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
    productList : [],
    cartItem : []

     
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setDataProduct : (state,action)=>{
            // console.log("actionData",action);
            state.productList = [...action.payload];
            
        },
        addCartItem : (state,action)=>{
            const check = state.cartItem.some((e)=> e._id ===  action.payload._id)
            if(check)
            {
                toast("Item Already in cart");
            }
            else{
                // console.log("actionData",action);
                const total = action.payload.price
                state.cartItem = [...state.cartItem,{...action.payload,qty:1,total :total}];
                toast("Item added Successfully");
            }
        },
        deleteCartItem : (state,action)=>{
            // console.log(action.payload)
            toast("item removed from cart")
            const index = state.cartItem.findIndex((e)=>e._id === action.payload)
            state.cartItem.splice(index,1)
            // console.log("index",index)

        },
        increaseQty : (state,action)=>{
            const index = state.cartItem.findIndex((e)=>e._id === action.payload)
             let qty = state.cartItem[index].qty;
             const qtyInc = ++qty;
             state.cartItem[index].qty = qtyInc
             const price =  state.cartItem[index].price;
             let total = price*qtyInc
             state.cartItem[index].total = total;
              


        },
        decreaseQty : (state,action)=>{
            const index = state.cartItem.findIndex((e)=>e._id === action.payload)
            let qty = state.cartItem[index].qty;
            if(qty > 1)
            {   const qtyDec = --qty
                state.cartItem[index].qty = qtyDec;
                const price =  state.cartItem[index].price;
             let total = price*qtyDec
             state.cartItem[index].total = total;
            }

        }


        
    },
})
export const { setDataProduct,addCartItem,deleteCartItem,increaseQty,decreaseQty} = productSlice.actions

export default productSlice.reducer