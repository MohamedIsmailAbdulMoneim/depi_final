import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/apiSlice"; // Import your apiSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    // Add your API reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the API middleware
  devTools: true,
});

export default store;