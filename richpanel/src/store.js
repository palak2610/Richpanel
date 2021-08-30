import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import thunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [thunkMiddleware, ...getDefaultMiddleware({serializableCheck: false})],
});
