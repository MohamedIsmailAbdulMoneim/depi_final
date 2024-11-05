import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/apiSlice"; // Import your apiSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    // Add your API reducer here
  },

});

export default store;