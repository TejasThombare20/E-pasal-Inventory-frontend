import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'
import productSliceReducer from './productSlice'
import  categorySliceReducer  from './categorySlice'
import { applyMiddleware } from 'redux';
import  unitSliceReducer from './unitSlice'
import tokenSliceReducer from './tokenSlice'
import searchSliceReducer from './searchSlice'
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product : productSliceReducer,
    category : categorySliceReducer,
    units: unitSliceReducer, 
    token : tokenSliceReducer,
    search : searchSliceReducer
  },
  middleware: [thunk],
})