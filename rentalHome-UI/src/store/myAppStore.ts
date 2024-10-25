import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "../RentalServices/Slicer/user/userSlicer";
import propertySlicer from "../RentalServices/Slicer/Property/propertySlicer";
// Define the store
const myAppStore = configureStore({
  reducer: {
    user: userSlicer,
    property: propertySlicer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default myAppStore;

export type RootState = ReturnType<typeof myAppStore.getState>;
export type AppDispatch = typeof myAppStore.dispatch;