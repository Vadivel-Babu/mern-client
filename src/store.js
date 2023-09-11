import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slice/gallerySlice'
const store = configureStore({
  reducer: {
    images:imageReducer    
  }
})

export default store;