import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "../RentalServices/Slicer/user/userSlicer";
// Define the store
const myAppStore = configureStore({
  reducer: {
    user: userSlicer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default myAppStore;

export type RootState = ReturnType<typeof myAppStore.getState>;
export type AppDispatch = typeof myAppStore.dispatch;