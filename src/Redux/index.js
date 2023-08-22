import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'
import productSliceReducer from './productSlice'
import  categorySliceReducer  from './categorySlice'
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product : productSliceReducer,
    category : categorySliceReducer
  },
  middleware: [thunk],
})