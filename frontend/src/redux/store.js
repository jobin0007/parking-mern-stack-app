import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import adminReducer from './adminSlice'





const store = configureStore({
  reducer: {
    
  
    admin:adminReducer,
   user:userReducer

  },
});

export default store;